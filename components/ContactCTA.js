'use client'
import { useState, useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useInView, useTransform } from 'framer-motion'
import FadeUp from './FadeUp'

function MagneticCTA({ href, children }) {
  const ref = useRef(null)
  const [hovered, setHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springConfig = { stiffness: 180, damping: 18, mass: 0.6 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  // Arrow travel on hover
  const arrowX = useSpring(useMotionValue(0), { stiffness: 220, damping: 20 })
  const arrowY = useSpring(useMotionValue(0), { stiffness: 220, damping: 20 })

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    // Magnetic pull — soft, not dramatic
    x.set(dx * 0.22)
    y.set(dy * 0.22)
    arrowX.set(dx * 0.12)
    arrowY.set(dy * 0.12)
  }, [x, y, arrowX, arrowY])

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
    arrowX.set(0)
    arrowY.set(0)
    setHovered(false)
  }, [x, y, arrowX, arrowY])

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: springX, y: springY, display: 'inline-block' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative group"
    >
      {/* Outer ring — expands on hover */}
      <motion.span
        aria-hidden="true"
        animate={hovered ? { scale: 1.08, opacity: 1 } : { scale: 0.94, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          inset: '-12px',
          borderRadius: '9999px',
          border: '1px solid rgba(245,245,240,0.18)',
          pointerEvents: 'none',
        }}
      />

      {/* Button body */}
      <motion.span
        animate={hovered
          ? { backgroundColor: '#f5f5f0', color: '#0a0a0a' }
          : { backgroundColor: 'transparent', color: '#f5f5f0' }
        }
        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          border: '1px solid rgba(245,245,240,0.35)',
          borderRadius: '9999px',
          padding: '1.1rem 2.4rem',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '0.7rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          fontWeight: 400,
          whiteSpace: 'nowrap',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        <span>{children}</span>

        {/* Animated diagonal arrow */}
        <motion.span
          style={{ x: arrowX, y: arrowY, display: 'flex', alignItems: 'center' }}
          animate={hovered ? { rotate: 0 } : { rotate: 0 }}
        >
          <motion.svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            animate={hovered ? { x: 2, y: -2 } : { x: 0, y: 0 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          >
            <path
              d="M1 13L13 1M13 1H4M13 1V10"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.span>
      </motion.span>
    </motion.a>
  )
}

// ─── Animated Slate Rule ──────────────────────────────────────────────────────
// A single line that draws itself left-to-right on scroll — the signature element.
function SlateRule() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })

  return (
    <div ref={ref} style={{ width: '100%', height: '1px', overflow: 'hidden', margin: '4rem 0' }}>
      <motion.div
        initial={{ scaleX: 0, originX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          height: '1px',
          width: '100%',
          background: 'linear-gradient(to right, rgba(245,245,240,0.06), rgba(245,245,240,0.22) 50%, rgba(245,245,240,0.06))',
        }}
      />
    </div>
  )
}

// ─── Frame Counter (ambient cinematic detail) ─────────────────────────────────
function FrameCounter() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 1 }}
      style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: '0.55rem',
        letterSpacing: '0.18em',
        color: 'rgba(245,245,240,0.18)',
        textTransform: 'uppercase',
        lineHeight: 1,
      }}
    >
    </motion.div>
  )
}

function LocationSlate() {
  return (
    <FadeUp delay={0.5}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0',
          flexWrap: 'wrap',
          rowGap: '0.5rem',
        }}
      >
      </div>
    </FadeUp>
  )
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function ContactCTA() {
  return (
    <section
      id="contact"
      style={{
        background: '#0a0a0a',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '7rem 2rem 4rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient grain overlay — purely atmospheric */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
          opacity: 0.6,
          pointerEvents: 'none',
        }}
      />

      {/* ── Main Content ── */}
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          width: '100%',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: '4rem',
          paddingBottom: '4rem',
        }}
      >
        {/* Eyebrow label */}
        <FadeUp>
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.6rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'rgba(245,245,240,0.35)',
              marginBottom: '2.5rem',
              textAlign: 'center',
            }}
          >
            Get in touch
          </p>
        </FadeUp>

        {/* Main headline */}
        <FadeUp delay={0.08}>
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(4.5rem, 13vw, 11rem)',
              letterSpacing: '0.02em',
              lineHeight: 0.92,
              color: '#f5f5f0',
              textAlign: 'center',
              margin: 0,
            }}
          >
            Let's Talk
            <br />
            <span style={{ color: 'rgba(245,245,240,0.22)' }}>Film.</span>
          </h2>
        </FadeUp>

        {/* Slate rule */}
        <SlateRule />

        {/* Consultative body copy */}
        <FadeUp delay={0.18}>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(0.9rem, 1.6vw, 1.1rem)',
              lineHeight: 1.8,
              color: 'rgba(245,245,240,0.48)',
              textAlign: 'center',
              maxWidth: '540px',
              margin: '0 auto 3.5rem',
              fontWeight: 300,
            }}
          >
            No matter what you're carrying — a feature, a brand campaign,
            or just a rough idea scribbled on a napkin — bring it to us.
            We'll get on a call, talk through the vision, and build a plan
            that's right for your story.
          </p>
        </FadeUp>

        {/* Primary CTA */}
        <FadeUp delay={0.26}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            {/* Redirects to WhatsApp. I added a pre-filled message to make it feel premium. */}
            <MagneticCTA href="https://wa.me/918291933663?text=Hi%20Mehul,%20I'd%20like%20to%20talk%20film.">
              Start the Conversation
            </MagneticCTA>
          </div>
        </FadeUp>

        {/* Secondary — phone & email */}
        <FadeUp delay={0.32}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              className="flex flex-col sm:flex-row items-center gap-3 sm:gap-2"
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.62rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}
            >
              <a href="mailto:mehul@houseofdoshi.com" className="section-label text-white/60 hover:text-white transition-colors" style={{ textDecoration: 'none' }}>
                mehul@houseofdoshi.com
              </a>

              <span className="section-label text-white/30 hidden sm:block">·</span>

              <a href="tel:+918291933663" className="section-label text-white/60 hover:text-white transition-colors flex items-center gap-2" style={{ textDecoration: 'none' }}>
                +91 82919 33663
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </FadeUp>
      </div>

      {/* ── Footer Row — Film Slate ── */}
      <div
        style={{
          width: '100%',
          maxWidth: '900px',
          margin: '0 auto',
          borderTop: '1px solid rgba(245,245,240,0.06)',
          paddingTop: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem',
        }}
      >
        <LocationSlate />
        <FrameCounter />
      </div>
    </section>
  )
}