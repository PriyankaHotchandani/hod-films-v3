'use client'
import { useState, useRef, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
// ─────────────────────────────────────────────
// PROJECT DATA
// 6 entries — displayed as 3 rows × 2 columns.
//
// ASSET SPECS:
//   imageSrc  — Square key art
//               Recommended: 1200 × 1200 px, JPG or WebP, ≤300 KB
//               Aspect ratio: 1:1 (the grid box is aspect-square)
//
//   videoSrc  — Preview / reel clip
//               Recommended: H.264 MP4, 1080 × 1080 px (square),
//               or 1920 × 1080 (landscape is fine — object-cover handles it)
//               Duration: 6–20 s loop, muted, ≤20 MB
// ─────────────────────────────────────────────
const projects = [
  {
    id: 1,
    title: 'Sahir Library Tour',
    tags: ['Real Estate, Walkthrough, Corporate'],
    description: 'From a blank canvas to cinematic execution in 20 days. When tasked with showcasing an upcoming library, we built the vision from the ground up—developing the concepts, shaping the narrative, and delivering the final visuals to communicate the true physical and philosophical impact of the space.',
    year: '2024',
    available: true,
    videoSrc: '/assets/HYPERCUTS_1080p/Sahir.mp4',
    imageSrc: '/assets/THUMBNAILS/SAHIR.png',
    assetLabel: '[ Sahir Library Tour — Key Art ]',
    bgGradient: 'linear-gradient(160deg, #12192e 0%, #1a2a4a 45%, #0d1520 100%)',
    accentRgb: '100, 140, 220',
  },
  {
    id: 2,
    title: 'K J Somaiya Hospital & Medical Research Centre',
    tags: ['Social Media & Website Coverage'],
    description: 'In the healthcare sector, presentation and trust go hand in hand. A hospital needs to project absolute confidence to its patients. We spent three days on site at K J Somaiya Hospital and Medical Research Centre. We carefully staged and filmed their unique healthcare services in action. The final assets gave them exactly what they needed to build a stronger brand presence across their website and social media.',
    year: '2024',
    available: true,
    videoSrc: '/assets/HYPERCUTS_1080p/Ayurvihar.mp4',
    imageSrc: '/assets/THUMBNAILS/AYURVIHAR.png',
    assetLabel: '[ K J Somaiya Hospital & Medical Research Centre — Key Art ]',
    bgGradient: 'linear-gradient(160deg, #1a0808 0%, #2d1010 45%, #120606 100%)',
    accentRgb: '200, 80, 60',
  },
  {
    id: 3,
    title: 'Take Two - KJSIM',
    tags: ['Documentary, Interview Films'],
    description: 'Two years ago, KJSIM launched their Transforming Together initiative. As those same students prepared to graduate, the goal was to document their actual growth. We spent three days conducting deep, detailed interviews with over ten students. Their honest experiences shaped ten distinct twenty minute episodes. The result is a series built entirely on real voices and authentic stories of personal transformation.',
    year: '2023',
    available: true,
    videoSrc: '/assets/HYPERCUTS_1080p/TAKE_TWO.mp4',
    imageSrc: '/assets/THUMBNAILS/TAKE_TWO.png',
    assetLabel: '[ Take Two - KJSIM — Key Art ]',
    bgGradient: 'linear-gradient(160deg, #1e1506 0%, #2e200a 45%, #160f04 100%)',
    accentRgb: '212, 175, 55',
  },
  {
    id: 4,
    title: 'Maniyaara - Maya Somaiya School of Music & Performing Arts',
    tags: ['Music Video, Brand Film'],
    description: 'If you are a school of music and performing arts, the best way to advertise is to show exactly what you do. We decided a full music video was the perfect format. We wrapped production in two days and delivered the final cut in ten. That is how Maniyaara was born.',
    year: '2023',
    available: true,
    videoSrc: '/assets/HYPERCUTS_1080p/MAYA.mp4',
    imageSrc: '/assets/THUMBNAILS/MAYA.png',
    assetLabel: '[ Maniyaara - Maya Somaiya School of Music & Performing Arts — Key Art ]',
    bgGradient: 'linear-gradient(160deg, #060612 0%, #0d0d28 45%, #08080f 100%)',
    accentRgb: '120, 100, 240',
  },
  {
    id: 5,
    title: 'Unleash Potential - Somaiya Sports Academy',
    tags: ['Brand Film, Action Trailer'],
    description: 'We got the call on January 12th with a strict deadline. The opening event was on the 26th, and the client trusted us to deliver. Eight days later, the final cut was approved and ready to screen. We created a purely visual story without dialogue. It combined energetic action shots with clear infrastructure establishment. It was a high stakes sprint that resulted in a lasting brand film and a very happy client.',
    year: '2022',
    available: true,
    videoSrc: '/assets/HYPERCUTS_1080p/SSA.mp4',
    imageSrc: '/assets/THUMBNAILS/SSA.png',
    assetLabel: '[ Unleash Potential - Somaiya Sports Academy — Key Art ]',
    bgGradient: 'linear-gradient(160deg, #0f1510 0%, #1a2418 45%, #0a0f0b 100%)',
    accentRgb: '90, 170, 100',
  },
  {
    id: 6,
    title: 'Podcasts',
    tags: ['Conversational Films'],
    description: 'Sometimes you just need the right partner to help get your voice out there. Our podcast production service is built to handle exactly that. A dedicated content producer helps structure your episodes. Then, our technical crew steps in to record everything cleanly. Finally, our editors shape the raw audio and video into a polished package ready for the world.',
    year: '2025',
    available: false,
    videoSrc: '/assets/HYPERCUTS_1080p/PODCASTS.mp4',
    imageSrc: '/assets/THUMBNAILS/PODCASTS.png',
    assetLabel: '[ Podcasts — Key Art ]',
    bgGradient: 'linear-gradient(160deg, #10100f 0%, #1a1a18 45%, #0c0c0b 100%)',
    accentRgb: '180, 180, 170',
  },
]

function ProjectCard({ project, isHovered, onMouseEnter, onMouseLeave }) {
  const videoRef = useRef(null)

  const handleMouseEnter = useCallback(() => {
    onMouseEnter()
    if (videoRef.current && project.videoSrc) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => { })
    }
  }, [onMouseEnter, project.videoSrc])

  const handleMouseLeave = useCallback(() => {
    onMouseLeave()
    if (videoRef.current && project.videoSrc) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }, [onMouseLeave, project.videoSrc])

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      // Width-only expansion: flex-grow controls width; height is locked by the row.
      animate={{ flexGrow: isHovered ? 2.2 : 1 }}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        flexBasis: 0,
        flexShrink: 1,
        minWidth: 0,
        position: 'relative',
        borderRadius: '10px',
        overflow: 'hidden',
        cursor: 'pointer',
        // Height is constrained by the parent row — do NOT set height here.
      }}
    >
      <a
        href="#"
        aria-label={`View project: ${project.title}`}
        style={{ display: 'block', textDecoration: 'none', height: '100%' }}
      >
        {/* Full-bleed media container — fills the locked row height */}
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>

          {/* ── Layer 1: Static image (always visible by default) ── */}
          <motion.div
            animate={{ opacity: (isHovered && project.videoSrc) ? 0 : 1 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            style={{ position: 'absolute', inset: 0, background: project.bgGradient }}
          >
            {project.imageSrc ? (
              <Image
                src={project.imageSrc}
                alt={project.title}
                fill
                sizes="(max-width: 767px) 100vw, 50vw"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                priority={project.id <= 2}
              />
            ) : (
              /* Placeholder — remove once imageSrc is populated */
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '9px',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.13)',
                  textAlign: 'center',
                  padding: '0 20px',
                  lineHeight: 1.8,
                }}>
                  {project.assetLabel}
                </span>
              </div>
            )}
          </motion.div>

          {/* ── Layer 2: Video — crossfades in on hover, fades out on leave ── */}
          {project.videoSrc && (
            <motion.video
              ref={videoRef}
              src={project.videoSrc}
              loop
              muted
              playsInline
              poster={project.imageSrc || undefined}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
          )}

          {/* ── Layer 3: Permanent bottom gradient scrim for text legibility ── */}
          <div style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: '60%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 55%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 2,
          }} />

          {/* ── Layer 4: Title — top-centre, always visible ── */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            zIndex: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '28px',
            paddingBottom: '40px', // Added padding to smooth the gradient transition
            // Added gradient background to darken the top edge for text readability
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)',
            pointerEvents: 'none', // Ensures hover events still pass through to the card
          }}>
            <span style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(1.3rem, 2.2vw, 2rem)',
              letterSpacing: '0.08em',
              color: 'rgba(255,255,255,1)', // Upped opacity to 1 for maximum contrast
              lineHeight: 1,
              textAlign: 'center',
              textShadow: '0 2px 16px rgba(0,0,0,0.8)', // Enhanced text shadow for extra pop
            }}>
              {project.title}
            </span>
          </div>

          {/* ── Layer 5: Info — tag, description + CTA ── */}
          <motion.div
            animate={{ y: isHovered ? 0 : 4 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              bottom: 0, left: 0, right: 0,
              zIndex: 4,
              padding: '0 24px 26px',
              pointerEvents: 'none',
            }}
          >
            {/* Tag / status pill */}
            <div style={{ marginBottom: '14px' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                height: '32px', // Increased height to balance the larger text
                padding: '0 14px',
                borderRadius: '100px',
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.2)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                fontFamily: "'DM Mono', monospace",
                fontSize: '13px', // Scaled up significantly for readability
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,1)', // Pushed to pure white for contrast
                whiteSpace: 'nowrap',
              }}>
                {!project.available ? 'In Production' : project.tags[0]}
              </span>
            </div>

            {/* Description + Explore CTA */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '20px', // Gave a bit more breathing room between text and CTA
            }}>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '16px', // Scaled up to a very readable base size
                fontWeight: '400',
                lineHeight: 1.5,
                color: 'rgba(255,255,255,0.95)', // Brightened up the text
                margin: 0,
                flex: 1,
                minWidth: 0,
                // Truncation setup: 1 line default, expands on hover
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                WebkitLineClamp: isHovered ? 6 : 1,
                transition: 'all 0.3s ease',
              }}>
                {project.description}
              </p>

              {/* Fades in on hover to keep the default state clean */}
              <motion.div
                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 5 }}
                transition={{ duration: 0.3 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  flexShrink: 0,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '14px', // Scaled up the CTA text slightly to match
                  fontWeight: '500',
                  letterSpacing: '0.04em',
                  color: 'rgba(255,255,255,1)',
                  whiteSpace: 'nowrap',
                }}
              >
                Explore
                <svg width="12" height="12" viewBox="0 0 13 13" fill="none">
                  <path d="M1 12L12 1M12 1H4M12 1V9" stroke="rgba(255,255,255,1)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            </div>
          </motion.div>

          {/* ── Layer 6: Default arrow — visible when not hovered ── */}
          <motion.div
            animate={{ opacity: isHovered ? 0 : 1 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'absolute',
              bottom: '18px', right: '18px',
              zIndex: 4,
              width: '34px', height: '34px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.09)',
              border: '1px solid rgba(255,255,255,0.16)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            <svg width="11" height="11" viewBox="0 0 13 13" fill="none">
              <path d="M1 12L12 1M12 1H4M12 1V9" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>

        </div>
      </a>
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// GRID ROW
//
// Height-locking strategy:
//   The row is a flex container with `align-items: stretch`.
//   We do NOT set an explicit height on the row itself — instead,
//   both cards start at `flex-grow: 1` (equal halves of the row width).
//   A square is enforced by a hidden 1:1 spacer div inside each card
//   that uses `paddingBottom: '100%'` to establish the intrinsic height.
//   When one card expands via flex-grow, the row width stays the same
//   (constrained by the parent) so the spacer's % height doesn't change —
//   height remains locked at exactly the narrower card's baseline size.
// ─────────────────────────────────────────────
function GridRow({ rowProjects }) {
  const [hoveredId, setHoveredId] = useState(null)

  return (
    <div style={{
      display: 'flex',
      gap: '12px',
      // overflow:hidden here is the hard container — no card can bleed out
      overflow: 'hidden',
      width: '100%',
    }}>
      {/*
        Square spacer row: a hidden flex row underneath that sets the row height.
        Both spacers are always equal halves → height = (containerWidth - gap) / 2.
        The actual cards are absolutely positioned to fill this height.
        Simpler approach: just use a wrapper with a fixed aspect-ratio.
      */}
      {rowProjects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          isHovered={hoveredId === project.id}
          onMouseEnter={() => setHoveredId(project.id)}
          onMouseLeave={() => setHoveredId(null)}
        />
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────
// SECTION HEADER
// ─────────────────────────────────────────────
function SectionHeader() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '0', marginBottom: '48px' }}
    >

      {/* Headline line 1 */}
      <div style={{ overflow: 'hidden' }}>
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(3rem, 7.5vw, 6.5rem)',
            letterSpacing: '0.025em',
            lineHeight: 0.95,
            color: 'var(--hod-white)',
            margin: 0,
          }}
        >
          Stories,
        </motion.h2>
      </div>

      {/* Headline line 2 + tagline block */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: '24px',
      }}>
        <div style={{ overflow: 'hidden' }}>
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 1.0, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(3rem, 7.5vw, 6.5rem)',
              letterSpacing: '0.025em',
              lineHeight: 0.95,
              color: '#6a6a6a',
              margin: 0,
            }}
          >
            we’ve told…
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '16px',
            flexShrink: 0,
            maxWidth: '260px',
          }}
        >
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '13px',
            fontWeight: '300',
            lineHeight: 1.65,
            color: '#6a6a6a',
            textAlign: 'right',
            margin: 0,
          }}>
            Walkthroughs, Music Videos, Documentaries and Brand Films. <br />
            Let’s start storytelling…
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// MOBILE CARD
// Simple single-column card, no accordion interaction.
// Uses a fixed 4:3 aspect ratio (comfortable for portrait screens).
// ─────────────────────────────────────────────
function MobileCard({ project }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <a
        href="#"
        aria-label={`View project: ${project.title}`}
        style={{ display: 'block', textDecoration: 'none' }}
      >
        <div style={{
          borderRadius: '10px',
          overflow: 'hidden',
          background: project.bgGradient,
          position: 'relative',
          aspectRatio: '4 / 3',
        }}>
          {project.imageSrc ? (
            <Image src={project.imageSrc} alt={project.title} fill style={{ objectFit: 'cover' }} />
          ) : (
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '9px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.12)',
                textAlign: 'center',
                padding: '0 20px',
              }}>
                {project.assetLabel}
              </span>
            </div>
          )}

          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
            zIndex: 2,
          }} />

          <div style={{
            position: 'absolute', top: '20px', left: 0, right: 0,
            zIndex: 3, textAlign: 'center',
          }}>
            <span style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '1.8rem',
              letterSpacing: '0.08em',
              color: 'rgba(255,255,255,0.95)',
              lineHeight: 1,
            }}>
              {project.title}
            </span>
          </div>

          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            zIndex: 4, padding: '0 18px 18px',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '12px',
          }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              height: '22px',
              padding: '0 10px',
              borderRadius: '100px',
              background: 'rgba(255,255,255,0.09)',
              border: '1px solid rgba(255,255,255,0.15)',
              fontFamily: "'DM Mono', monospace",
              fontSize: '9px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.65)',
            }}>
              {!project.available ? 'In Production' : project.tags[0]}
            </span>

            <div style={{
              width: '32px', height: '32px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.09)',
              border: '1px solid rgba(255,255,255,0.16)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <svg width="11" height="11" viewBox="0 0 13 13" fill="none">
                <path d="M1 12L12 1M12 1H4M12 1V9" stroke="rgba(255,255,255,0.78)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// FEATURED WORK — main export
//
// Desktop: 3 rows × 2 columns accordion grid
//   Each row is a flex container. Cards start at flex-grow:1 (equal halves).
//   The row height is set by a CSS aspect-ratio wrapper (1:1 square) that
//   sits inside each card but is position:absolute so it doesn't push layout —
//   instead we use a transparent spacer with aspect-ratio:1/1 on the ROW
//   to establish height, and the cards fill 100% of it.
//
// Height locking implementation:
//   The row div has a fixed height derived from: (containerWidth - gap) / 2.
//   We can't compute this in JS without ResizeObserver, so instead we use a
//   CSS approach: a pseudo-row of two transparent 1:1 boxes (display:flex,
//   pointerEvents:none) stacked behind the real row to donate height.
//   The simplest reliable method is: give the GridRow a `--row-height` via
//   inline style, computed from the container. But since we have no JS width
//   measurement, we use `aspect-ratio: 1 / 1` on a hidden spacer inside each
//   card and `align-items: flex-start` on the row, then freeze the row height
//   with `height: 0; padding-bottom: calc(50% - 6px)` on a sibling spacer.
//
//   TL;DR simplest working solution: give each row a `height` equal to the
//   width of ONE un-hovered card. Since we can't know the exact pixel width
//   without JS, we use a CSS-only trick:
//     • Row is `position: relative`
//     • Inside the row, a hidden `div` with `width: calc(50% - 6px)` and
//       `aspect-ratio: 1/1` (position: absolute, pointer-events: none)
//       establishes the correct height via its own natural square size.
//     • Row gets `height: 0; padding-bottom: calc(50% - 6px)` trick.
//
// The cleanest zero-JS approach that actually works:
//   Use a CSS grid "ghost row" pattern. See GridRow implementation below.
// ─────────────────────────────────────────────
export default function FeaturedWork() {
  const rows = [
    projects.slice(0, 2),
    projects.slice(2, 4),
    projects.slice(4, 6),
  ]

  return (
    <section
      id="work"
      style={{
        background: 'var(--hod-black)',
        paddingTop: 'clamp(60px, 8vw, 120px)',
        paddingBottom: 'clamp(60px, 8vw, 120px)',
        paddingLeft: 'clamp(20px, 5vw, 80px)',
        paddingRight: 'clamp(20px, 5vw, 80px)',
      }}
    >
      <div style={{ maxWidth: '1380px', margin: '0 auto' }}>

        <SectionHeader />

        {/* ── Desktop: 3 rows × 2 columns accordion ── */}
        <div className="work-grid-desktop" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {rows.map((rowProjects, i) => (
            <SquareRow key={i} rowProjects={rowProjects} />
          ))}
        </div>

        {/* ── Mobile: single-column stack ── */}
        <div className="work-grid-mobile" style={{ display: 'none', flexDirection: 'column', gap: '12px' }}>
          {projects.map((project) => (
            <MobileCard key={project.id} project={project} />
          ))}
        </div>

      </div>

      <style jsx>{`
        .work-grid-desktop { display: flex !important; }
        .work-grid-mobile  { display: none  !important; }

        @media (max-width: 767px) {
          .work-grid-desktop { display: none  !important; }
          .work-grid-mobile  { display: flex !important; }
        }

        .view-all-link { display: inline-block; }
        @media (max-width: 640px) {
          .view-all-link { display: none !important; }
        }
      `}</style>
    </section>
  )
}

// ─────────────────────────────────────────────
// SQUARE ROW
//
// Height-locking via a CSS-only spacer trick:
//   1. A hidden, non-interactive div inside the row has `width: calc(50% - 6px)`
//      and `aspect-ratio: 1 / 1`. Because it's position:relative (in flow),
//      it donates its natural square height to the row.
//   2. The row itself is `position: relative` with `align-items: stretch`.
//   3. The actual cards are `position: absolute, inset: 0` to fill the row
//      height established by the spacer — but the spacer collapses its own
//      flex contribution since the cards are out of flow.
//
// Simpler and more robust approach used here:
//   Wrap the flex row in a container that uses `padding-bottom: calc(50% - 6px)`
//   to set its own height as a square of half the container width.
//   Then position the flex row absolutely inside it.
//   This is the most reliable CSS-only square-lock for a two-card row.
// ─────────────────────────────────────────────
function SquareRow({ rowProjects }) {
  const [hoveredId, setHoveredId] = useState(null)

  return (
    /*
      Outer wrapper: sets row height via padding-bottom trick.
      `padding-bottom: calc(50% - 6px)` = width of one card when both are equal
        (half the container minus half the gap).
      `position: relative; height: 0` makes the padding define the box height.
    */
    <div style={{
      position: 'relative',
      width: '100%',
      height: 0,
      paddingBottom: 'calc(50% - 6px)', // locks height = 1 card width = perfect square
    }}>
      {/* Inner flex row — absolutely fills the height-locked outer box */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        gap: '12px',
        overflow: 'hidden', // hard clamp: no card can escape the container
      }}>
        {rowProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isHovered={hoveredId === project.id}
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
          />
        ))}
      </div>
    </div>
  )
}