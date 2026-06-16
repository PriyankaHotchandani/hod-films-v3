'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// CSS injected client-side only to avoid SSR/hydration mismatch.
// The SVG data-URI in .hod-grain::before contains characters that
// React's server renderer and the browser serialize differently,
// causing the "Text content did not match" hydration error.
const HOD_STYLES = `
  @keyframes recBlink {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0; }
  }
  .hod-tc-blink { animation: recBlink 1s step-start infinite; }

  .hod-grain::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E");
    background-size: 200px 200px;
    pointer-events: none;
    z-index: 2;
    opacity: 0.55;
    mix-blend-mode: overlay;
  }

  .hod-scene-btn {
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.7rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 6px 14px;
    border: 1px solid transparent;
    background: transparent;
    cursor: pointer;
    transition: border-color 0.2s, color 0.2s;
  }

  .hod-crosshair-h {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 16px;
    height: 1px;
  }
  .hod-crosshair-v {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 1px;
    height: 16px;
  }

  @media (max-width: 768px) {
    .hod-quote-text { font-size: 1.15rem !important; }
    .hod-layout-grid { grid-template-columns: 1fr !important; }
    .hod-right-panel { display: none; }
  }
`

// ─── Data ────────────────────────────────────────────────────────────────────

const testimonials = [
  {
    id: 1,
    sceneId: 'SC-001',
    reel: 'REEL 01',
    quote:
      "Having known Mehul personally since 2024 and collaborated with House of Doshi Films since early 2026, I can confidently summarize his approach in two words: Character and Competence. Mehul is exceptionally skilled at his craft and backed by a highly efficient, reliable team. What truly sets them apart is their flawless execution—our interview films were delivered exactly on schedule. Just as importantly, Mehul has an incredible ability to put you at complete ease in front of the lens, transforming a standard recording into a natural, effortless conversation.",
    author: 'Parth Thakkar',
    title: 'Partner',
    company: 'PIFS Insurance Marketing LLP',
    bg: 'linear-gradient(135deg, #0d1117 0%, #101820 60%, #0a0a0a 100%)',
    accentColor: '#d4af37',
    accentRGB: '212,175,55',
  },
  {
    id: 2,
    sceneId: 'SC-002',
    reel: 'REEL 01',
    quote: 'Working with you was such a smooth and enjoyable experience. You made us feel completely comfortable in front of the camera, which helped us be ourselves and made the entire podcast recording process effortless. Your professionalism and calming presence truly made all the difference!',
    author: 'Preksha Jain & Vaidehi Shethia',
    title: 'Hosts',
    company: 'Birds of a Feather Podcast',
    bg: 'linear-gradient(135deg, #1a1208 0%, #2a1f0a 60%, #0f0c06 100%)',
    accentColor: '#c9a44a',
    accentRGB: '201,164,74',
  },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Formats seconds → SMPTE-style "HH:MM:SS:FF"
 * We treat `base` as a raw frame count (at 24fps).
 */
function toTimecode(frames) {
  const fps = 24
  const totalSec = Math.floor(frames / fps)
  const ff = String(frames % fps).padStart(2, '0')
  const ss = String(totalSec % 60).padStart(2, '0')
  const mm = String(Math.floor(totalSec / 60) % 60).padStart(2, '0')
  const hh = String(Math.floor(totalSec / 3600)).padStart(2, '0')
  return `${hh}:${mm}:${ss}:${ff}`
}

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Typewriter effect — reveals text character-by-character */
function TypewriterText({ text, onComplete, accentColor }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const indexRef = useRef(0)

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    indexRef.current = 0

    // slight initial delay so flash-frame settles first
    const init = setTimeout(() => {
      const interval = setInterval(() => {
        indexRef.current += 1
        setDisplayed(text.slice(0, indexRef.current))
        if (indexRef.current >= text.length) {
          clearInterval(interval)
          setDone(true)
          onComplete?.()
        }
      }, 18) // ~18 ms per char ≈ comfortable reading speed
      return () => clearInterval(interval)
    }, 120)

    return () => clearTimeout(init)
  }, [text])

  return (
    <span>
      {displayed}
      {!done && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 0.7, ease: 'linear' }}
          style={{
            display: 'inline-block',
            width: '2px',
            height: '1.1em',
            background: accentColor,
            marginLeft: '2px',
            verticalAlign: 'text-bottom',
          }}
        />
      )}
    </span>
  )
}

/** SMPTE timecode display that animates when value changes */
function Timecode({ frames, accentColor }) {
  return (
    <motion.span
      key={frames}
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{ color: accentColor }}
    >
      {toTimecode(frames)}
    </motion.span>
  )
}

