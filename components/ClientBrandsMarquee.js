"use client";

import { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";

const CLIENT_BRANDS = [
  { id: 1,  name: "Client 11", logo: "https://res.cloudinary.com/drmwtarrs/image/upload/f_auto,q_auto/hod/logos/somaiya_TRUST.png" },
  { id: 2,  name: "Client 1",  logo: "https://res.cloudinary.com/drmwtarrs/image/upload/f_auto,q_auto/hod/logos/AASHIANA_ESTATE.png" },
  { id: 3,  name: "Client 2",  logo: "https://res.cloudinary.com/drmwtarrs/image/upload/f_auto,q_auto/hod/logos/EARTHBOURN.png" },
  { id: 4,  name: "Client 8",  logo: "https://res.cloudinary.com/drmwtarrs/image/upload/f_auto,q_auto/hod/logos/KJSIM.png" },
  { id: 5,  name: "Client 3",  logo: "https://res.cloudinary.com/drmwtarrs/image/upload/f_auto,q_auto/hod/logos/FG.png" },
  { id: 6,  name: "Client 4",  logo: "https://res.cloudinary.com/drmwtarrs/image/upload/f_auto,q_auto/hod/logos/GODREJ_AGROVET.png" },
  { id: 7,  name: "Client 12", logo: "https://res.cloudinary.com/drmwtarrs/image/upload/f_auto,q_auto/hod/logos/SSA.png" },
  { id: 8,  name: "Client 6",  logo: "https://res.cloudinary.com/drmwtarrs/image/upload/f_auto,q_auto/hod/logos/INKA.png" },
  { id: 9,  name: "Client 7",  logo: "https://res.cloudinary.com/drmwtarrs/image/upload/f_auto,q_auto/hod/logos/KEFI.png" },
  { id: 10, name: "Client 5",  logo: "https://res.cloudinary.com/drmwtarrs/image/upload/f_auto,q_auto/hod/logos/HOSPITAL.png" },
  { id: 11, name: "Client 9",  logo: "https://res.cloudinary.com/drmwtarrs/image/upload/f_auto,q_auto/hod/logos/PARKSONS.png" },
  { id: 13, name: "Client 13", logo: "https://res.cloudinary.com/drmwtarrs/image/upload/f_auto,q_auto/hod/logos/SVU.png" },
  { id: 12, name: "Client 10", logo: "https://res.cloudinary.com/drmwtarrs/image/upload/f_auto,q_auto/hod/logos/Phoenix_Insurance.png" },
];

function MarqueeTrack({ brands, speed = 38 }) {
  const trackRef = useRef(null);
  const x = useMotionValue(0);
  const isPaused = useRef(false);

  useAnimationFrame((_, delta) => {
    if (isPaused.current || !trackRef.current) return;

    const trackWidth = trackRef.current.scrollWidth / 2; // half = one set
    const next = x.get() - (speed * delta) / 1000;

    // Seamless loop: snap back by one full set-width, invisibly
    if (next <= -trackWidth) {
      x.set(next + trackWidth);
    } else {
      x.set(next);
    }
  });

  // Duplicate so the strip never runs dry
  const doubled = [...brands, ...brands];

  return (
    <motion.div
      ref={trackRef}
      style={{ x }}
      className="flex items-center w-max will-change-transform"
      onMouseEnter={() => (isPaused.current = true)}
      onMouseLeave={() => (isPaused.current = false)}
    >
      {doubled.map((brand, i) => (
        <div key={`${brand.id}-${i}`} className="pr-16 flex-shrink-0">
          <BrandLogo brand={brand} />
        </div>
      ))}
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// INDIVIDUAL LOGO
// ─────────────────────────────────────────────
function BrandLogo({ brand }) {
  return (
    <motion.div
      className="group relative flex items-center justify-center
                 px-4 py-2 cursor-default select-none"
      whileHover={{ scale: 1.06 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Subtle hover border */}
      <span
        className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100
                   transition-opacity duration-500 ring-1 ring-black/8"
        aria-hidden="true"
      />

      {/* Logo image */}
      <img
        src={brand.logo}
        alt={brand.name}
        className="h-12 w-auto max-w-[140px] object-contain
                   opacity-70
                   group-hover:opacity-100
                   transition-opacity duration-400 ease-in-out"
        draggable={false}
      />
    </motion.div>
  );
}

export default function ClientBrandsMarquee() {
  return (
    <section
      id="brands"
      aria-label="Clients we've worked with"
      className="relative w-full overflow-hidden bg-white py-10 scroll-mt-20 md:scroll-mt-24"
    >
      {/* ── Top hairline ── */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

      {/* ── Section eyebrow ── */}
      <p className="text-center text-[10px] tracking-[0.3em] uppercase text-black/30 mb-8 font-light">
        Trusted By
      </p>

      {/* ── Scrolling strip ── */}
      <div className="relative flex items-center">
        {/* Left fade — keyed to white */}
        <div
          className="absolute left-0 top-0 h-full w-32 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Right fade — keyed to white */}
        <div
          className="absolute right-0 top-0 h-full w-32 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to left, #ffffff 0%, rgba(255,255,255,0) 100%)",
          }}
          aria-hidden="true"
        />

        <MarqueeTrack brands={CLIENT_BRANDS} speed={38} />
      </div>

      {/* ── Bottom hairline ── */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
    </section>
  );
}