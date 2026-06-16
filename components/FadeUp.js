'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function FadeUp({
  children,
  delay = 0,
  duration = 0.85,
  threshold = 0.15,
  className = '',
  once = true,
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: '-80px', amount: threshold })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
