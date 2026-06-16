'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import FadeUp from './FadeUp'

const teamMembers = [
  {
    id: 1,
    name: 'Mehul Doshi',
    role: 'Founder & Producer',
    // department: 'PRODUCTION',
    imageSrc: 'https://res.cloudinary.com/drmwtarrs/image/upload/f_auto,q_auto/hod/headshots/Mehul.jpg',
    imageLabel: '[Insert: Headshot_Mehul.jpg]',
    // superpower: 'Rewrites the third act in his head while the camera is rolling. Always right.',
    accentColor: 'rgba(212,175,55,0.7)',
    size: 'anchor', // tallest card — top billing
  },
  {
    id: 2,
    name: 'Priyanka Hotchandani',
    role: 'Producer',
    // department: 'PRODUCTION',
    imageSrc: 'https://res.cloudinary.com/drmwtarrs/image/upload/f_auto,q_auto/hod/headshots/Priyanka.png',
    imageLabel: '[Insert: Headshot_Priyanka.png]',
    // superpower: 'Can diagnose a bad light source from two rooms away. Her eye is the lens.',
    accentColor: 'rgba(180,180,220,0.7)',
    size: 'standard',
  },
  {
    id: 3,
    name: 'Advait More',
    role: 'Director',
    // department: 'DIRECTION',
    imageSrc: 'https://res.cloudinary.com/drmwtarrs/image/upload/f_auto,q_auto/hod/headshots/Advait.png',
    imageLabel: '[Insert: Headshot_Advait.png]',
    // superpower: 'Has never missed a call time. Not once. In eleven years. We checked.',
    accentColor: 'rgba(180,220,180,0.7)',
    size: 'standard',
  },
  {
    id: 4,
    name: 'Arun Karumuru',
    role: 'Sr. Editor',
    // department: 'PRODUCTION',
    imageSrc: 'https://res.cloudinary.com/drmwtarrs/image/upload/f_auto,q_auto/hod/headshots/Arun.jpg',
    imageLabel: '[Insert: Headshot_Arun.jpg]',
    // superpower: 'Closed a co-production deal mid-flight, on airplane mode. We still don\'t know how.',
    accentColor: 'rgba(212,175,55,0.7)',
    size: 'wide', // anamorphic full-width card
  },
  {
    id: 5,
    name: 'Grish Majethiya',
    role: 'Jr. Producer',
    // department: 'PRODUCTION',
    imageSrc: 'https://res.cloudinary.com/drmwtarrs/image/upload/f_auto,q_auto/hod/headshots/Grish.jpg',
    imageLabel: '[Insert: Headshot_Grish.jpg]',
    // superpower: 'Closed a co-production deal mid-flight, on airplane mode. We still don\'t know how.',
    accentColor: 'rgba(212,175,55,0.7)',
    size: 'wide', // anamorphic full-width card
  },
  {
    id: 6,
    name: 'Himank Chandani',
    role: 'Jr. Editor',
    // department: 'PRODUCTION',
    imageSrc: 'https://res.cloudinary.com/drmwtarrs/image/upload/f_auto,q_auto/hod/headshots/Himank.png',
    imageLabel: '[Insert: Headshot_Himank.png]',
    // superpower: 'Closed a co-production deal mid-flight, on airplane mode. We still don\'t know how.',
    accentColor: 'rgba(212,175,55,0.7)',
    size: 'wide', // anamorphic full-width card
  },
  {
    id: 7,
    name: 'Vighnesh Shetye',
    role: 'Jr. Editor',
    // department: 'PRODUCTION',
    imageSrc: 'https://res.cloudinary.com/drmwtarrs/image/upload/f_auto,q_auto/hod/headshots/Vighnesh.png',
    imageLabel: '[Insert: Headshot_Vighnesh.png]',
    // superpower: 'Closed a co-production deal mid-flight, on airplane mode. We still don\'t know how.',
    accentColor: 'rgba(212,175,55,0.7)',
    size: 'wide', // anamorphic full-width card
  },
]

