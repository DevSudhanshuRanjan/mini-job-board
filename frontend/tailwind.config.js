/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── DESIGN SYSTEM · NOTION-INSPIRED PALETTE ──
        // Brand & Primary
        primary: {
          DEFAULT: '#5645d4',
          pressed: '#4534b3',
          deep: '#3a2a99',
        },
        'on-primary': '#ffffff',
        'brand-navy': {
          DEFAULT: '#0a1530',
          deep: '#070f24',
          mid: '#1a2a52',
        },
        'link-blue': {
          DEFAULT: '#0075de',
          pressed: '#005bab',
        },

        // Brand color spectrum
        'brand-orange': { DEFAULT: '#dd5b00', deep: '#793400' },
        'brand-pink': { DEFAULT: '#ff64c8', deep: '#a02e6d' },
        'brand-purple': { DEFAULT: '#7b3ff2', 300: '#d6b6f6', 800: '#391c57' },
        'brand-teal': '#2a9d99',
        'brand-green': '#1aae39',
        'brand-yellow': '#f5d75e',
        'brand-brown': '#523410',

        // Card tints (pastel backgrounds)
        'tint-peach': '#ffe8d4',
        'tint-rose': '#fde0ec',
        'tint-mint': '#d9f3e1',
        'tint-lavender': '#e6e0f5',
        'tint-sky': '#dcecfa',
        'tint-yellow': { DEFAULT: '#fef7d6', bold: '#f9e79f' },
        'tint-cream': '#f8f5e8',
        'tint-gray': '#f0eeec',

        // Surface system
        canvas: '#ffffff',
        surface: '#f6f5f4',
        'surface-soft': '#fafaf9',
        hairline: { DEFAULT: '#e5e3df', soft: '#ede9e4', strong: '#c8c4be' },

        // Text hierarchy
        'ink-deep': '#000000',
        ink: '#1a1a1a',
        charcoal: '#37352f',
        slate: '#5d5b54',
        steel: '#787671',
        stone: '#a4a097',
        muted: '#bbb8b1',
        'on-dark': '#ffffff',
        'on-dark-muted': '#a4a097',

        // Semantic
        success: '#1aae39',
        warning: '#dd5b00',
        error: '#e03131',
        info: '#0075de',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'system-ui', '"Segoe UI"', 'Helvetica', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'hero': ['80px', { lineHeight: '1.05', letterSpacing: '-2px', fontWeight: '600' }],
        'display-lg': ['56px', { lineHeight: '1.10', letterSpacing: '-1px', fontWeight: '600' }],
        'h1': ['48px', { lineHeight: '1.15', letterSpacing: '-0.5px', fontWeight: '600' }],
        'h2': ['36px', { lineHeight: '1.20', letterSpacing: '-0.5px', fontWeight: '600' }],
        'h3': ['28px', { lineHeight: '1.25', fontWeight: '600' }],
        'h4': ['22px', { lineHeight: '1.30', fontWeight: '600' }],
        'h5': ['18px', { lineHeight: '1.40', fontWeight: '600' }],
        'subtitle': ['18px', { lineHeight: '1.50', fontWeight: '400' }],
      },
      borderRadius: {
        xs: '4px',
        sm: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
      spacing: {
        'section-sm': '48px',
        'section': '64px',
        'section-lg': '96px',
        'hero-space': '120px',
      },
      boxShadow: {
        'subtle': 'rgba(15, 15, 15, 0.04) 0px 1px 2px 0px',
        'card': 'rgba(15, 15, 15, 0.08) 0px 4px 12px 0px',
        'mockup': 'rgba(15, 15, 15, 0.20) 0px 24px 48px -8px',
        'modal': 'rgba(15, 15, 15, 0.16) 0px 16px 48px -8px',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
        'slide-in': 'slideIn 0.3s ease forwards',
        'shimmer': 'shimmer 1.8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-700px 0' },
          '100%': { backgroundPosition: '700px 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
