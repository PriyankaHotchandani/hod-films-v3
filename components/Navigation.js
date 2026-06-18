'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Brands', href: '#brands' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Work', href: '#work' },
    { label: 'Team', href: '#team' },
    { label: 'Contact', href: '#contact' },
  ]

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'nav-blur bg-black/20 backdrop-blur-md' : 'bg-transparent'
          }`}
      >
        <div className="flex items-center justify-between px-8 md:px-16 lg:px-20 h-16 md:h-20">
          {/* Hamburger / Close Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-3 group"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-[5px] w-6">
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="block h-[1.5px] bg-white/80 group-hover:bg-white transition-colors"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="block h-[1.5px] bg-white/80 group-hover:bg-white transition-colors"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="block h-[1.5px] bg-white/80 group-hover:bg-white transition-colors"
              />
            </div>
            <span className="section-label hidden md:block text-white/80 group-hover:text-white transition-colors">
              {menuOpen ? 'Close' : 'Menu'}
            </span>
          </button>

          {/* Logo — center */}
          <a
            href="#"
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center leading-none no-select"
            onClick={() => setMenuOpen(false)}
          >
            <span
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.2em', fontSize: '1.3rem' }}
              className="text-black tracking-widest"
            >
              HOUSE OF DOSHI
            </span>
            <span className="section-label text-white/60" style={{ letterSpacing: '0.4em', fontSize: '0.5rem', marginTop: '2px' }}>
              FILMS
            </span>
          </a>

          {/* Right: nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="section-label text-white/70 hover:text-white transition-colors duration-300"
                style={{ fontSize: '0.68rem', letterSpacing: '0.18em' }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="md:hidden w-6" />
        </div>
      </motion.nav>

      {/* Full-screen overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-40 grain-overlay"
            style={{ background: 'rgba(10,10,10,0.97)' }}
          >
            {/* Adjusted padding to match the header (px-8 md:px-16 lg:px-20) */}
            <div className="flex flex-col justify-center h-full px-8 md:px-16 lg:px-20 pt-20 pb-10">
              {/* Removed mx-auto so it naturally aligns to the left edge */}
              <div className="w-full max-w-7xl">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)} // Add the click handler here too
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="block py-3 border-b border-white/5 group text-left"
                  >
                    <span
                      style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '0.06em' }}
                      className="text-white/80 group-hover:text-white transition-colors duration-300 block"
                    >
                      {link.label}
                    </span>
                    <span className="section-label text-white/50 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 mt-1 block">
                      →
                    </span>
                  </motion.a>
                ))}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-left"
                >
                  <a href="mailto:mehul@houseofdoshi.com" className="section-label text-white/60 hover:text-white transition-colors">
                    mehul@houseofdoshi.com
                  </a>
                  <span className="section-label text-white/30 hidden sm:block">·</span>
                  <a href="tel:+918291933663" className="section-label text-white/60 hover:text-white transition-colors">
                    +91 82919 33663
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}