// Viewfinder corner bracket component
function ViewfinderBrackets({ visible }) {
  const corners = [
    { top: 10, left: 10, rotate: 0 },
    { top: 10, right: 10, rotate: 90 },
    { bottom: 10, right: 10, rotate: 180 },
    { bottom: 10, left: 10, rotate: 270 },
  ]

  return (
    <>
      {corners.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute z-30 pointer-events-none"
          style={{
            top: pos.top,
            left: pos.left,
            right: pos.right,
            bottom: pos.bottom,
            width: 22,
            height: 22,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.25, ease: 'easeOut', delay: i * 0.04 }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            style={{ transform: `rotate(${pos.rotate}deg)` }}
          >
            <path
              d="M2 14 L2 2 L14 2"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="1.5"
              strokeLinecap="square"
            />
          </svg>
        </motion.div>
      ))}
    </>
  )
}

// Grain overlay SVG (fades out on hover)
function GrainOverlay({ visible }) {
  return (
    <motion.div
      className="absolute inset-0 z-10 pointer-events-none"
      animate={{ opacity: visible ? 0 : 0.45 }}
      transition={{ duration: 0.5 }}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        mixBlendMode: 'overlay',
      }}
    />
  )
}

// Department tag — call sheet style
function DeptTag({ label }) {
  return (
    <span
      style={{
        fontFamily: "'Courier Prime', 'Courier New', monospace",
        fontSize: '0.6rem',
        letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.45)',
        textTransform: 'uppercase',
      }}
    >
      {label}
    </span>
  )
}

function TeamCard({ member, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <FadeUp delay={index * 0.1}>
      <div
        className="relative overflow-hidden group"
        style={{
          borderRadius: '4px',
          minHeight: '420px',
          aspectRatio: '3 / 4', // Enforces the portrait format 
          background: '#0a0a0a',
          cursor: 'crosshair',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Portrait image layer — grayscale by default, color on hover */}
        <motion.div
          className="absolute inset-0 z-0"
          animate={{
            filter: hovered
              ? 'grayscale(0%) contrast(1.05) brightness(0.82)'
              : 'grayscale(100%) contrast(1.2) brightness(0.75)',
          }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          {member.imageSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={member.imageSrc}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: 'linear-gradient(160deg, #1a1a1a 0%, #0d0d0d 100%)' }}
            >
              <span
                style={{
                  fontFamily: "'Courier Prime', 'Courier New', monospace",
                  fontSize: '0.65rem',
                  color: 'rgba(255,255,255,0.18)',
                  letterSpacing: '0.1em',
                  textAlign: 'center',
                  padding: '0 1.5rem',
                  lineHeight: 1.8,
                }}
              >
                {member.imageLabel}
              </span>
            </div>
          )}
        </motion.div>

        {/* Film grain overlay */}
        <GrainOverlay visible={hovered} />

        {/* Persistent dark gradient — bottom vignette */}
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 45%, rgba(0,0,0,0.1) 100%)',
          }}
        />

        {/* Viewfinder brackets on hover */}
        <ViewfinderBrackets visible={hovered} />

        {/* Department label — top left, always visible */}
        <div className="absolute top-5 left-5 z-30">
          <DeptTag label={member.department} />
        </div>

        {/* Accent color line — top edge, always visible */}
        <div
          className="absolute top-0 left-0 right-0 z-30"
          style={{
            height: '2px',
            background: member.accentColor,
            opacity: hovered ? 1 : 0.35,
            transition: 'opacity 0.4s ease',
          }}
        />

        {/* Content — bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-30 p-6">
          <h3
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
              letterSpacing: '0.05em',
              lineHeight: 1,
              color: '#f5f5f0',
              margin: 0,
            }}
          >
            {member.name}
          </h3>

          <div
            style={{
              fontFamily: "'Courier Prime', 'Courier New', monospace",
              fontSize: '0.7rem',
              letterSpacing: '0.12em',
              color: 'rgba(255,255,255,0.55)',
              textTransform: 'uppercase',
              marginTop: '6px',
            }}
          >
            {member.role}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            style={{ overflow: 'hidden' }}
          >
            <div
              style={{
                marginTop: '14px',
                paddingTop: '12px',
                borderTop: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <span
                style={{
                  fontFamily: "'Courier Prime', 'Courier New', monospace",
                  fontSize: '0.68rem',
                  letterSpacing: '0.04em',
                  color: 'rgba(255,255,255,0.38)',
                  display: 'block',
                  marginBottom: '4px',
                  textTransform: 'uppercase',
                }}
              >
                {/* // ON-SET SUPERPOWER */}
              </span>
              <p
                style={{
                  fontFamily: 'Georgia, serif',
                  fontStyle: 'italic',
                  fontSize: '0.82rem',
                  lineHeight: 1.55,
                  color: 'rgba(255,255,255,0.72)',
                  margin: 0,
                  maxWidth: '280px',
                }}
              >
                {/* {member.superpower} */}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </FadeUp>
  )
}