/** Corner bracket — draws one of the four camera-monitor framing corners */
function CornerBracket({ position, accentColor }) {
  const size = 28
  const thickness = 1.5
  const color = accentColor || '#d4af37'

  const styles = {
    position: 'absolute',
    width: size,
    height: size,
    ...(position === 'tl' && { top: 20, left: 20 }),
    ...(position === 'tr' && { top: 20, right: 20 }),
    ...(position === 'bl' && { bottom: 20, left: 20 }),
    ...(position === 'br' && { bottom: 20, right: 20 }),
  }

  const svgPath =
    position === 'tl'
      ? `M${size} 0 L0 0 L0 ${size}`
      : position === 'tr'
        ? `M0 0 L${size} 0 L${size} ${size}`
        : position === 'bl'
          ? `M0 0 L0 ${size} L${size} ${size}`
          : `M0 ${size} L${size} ${size} L${size} 0`

  return (
    <div style={styles}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={svgPath} stroke={color} strokeWidth={thickness} />
      </svg>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [flashVisible, setFlashVisible] = useState(false)
  // Start at a fixed value so SSR and client agree; timecode ticking
  // starts only inside useEffect (client-only), preventing hydration mismatch.
  const [timecodeFrames, setTimecodeFrames] = useState(123456)
  const [isMounted, setIsMounted] = useState(false)
  const [isTyping, setIsTyping] = useState(true)
  const [quoteKey, setQuoteKey] = useState(0)
  const autoTimer = useRef(null)

  // Inject styles client-side only — avoids the SVG data-URI hydration mismatch
  useEffect(() => {
    setIsMounted(true)
    const styleId = 'hod-testimonials-styles'
    if (!document.getElementById(styleId)) {
      const tag = document.createElement('style')
      tag.id = styleId
      tag.textContent = HOD_STYLES
      document.head.appendChild(tag)
    }
  }, [])

  const t = testimonials[active]

  const triggerTransition = useCallback(
    (nextIndex) => {
      if (nextIndex === active) return
      clearTimeout(autoTimer.current)

      // 1. flash frame
      setFlashVisible(true)
      setTimeout(() => {
        setFlashVisible(false)
        setActive(nextIndex)
        setIsTyping(true)
        setQuoteKey((k) => k + 1)
        // advance timecode by a "scene cut" jump: 3–8 seconds of frames
        const jump = Math.floor(Math.random() * 120 + 72) // 3–8 sec at 24fps
        setTimecodeFrames((f) => f + jump)
      }, 90) // flash duration ≈ 2–4 frames at 24fps
    },
    [active]
  )

  const goTo = useCallback(
    (index) => {
      const i = (index + testimonials.length) % testimonials.length
      triggerTransition(i)
    },
    [triggerTransition]
  )

  const next = useCallback(() => goTo(active + 1), [active, goTo])

  // Auto-advance: 7s, but only once typewriter has finished
  useEffect(() => {
    autoTimer.current = setTimeout(next, 7000)
    return () => clearTimeout(autoTimer.current)
  }, [active])

  // Timecode ticks forward every ~6 frames while idle
  useEffect(() => {
    const tick = setInterval(() => {
      setTimecodeFrames((f) => f + 1)
    }, 1000 / 4) // 4 increments/sec for a subtle "live" feel
    return () => clearInterval(tick)
  }, [])

  return (
    <>
      <section
        id="testimonials"
        className={`relative w-full overflow-hidden scroll-mt-16 md:scroll-mt-20${isMounted ? ' hod-grain' : ''}`}
        style={{ minHeight: '90vh', background: t.bg, transition: 'background 1.4s ease' }}
      >
        {/* ── Background gradient transition ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={t.id + '-bg'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0 z-0"
            style={{ background: t.bg }}
          />
        </AnimatePresence>

        {/* ── Subtle centre-screen crosshair ── */}
        <div className="absolute inset-0 z-1 pointer-events-none flex items-center justify-center">
          <div style={{ position: 'relative', width: 16, height: 16, opacity: 0.12 }}>
            <div className="hod-crosshair-h" style={{ background: t.accentColor }} />
            <div className="hod-crosshair-v" style={{ background: t.accentColor }} />
          </div>
        </div>

        {/* ── Flash-frame overlay ── */}
        <AnimatePresence>
          {flashVisible && (
            <motion.div
              key="flash"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.045, ease: 'linear' }}
              className="absolute inset-0 z-50 pointer-events-none"
              style={{ background: '#fff' }}
            />
          )}
        </AnimatePresence>

        {/* ── Corner brackets (camera-monitor HUD) ── */}
        {['tl', 'tr', 'bl', 'br'].map((pos) => (
          <CornerBracket key={pos} position={pos} accentColor={t.accentColor} />
        ))}

        {/* ── Top HUD bar ── */}
        <div
          className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between"
          style={{
            padding: '18px 52px',
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: '0.65rem',
            letterSpacing: '0.16em',
            color: 'rgba(255,255,255,0.28)',
          }}
        >
          {/* Record indicator */}
          <div className="flex items-center gap-2">
            <span
              className={isMounted ? 'hod-tc-blink' : ''}
              style={{
                display: 'inline-block',
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: '#e63946',
              }}
            />
            <span style={{ color: '#e63946', letterSpacing: '0.2em' }}>REC</span>
          </div>

          {/* Timecode */}
          <div>
            <span style={{ color: 'rgba(255,255,255,0.22)', marginRight: 8 }}>TCR</span>
            <Timecode frames={timecodeFrames} accentColor={t.accentColor} />
          </div>

          {/* Aspect ratio label */}
          <div>2.39:1 &nbsp;·&nbsp; 24p</div>
        </div>

        {/* ── Main content ── */}
        <div
          className="relative z-10 flex flex-col justify-center"
          style={{ minHeight: '90vh', padding: '96px 52px 80px' }}
        >
          <div className="max-w-7xl mx-auto w-full">
            {/* Section eyebrow */}
            <div
              style={{
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '0.65rem',
                letterSpacing: '0.22em',
                color: 'rgba(255,255,255,0.3)',
                textTransform: 'uppercase',
                marginBottom: '2.5rem',
              }}
            >
              CLIENT PERSPECTIVES
            </div>

            {/* Two-column layout: quote left, visual right */}
            <div
              className="hod-layout-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 320px',
                gap: '4rem',
                alignItems: 'start',
              }}
            >
              {/* ── Left: quote block ── */}
              <div style={{ maxWidth: 680 }}>
                {/* Opening quotemark — large, accent-coloured */}
                <div
                  aria-hidden
                  style={{
                    fontFamily: 'Georgia, Times New Roman, serif',
                    fontSize: '6rem',
                    lineHeight: 0.7,
                    color: t.accentColor,
                    opacity: 0.5,
                    marginBottom: '0.25rem',
                    marginLeft: '-0.15rem',
                    userSelect: 'none',
                    transition: 'color 0.8s ease',
                  }}
                >
                  "
                </div>

                {/* Quote — typewriter reveal */}
                <blockquote
                  className="hod-quote-text"
                  style={{
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontSize: 'clamp(1.2rem, 2.4vw, 1.65rem)',
                    lineHeight: 1.7,
                    color: 'rgba(255,255,255,0.93)',
                    fontWeight: 400,
                    fontStyle: 'italic',
                    margin: 0,
                    minHeight: '8em', // prevents layout shift while typing
                  }}
                >
                  <TypewriterText
                    key={quoteKey}
                    text={t.quote}
                    accentColor={t.accentColor}
                    onComplete={() => setIsTyping(false)}
                  />
                </blockquote>

                {/* Author block — screenplay character cue format */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={t.id + '-author'}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    style={{ marginTop: '2.5rem' }}
                  >
                    {/* Accent rule */}
                    <div
                      style={{
                        width: 40,
                        height: 1,
                        background: t.accentColor,
                        marginBottom: '1rem',
                        transition: 'background 0.8s ease',
                      }}
                    />

                    {/* Name — all-caps, monospace, like a screenplay character header */}
                    <div
                      style={{
                        fontFamily: "'Courier New', Courier, monospace",
                        fontSize: '0.8rem',
                        letterSpacing: '0.2em',
                        color: t.accentColor,
                        textTransform: 'uppercase',
                        transition: 'color 0.8s ease',
                      }}
                    >
                      {t.author}
                    </div>

                    {/* Title / company — screenplay parenthetical indent */}
                    <div
                      style={{
                        fontFamily: "'Courier New', Courier, monospace",
                        fontSize: '0.68rem',
                        letterSpacing: '0.14em',
                        color: 'rgba(255,255,255,0.38)',
                        marginTop: '0.25rem',
                        textTransform: 'uppercase',
                        paddingLeft: '1.5rem',
                      }}
                    >
                      ({t.title}, {t.company})
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* ── Right: scene selector / visual panel ── */}
              <div
                className="hod-right-panel"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  paddingTop: '3rem',
                }}
              >
                <div
                  style={{
                    fontFamily: "'Courier New', Courier, monospace",
                    fontSize: '0.6rem',
                    letterSpacing: '0.22em',
                    color: 'rgba(255,255,255,0.22)',
                    marginBottom: '0.75rem',
                    textTransform: 'uppercase',
                  }}
                >
                  SELECT SCENE
                </div>

                {testimonials.map((item, i) => {
                  const isActive = i === active
                  return (
                    <button
                      key={item.id}
                      onClick={() => goTo(i)}
                      className="hod-scene-btn"
                      style={{
                        borderColor: isActive
                          ? item.accentColor
                          : 'rgba(255,255,255,0.1)',
                        color: isActive
                          ? item.accentColor
                          : 'rgba(255,255,255,0.3)',
                        textAlign: 'left',
                      }}
                      aria-label={`Go to testimonial ${i + 1}`}
                      aria-current={isActive ? 'true' : undefined}
                    >
                      <span style={{ opacity: 0.5, marginRight: 8 }}>
                        {item.reel}
                      </span>
                      {item.sceneId}
                      {isActive && (
                        <span
                          style={{
                            marginLeft: 10,
                            display: 'inline-block',
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: item.accentColor,
                            verticalAlign: 'middle',
                          }}
                        />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* ── Bottom HUD bar: scene counter + prev/next ── */}
            <div
              style={{
                marginTop: '3.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '2rem',
              }}
            >
              {/* Prev / Next — minimal, labelled with slate clapper icon */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button
                  onClick={() => goTo(active - 1)}
                  aria-label="Previous scene"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: `1px solid rgba(255,255,255,0.12)`,
                    borderRadius: 2,
                    padding: '8px 14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = t.accentColor)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')
                  }
                >
                  {/* Clapperboard "prev" icon */}
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                    <path
                      d="M8 1H2a1 1 0 00-1 1v6a1 1 0 001 1h8a1 1 0 001-1V2a1 1 0 00-1-1H9"
                      stroke="rgba(255,255,255,0.5)"
                      strokeWidth="1"
                    />
                    <path
                      d="M1 3.5h10M5 1l-2 2.5M8 1L6 3.5"
                      stroke="rgba(255,255,255,0.5)"
                      strokeWidth="1"
                    />
                  </svg>
                  <span
                    style={{
                      fontFamily: "'Courier New', monospace",
                      fontSize: '0.65rem',
                      color: 'rgba(255,255,255,0.45)',
                      letterSpacing: '0.14em',
                    }}
                  >
                    PREV
                  </span>
                </button>

                <button
                  onClick={() => goTo(active + 1)}
                  aria-label="Next scene"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: `1px solid rgba(255,255,255,0.12)`,
                    borderRadius: 2,
                    padding: '8px 14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = t.accentColor)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')
                  }
                >
                  <span
                    style={{
                      fontFamily: "'Courier New', monospace",
                      fontSize: '0.65rem',
                      color: 'rgba(255,255,255,0.45)',
                      letterSpacing: '0.14em',
                    }}
                  >
                    NEXT
                  </span>
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                    <path
                      d="M4 1H2a1 1 0 00-1 1v6a1 1 0 001 1h8a1 1 0 001-1V2a1 1 0 00-1-1H9"
                      stroke="rgba(255,255,255,0.5)"
                      strokeWidth="1"
                    />
                    <path
                      d="M1 3.5h10M5 1l-2 2.5M8 1L6 3.5"
                      stroke="rgba(255,255,255,0.5)"
                      strokeWidth="1"
                    />
                  </svg>
                </button>
              </div>

              {/* Scene counter — "SCENE 01 / 03  ·  REEL 01" */}
              <div
                style={{
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: '0.68rem',
                  letterSpacing: '0.18em',
                  color: 'rgba(255,255,255,0.28)',
                }}
              >
                SCENE&nbsp;
                <span style={{ color: t.accentColor, transition: 'color 0.8s' }}>
                  {String(active + 1).padStart(2, '0')}
                </span>
                &nbsp;/&nbsp;{String(testimonials.length).padStart(2, '0')}
                &nbsp;&nbsp;·&nbsp;&nbsp;{t.reel}
              </div>

              {/* Progress bar — film strip style */}
              <div
                style={{
                  flex: 1,
                  minHeight: 2,
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: 1,
                  overflow: 'hidden',
                  maxWidth: 180,
                }}
              >
                <motion.div
                  key={active}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 7, ease: 'linear' }}
                  style={{ height: '100%', background: t.accentColor, borderRadius: 1 }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom-right HUD label ── */}
        <div
          className="absolute bottom-0 right-0 z-10"
          style={{
            padding: '18px 52px',
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: '0.6rem',
            letterSpacing: '0.16em',
            color: 'rgba(255,255,255,0.18)',
          }}
        >
          HOD FILMS &nbsp;·&nbsp; CLIENT PERSPECTIVES
        </div>
      </section>
    </>
  )
}