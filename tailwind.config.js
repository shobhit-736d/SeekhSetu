/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Studley AI Authenticated Brand Palette
        primary: {
          DEFAULT: '#FA4616',
          hover: '#E03D0F',
          active: '#C33005',
          dark: '#B82E04',
          50: '#FFF5F2',
          100: '#FEEAE4',
          200: '#FDE7DB',
          500: '#FA4616',
          600: '#E03D0F',
        },
        flame: {
          DEFAULT: '#FA4616',
          tint: '#FCF0E8',
          hover: '#E03D0F',
          active: '#C33005',
          warm: '#ED7649',
        },
        secondary: {
          DEFAULT: '#FDE7DB',
          tint: '#FCF0E8',
        },
        blue1: {
          DEFAULT: '#1754D8',
          hover: '#1446B8',
          subtle: '#EBF2FF',
        },
        ink: {
          DEFAULT: '#191817',
          muted: '#57534E',
          subtle: '#78716C',
        },
        cream: {
          DEFAULT: '#FAF6F0',
          pure: '#FAF6F0',
          subtle: '#F5EFE6',
        },
        studley: {
          bg: 'var(--bg-primary)',
          card: 'var(--bg-card)',
          surface: 'var(--bg-surface)',
          elevated: 'var(--bg-elevated)',
          border: 'var(--border-subtle)',
          text: 'var(--text-primary)',
          muted: 'var(--text-secondary)',
        },

        // Dynamic theme tokens powered by CSS variables
        aurora: {
          bg: {
            primary: 'var(--bg-primary)',       // Dynamic canvas
            secondary: 'var(--bg-secondary)',   // Dynamic secondary card
            elevated: 'var(--bg-elevated)',     // Dynamic elevated surface
            card: 'var(--bg-card)',             // Dynamic card
            surface: 'var(--bg-surface)',       // Dynamic interactive surface
          },
          text: {
            primary: 'var(--text-primary)',     // Dynamic primary heading/body text
            secondary: 'var(--text-secondary)', // Dynamic secondary subtitle text
            muted: 'var(--text-muted)',
          },
          border: 'var(--border-subtle)',
          borderStrong: 'var(--border-strong)',
          borderHover: '#FA4616',
          indigo: {
            DEFAULT: '#FA4616',       // Studley Primary Flame
            hover: '#E03D0F',
            muted: 'rgba(250, 70, 22, 0.12)',
            glow: 'rgba(250, 70, 22, 0.35)',
          },
          violet: {
            DEFAULT: '#ED7649',       // Studley Warm Flame Accent
            muted: 'rgba(237, 118, 73, 0.15)',
          },
          cyan: {
            DEFAULT: '#1754D8',       // Studley Blue1 Accent
            muted: 'rgba(23, 84, 216, 0.12)',
          },
          success: {
            DEFAULT: '#16A34A',
            muted: 'rgba(22, 163, 74, 0.15)',
          },
          warning: {
            DEFAULT: '#D97706',
            muted: 'rgba(217, 119, 6, 0.15)',
          },
        }
      },
      fontFamily: {
        display: ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'studley-btn': '0 2px 8px -1px rgba(250, 70, 22, 0.35), 0 1px 3px rgba(0, 0, 0, 0.1)',
        'studley-btn-dark': '0 2px 8px -1px rgba(250, 70, 22, 0.4)',
        'studley-card': 'var(--card-shadow)',
        'aurora-glow': '0 0 24px -2px rgba(250, 70, 22, 0.25)',
        'aurora-cyan': '0 0 24px -2px rgba(37, 99, 235, 0.25)',
        'aurora-card': 'var(--card-shadow)',
        'aurora-elevated': '0 12px 32px -4px rgba(0, 0, 0, 0.2), 0 0 0 1px var(--border-subtle)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'border-flow': 'border-flow 4s linear infinite',
      },
      keyframes: {
        'border-flow': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        }
      }
    },
  },
  plugins: [],
}
