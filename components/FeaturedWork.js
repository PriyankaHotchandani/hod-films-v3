'use client'
import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

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
    title: 'Maniyaara',
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
    title: 'Unleash Potential',
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
        // Removed cursor: 'pointer' because it is no longer clickable
        // Height is constrained by the parent row — do NOT set height here.
      }}
    >
      {/* ── Removed the <a> tag wrapper ── */}
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
          paddingBottom: '40px',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)',
          pointerEvents: 'none',
        }}>
          <span style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(1.3rem, 2.2vw, 2rem)',
            letterSpacing: '0.08em',
            color: 'rgba(255,255,255,1)',
            lineHeight: 1,
            textAlign: 'center',
            textShadow: '0 2px 16px rgba(0,0,0,0.8)',
          }}>
            {project.title}
          </span>
        </div>

        {/* ── Layer 5: Info — tag, description (Explore Button Removed) ── */}
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
              height: '32px',
              padding: '0 14px',
              borderRadius: '100px',
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.2)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              fontFamily: "'DM Mono', monospace",
              fontSize: '13px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,1)',
              whiteSpace: 'nowrap',
            }}>
              {!project.available ? 'In Production' : project.tags[0]}
            </span>
          </div>

          {/* Description */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '20px',
          }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '16px',
              fontWeight: '400',
              lineHeight: 1.5,
              color: 'rgba(255,255,255,0.95)',
              margin: 0,
              flex: 1,
              minWidth: 0,
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              WebkitLineClamp: isHovered ? 6 : 1,
              transition: 'all 0.3s ease',
            }}>
              {project.description}
            </p>
          </div>
        </motion.div>

        {/* ── Layer 6: Arrow Icon Removed Entirely ── */}

      </div>
    </motion.div>
  )
}

function GridRow({ rowProjects }) {
  const [hoveredId, setHoveredId] = useState(null)

  return (
    <div style={{
      display: 'flex',
      gap: '12px',
      overflow: 'hidden',
      width: '100%',
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
  )
}

function SectionHeader() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{ marginBottom: '48px' }}
      className="flex flex-col gap-0"
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
      {/* ADDED: Tailwind classes to handle responsive stacking */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mt-1 md:mt-0">
        <div style={{ overflow: 'hidden', paddingRight: '12px' }}>
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
              whiteSpace: 'nowrap', // Ensures text never wraps and clips
            }}
          >
            we’ve told…
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          // ADDED: Tailwind classes to align left on mobile, right on desktop
          className="flex flex-col items-start md:items-end shrink-0 md:max-w-[260px] pt-2 md:pt-0"
        >
          <p
            // ADDED: Text alignment controlled by screen size
            className="text-left md:text-right"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '13px',
              fontWeight: '300',
              lineHeight: 1.65,
              color: '#6a6a6a',
              margin: 0,
            }}
          >
            Walkthroughs, Music Videos, Documentaries and Brand Films. <br className="hidden md:block" />
            Let’s start storytelling…
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}

function MobileCard({ project }) {
  const cardRef = useRef(null)
  const videoRef = useRef(null)

  // Fade-in animation for the card itself
  const isCardInView = useInView(cardRef, { once: true, margin: '-40px' })

  // Video playback trigger: Checks if at least 50% of the card is visible on screen
  const isVideoInView = useInView(cardRef, { amount: 0.5 })

  // Automatically play or pause the video based on scroll position
  useEffect(() => {
    if (videoRef.current && project.videoSrc) {
      if (isVideoInView) {
        videoRef.current.play().catch(() => { })
      } else {
        videoRef.current.pause()
      }
    }
  }, [isVideoInView, project.videoSrc])

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 28 }}
      animate={isCardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div style={{
        borderRadius: '10px',
        overflow: 'hidden',
        background: project.bgGradient,
        position: 'relative',
        // Taller aspect ratio prevents text crushing on long titles
        aspectRatio: '1 / 1',
      }}>

        {/* ── Layer 1: Image (Fades out when video plays) ── */}
        <motion.div
          animate={{ opacity: isVideoInView && project.videoSrc ? 0 : 1 }}
          transition={{ duration: 0.5 }}
          style={{ position: 'absolute', inset: 0 }}
        >
          {project.imageSrc ? (
            <Image src={project.imageSrc} alt={project.title} fill style={{ objectFit: 'cover' }} />
          ) : (
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{
                fontFamily: "'DM Mono', monospace", fontSize: '9px', letterSpacing: '0.22em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.12)', padding: '0 20px', textAlign: 'center'
              }}>
                {project.assetLabel}
              </span>
            </div>
          )}
        </motion.div>

        {/* ── Layer 2: Video Player (Autoplays on scroll) ── */}
        {project.videoSrc && (
          <motion.video
            ref={videoRef}
            src={project.videoSrc}
            loop
            muted
            playsInline
            preload="none"
            poster={project.imageSrc || undefined}
            animate={{ opacity: isVideoInView ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center',
            }}
          />
        )}

        {/* ── Layer 3: Protective Bottom Gradient ── */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 45%, transparent 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }} />

        {/* ── Layer 4: Text Content (Stacked safely at the bottom) ── */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          zIndex: 3, padding: '24px 20px',
          display: 'flex', flexDirection: 'column', gap: '14px',
          pointerEvents: 'none',
        }}>
          {/* Title */}
          <span style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(1.8rem, 6vw, 2.2rem)',
            letterSpacing: '0.05em',
            color: 'rgba(255,255,255,0.95)',
            lineHeight: 1.05,
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
          }}>
            {project.title}
          </span>

          {/* Tags */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', height: '26px', padding: '0 12px',
              borderRadius: '100px', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)',
              fontFamily: "'DM Mono', monospace", fontSize: '10px', letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)',
            }}>
              {!project.available ? 'In Production' : project.tags[0]}
            </span>
          </div>
        </div>

      </div>
    </motion.div>
  )
}

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

function SquareRow({ rowProjects }) {
  const [hoveredId, setHoveredId] = useState(null)

  return (
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