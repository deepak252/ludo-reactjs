/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
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
          // DEFAULT: '#179E25',
          // 200: '#4CCF6A',
          // 300: '#34C759',
          // 400: '#179E25',
          // 600: '#107A1E',
          // 700: '#0B5C15',
          // 800: '#044B0F',
        },
        red: {
          // DEFAULT: '#FF0100',
          // 200: '#FF5555',
          // 300: '#FF7777',
          // 400: '#FF0100',
          // 600: '#CC0000',
          // 700: '#990000',
          // 800: '#660000',
        },
        blue: {
          // DEFAULT: '#0049D8',
          // 200: '#66A5E5',
          // 300: '#87C4F7',
          // 400: '#0049D8',
          // 600: '#003A7F',
          // 700: '#002F5F',
          // 800: '#002244',
        },
        yellow: {
          // DEFAULT: '#F6C400',
          // 200: '#F7DC6F',
          // 300: '#F9E07B',
          // 400: '#F6C400',
          // 600: '#F2B300',
          // 700: '#F0A000',
          // 800: '#E98C00',
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
