'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, animate, useMotionValue } from 'framer-motion'

const CLOUDINARY_BASE = 'https://res.cloudinary.com/drmwtarrs/video/upload'
const SRC_MOBILE = `${CLOUDINARY_BASE}/w_1280,q_65,f_auto/hod/hero/SHOWREEL_MOBILE.mp4`
const SRC_720 = `${CLOUDINARY_BASE}/w_1280,q_65,f_auto/hod/hero/SHOWREEL_4K.mp4`
const SRC_1080 = `${CLOUDINARY_BASE}/w_1920,q_70,f_auto/hod/hero/SHOWREEL_4K.mp4`

export default function HeroSection() {
  const videoRef = useRef(null)
  const [paused, setPaused] = useState(false)
  const [muted, setMuted] = useState(false) // default: sound ON
  const [isMobile, setIsMobile] = useState(false)

  // Mobile gets its own showreel; desktop/tablet start at 720p and upgrade to 1080p
  const [videoSrc, setVideoSrc] = useState(SRC_720)

  // Detect mobile on mount and pick the right source
  useEffect(() => {
    const mobile = window.innerWidth <= 767
    setIsMobile(mobile)
    setVideoSrc(mobile ? SRC_MOBILE : SRC_720)
  }, [])

  // Autoplay with sound where possible; if the browser blocks unmuted
  // autoplay, fall back to muted autoplay so the video still plays.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    async function tryAutoplay() {
      video.muted = false
      try {
        await video.play()
        setMuted(false)
      } catch {
        // Browser blocked unmuted autoplay — fall back to muted
        video.muted = true
        setMuted(true)
        video.play().catch(() => { })
      }
    }
    tryAutoplay()
  }, [videoSrc])

  // Desktop/tablet only: silently upgrade 720p -> 1080p once playing smoothly
  useEffect(() => {
    if (isMobile) return // mobile uses its own fixed-resolution showreel, no upgrade

    const video = videoRef.current
    if (!video) return

    function upgradeToHD() {
      const slowConn = navigator.connection?.effectiveType === '2g' ||
        navigator.connection?.effectiveType === 'slow-2g'
      if (slowConn) return

      const preload = document.createElement('video')
      preload.src = SRC_1080
      preload.preload = 'auto'
      preload.muted = true

      preload.addEventListener('canplaythrough', () => {
        const currentTime = video.currentTime
        const wasMuted = video.muted
        setVideoSrc(SRC_1080)
        requestAnimationFrame(() => {
          if (videoRef.current) {
            videoRef.current.currentTime = currentTime
            videoRef.current.muted = wasMuted
            videoRef.current.play().catch(() => { })
          }
        })
      }, { once: true })
    }

    video.addEventListener('playing', upgradeToHD, { once: true })

    return () => {
      video.removeEventListener('playing', upgradeToHD)
    }
  }, [isMobile, videoSrc])

  function togglePause() {
    if (!videoRef.current) return
    if (paused) {
      videoRef.current.play()
    } else {
      videoRef.current.pause()
    }
    setPaused(p => !p)
  }

  return (
    <section className="relative w-full h-[100dvh] min-h-[500px] md:min-h-[600px] overflow-hidden bg-hod-black">

      {/* ── VIDEO BACKGROUND ── */}
      <div className="absolute inset-0 z-0 bg-hod-black">
        <video
          ref={videoRef}
          key={videoSrc}
          className="w-full h-full object-cover"
          autoPlay
          muted={muted}
          loop
          playsInline
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          src={videoSrc}
        />

      </div>

      {/* ── GRADIENT OVERLAY ── */}
      <div className="video-overlay absolute inset-0 z-10" />

      {/* ── BOTTOM-ANCHORED HEADLINE (only text on screen) ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-8 md:px-16 lg:px-20 pb-16 md:pb-20">
        <div className="max-w-7xl">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(3.5rem, 10vw, 8.5rem)',
              letterSpacing: '0.03em',
              lineHeight: 0.95,
              color: '#f5f5f5',
            }}
          >
            Your Stories,
            <br />
            Our Lenses.
          </motion.h1>
        </div>
      </div>

      {/* ── PLAYBACK CONTROLS — bottom right ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-6 right-4 md:right-8 lg:right-12 z-20 flex items-center gap-3"
      >
        {/* Mute / Unmute */}
        <button
          onClick={() => {
            if (videoRef.current) {
              videoRef.current.muted = !videoRef.current.muted;
              setMuted(m => !m);
            }
          }}
          className="arrow-btn"
          aria-label={muted ? 'Unmute video' : 'Mute video'}
        >
          {muted ? (
            /* Speaker off */
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 4.5H3.5L7 2V12L3.5 9.5H1V4.5Z" fill="white" opacity="0.8" />
              <path d="M9 5L13 9M13 5L9 9" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
            </svg>
          ) : (
            /* Speaker on */
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 4.5H3.5L7 2V12L3.5 9.5H1V4.5Z" fill="white" opacity="0.8" />
              <path d="M9 4.5C9.8 5.1 10.3 6 10.3 7C10.3 8 9.8 8.9 9 9.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
              <path d="M10.5 3C11.9 3.9 12.8 5.4 12.8 7C12.8 8.6 11.9 10.1 10.5 11" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
            </svg>
          )}
        </button>

        {/* Pause / Play */}
        <button
          onClick={togglePause}
          className="arrow-btn"
          aria-label={paused ? 'Play video' : 'Pause video'}
        >
          {paused ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 1.5L12 7L3 12.5V1.5Z" fill="white" opacity="0.8" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="2" y="1" width="3.5" height="12" fill="white" opacity="0.8" />
              <rect x="8.5" y="1" width="3.5" height="12" fill="white" opacity="0.8" />
            </svg>
          )}
        </button>
      </motion.div>

    </section >
  )
}