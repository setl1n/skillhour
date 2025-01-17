// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"], // Adjust based on your project structure
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Global colors with reduced opacity
        primary: "#5B8B85", // Default primary color
        secondary: "#A6857B",
        background: "#FAFAFA",
        text: "#2C3335",
        accent: "#6B9A6A",
        highlight: "#C69090",
        muted: "#8A9B84",
        surface: "rgba(230, 220, 211, 0.3)", // Reduced opacity
      },
      animation: {
        'soft-bounce': 'soft-bounce 1.5s infinite',
        'photo-rotate': 'photo-rotate 20s linear infinite',
      },
      keyframes: {
        'soft-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'photo-rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      },
      boxShadow: {
        'profile': '0 0 0 4px rgba(91, 139, 133, 0.3)', // Based on primary color
      },
      spacing: {
        'section': '4rem',
      },
      typography: {
        DEFAULT: {
          css: {
            'pre': {
              backgroundColor: '#1E1E1E', // Dark background
              color: '#E1E1E1', // Light text
              padding: '1.25rem',
              borderRadius: '0.5rem',
              border: '1px solid rgb(55, 65, 81)',
              marginTop: '1.5em',
              marginBottom: '1.5em',
              overflowX: 'auto',
            },
            'pre code': {
              backgroundColor: 'transparent',
              color: 'inherit',
              border: 'none',
              padding: '0',
              borderRadius: '0',
              fontSize: '0.875rem',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            },
            'code': {
              color: 'var(--tw-prose-code)',
              backgroundColor: 'transparent',
              borderRadius: '0.25rem',
              padding: '0.2em 0.4em',
              fontWeight: '400',
            },
            'code::before': {
              content: '""'
            },
            'code::after': {
              content: '""'
            },
            // Syntax colors without backgrounds
            '.token.comment': { color: '#6A9955' },
            '.token.string': { color: '#CE9178' },
            '.token.number': { color: '#B5CEA8' },
            '.token.function': { color: '#DCDCAA' },
            '.token.keyword': { color: '#569CD6' },
            '.token.operator': { color: '#D4D4D4' },
            '.token.punctuation': { color: '#D4D4D4' }
          }
        }
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  presets: [
    {
      theme: {
        extend: {
          fontFamily: {
            display: ['Playfair Display', 'serif'],
          },
        },
      },
    },
  ],
};
