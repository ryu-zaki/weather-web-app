/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/*.html'],
  theme: {

    screens: {

      'xsm': '450px',

      'sm': '620px',
      // => @media (min-width: 620px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },

    colors: {
      'mainBg': '#EAECED',
      'primary': '#2F69FE',
      'secBg': '#EEF2F3',
      'primaryDark': '#112C4E',
      'white': '#fff',
      'black': '#000',
      'gray': '#666',
      'lightGray': '#fcfcfc',
      'lightPrimary': '#8CB2FB',
      'catergoryBg': '#2b497c',
      'lightText': '#bbb',
      'trans': 'transparent',
      'red': '#FF605C',
      'yellow': '#FFBD44',
      'green': '#00CA4E',
      'dark': '#222',
      'modalBg': 'rgba(0,0,0,0.5)',
      'rose': '#E2252B',
      'lightDark': '#333',
      'neon': '#1DA6AA'
    },

    backgroundImage: {
      'linearBg': 'linear-gradient(#112C4E, #112C4E)'
    },

    extend: {},
  },
  plugins: [],
}

