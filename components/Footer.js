'use client'

export default function Footer() {
  return (
    <footer className="bg-hod-black border-t border-black/5 py-20 px-8 md:px-16 lg:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">

        {/* Logo / Brand */}
        <div className="mb-6 mt-10">
          <div
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.2em', fontSize: '1.8rem' }}
            className="text-hod-white"
          >
            HOUSE OF DOSHI
          </div>
          <div className="section-label mt-2" style={{ letterSpacing: '0.4em', fontSize: '0.65rem' }}>
            FILMS
          </div>
        </div>

        <p className="text-hod-silver text-sm leading-relaxed font-light max-w-sm mb-24" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Premium film production. Mumbai-based, globally minded.
        </p>

        {/* Divider */}
        <div className="hod-divider w-full max-w-3xl mb-8" />

        {/* Bottom row */}
        <div className="section-label" style={{ fontSize: '0.58rem' }}>
          © {new Date().getFullYear()} House of Doshi Films. All rights reserved.
        </div>

        {/* Giant watermark text */}
        <div className="mt-16 w-full flex justify-center">
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(4rem, 18vw, 15rem)',
              letterSpacing: '0.03em',
              lineHeight: 0.8,
              color: 'rgba(10,10,10,0.04)',
              userSelect: 'none',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            HOD FILMS
          </div>
        </div>

      </div>
    </footer>
  )
}