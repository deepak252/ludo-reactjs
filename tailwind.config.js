/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        auth: "url('/assets/auth-bg.png')",
        signUpSuccess: "url('/assets/sign-up-success-bg.png')",
        homeGrid: "url('/assets/bg-grid.png')",
      },
      boxShadow: {
        '3xl': '1px 1px 8px 2px #BDBDBD',
      },
      colors: {
        primary: {
          DEFAULT: '#FCAC1D', //// Buttons, Active State (Checkbox), Textfield border (Focus)
          100: '#E1E0F9', // Chip
          200: '#FFD690', // Floating Button
          300: '#B3B5D9',
          500: '#FCAC1D',
        },
        secondary: '#020865',
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
        green: {
          DEFAULT: 'green',
          200: '#E8FFE4',
          600: '#51B42E',
        },
        red: {
          DEFAULT: 'red',
          200: '#FEECEC',
          600: '#D31B1B',
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
    },
  },
  plugins: [],
}