// Sprocket strip — decorative 35mm film edge
function SprocketStrip({ side = 'left' }) {
  const holes = Array.from({ length: 14 })
  return (
    <div
      aria-hidden="true"
      className="hidden lg:flex flex-col gap-0 absolute top-0 bottom-0 z-10"
      style={{
        [side]: 0,
        width: '28px',
        background: '#0a0a0a',
        borderRight: side === 'left' ? '1px solid rgba(255,255,255,0.06)' : 'none',
        borderLeft: side === 'right' ? '1px solid rgba(255,255,255,0.06)' : 'none',
        paddingTop: '12px',
        overflowY: 'hidden',
      }}
    >
      {holes.map((_, i) => (
        <div
          key={i}
          style={{
            width: '10px',
            height: '14px',
            borderRadius: '2px',
            background: 'rgba(255,255,255,0.08)',
            margin: '6px auto',
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  )
}

export default function TeamSection() {
  return (
    <section
      id="team"
      className="relative bg-hod-black py-28 px-12 md:px-20 lg:px-28 overflow-hidden"
      style={{ backgroundColor: '#080808' }}
    >
      <style dangerouslySetInnerHTML={{
        __html: `
        .hod-team-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 16px;
        }
        .hod-team-grid > div {
          width: 100%;
        }
        @media (min-width: 640px) {
          .hod-team-grid {
            gap: 20px;
          }
          .hod-team-grid > div {
            width: calc(50% - 10px);
          }
        }
        @media (min-width: 1024px) {
          .hod-team-grid {
            gap: 24px;
          }
          .hod-team-grid > div {
            width: calc(33.333% - 16px);
          }
        }
        @media (min-width: 1280px) {
          .hod-team-grid > div {
            width: calc(25% - 18px);
          }
        }
      `}} />

      {/* Decorative sprocket strips */}
      <SprocketStrip side="left" />
      <SprocketStrip side="right" />

      <div className="max-w-6xl mx-auto relative">
        {/* Section header */}
        <FadeUp>
          <div className="mb-14">
            <div
              style={{
                fontFamily: "'Courier Prime', 'Courier New', monospace",
                fontSize: '0.65rem',
                letterSpacing: '0.22em',
                color: 'rgba(255,255,255,0.35)',
                textTransform: 'uppercase',
                marginBottom: '18px',
              }}
            >
              CAST &amp; CREW
            </div>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(3rem, 7vw, 6rem)',
                letterSpacing: '0.03em',
                lineHeight: 0.95,
                color: '#f5f5f0',
                margin: 0,
              }}
            >
              The people
              <br />
              behind the lens.
            </h2>
          </div>
        </FadeUp>

        {/* Responsive Grid rendering ALL members */}
        <div className="hod-team-grid">
          {teamMembers.map((member, i) => (
            <TeamCard key={member.id} member={member} index={i} />
          ))}
        </div>

        {/* Footer credit line */}
        <FadeUp delay={0.5}>
          <div
            className="mt-10 text-center"
            style={{
              fontFamily: "'Courier Prime', 'Courier New', monospace",
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              color: 'rgba(255,255,255,0.18)',
              textTransform: 'uppercase',
            }}
          >
          </div>
        </FadeUp>
      </div>
    </section>
  )
}