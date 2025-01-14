/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  safelist: [
    'bg-green-200',
    'bg-yellow-200',
    'bg-blue-200',
    'bg-red-200',
    'bg-green-500',
    'bg-yellow-500',
    'bg-blue-500',
    'bg-red-500',
    'bg-green-600',
    'bg-yellow-600',
    'bg-blue-600',
    'bg-red-600',
    'animate-glow-red',
    'animate-glow-green',
    'animate-glow-blue',
    'animate-glow-yellow',
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '1px 1px 8px 2px #BDBDBD',
        token: '0 2px 4px rgba(0, 0, 0, 0.4)',
      },
      colors: {
        primary: {
          DEFAULT: '#00235C', //// Buttons, Active State (Checkbox), Textfield border (Focus)
          100: '#E1E0F9', // Chip
          200: '#FFD690', // Floating Button
          300: '#B3B5D9',
          500: '#00235C',
        },
        secondary: '#2A64BF',
        gray: {
          DEFAULT: '#9E9E9E',
          100: '#F8F8F8',
          200: '#EEEEEE',
          300: '#E0E0E0',
          350: '#CCCCCC',
          400: '#BDBDBD',
          500: '#9E9E9E',
          600: '#707070',
          700: '#616161',
          750: '#52586F',
          800: '#323645',
          900: '#212121',
          1200: '#FFFFFF4D',
          1500: '#70707080',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        josefin: ['Josefin Sans', 'sans-serif'],
        veneer: ['Veneer', 'sans-serif'],
        quicksand: ['Quicksand', 'sans-serif'],
      },
      fontSize: {
        13: '13px',
        15: '15px',
        17: '17px',
      },

      keyframes: {
        glowRed: {
          '0%, 100%': { boxShadow: '0 0 0 3px rgba(132, 0, 0, 0.2)' },
          '50%': { boxShadow: '0 0 0 12px rgba(132, 0, 0, 0.3)' },
        },
        glowGreen: {
          '0%, 100%': { boxShadow: '0 0 0 3px rgba(3, 90, 0, 0.2)' },
          '50%': { boxShadow: '0 0 0 12px rgba(3, 90, 0, 0.3)' },
        },
        glowBlue: {
          '0%, 100%': { boxShadow: '0 0 0 3px rgba(0, 27, 111, 0.2)' },
          '50%': { boxShadow: '0 0 0 12px rgba(0, 27, 111, 0.3)' },
        },
        glowYellow: {
          '0%, 100%': { boxShadow: '0 0 0 3px rgba(111, 99, 0, 0.2)' },
          '50%': { boxShadow: '0 0 0 12px rgba(111, 99, 0, 0.3)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        shimmer: {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(100%)',
          },
        },
      },
      animation: {
        'glow-red': 'glowRed 2s infinite', // 2 seconds, infinite loop
        'glow-green': 'glowGreen 2s infinite',
        'glow-blue': 'glowBlue 2s infinite',
        'glow-yellow': 'glowYellow 2s infinite',
        fadeIn: 'fadeIn 0.2s ease-in-out',
        fadeOut: 'fadeOut 0.2s ease-in-out',
        shimmer: 'shimmer 1.5s infinite',
      },
      screens: {
        xs: '480px',
      },
      zIndex: {
        dropdown: 50,
        navbar: 200,
        drawerMobile: 900,
        modal: 500,
        toast: 990,
        loader: 1000,
      },
    },
  },
  plugins: [],
}
