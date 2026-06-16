/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      colors: {
        /* Light theme palette (variable names kept for compatibility) */
        'hod-black': '#f7f7f7',
        'hod-dark': '#f2f2f2',
        'hod-gray': '#ffffff',
        'hod-mid': '#e9e9e9',
        'hod-silver': '#8a8a8a',
        'hod-light': '#c8c8c8',
        'hod-white': '#0a0a0a',
        'hod-accent': '#d4af37',
      },
      letterSpacing: {
        'widest-xl': '0.25em',
        'widest-2xl': '0.35em',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'cinematic': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
