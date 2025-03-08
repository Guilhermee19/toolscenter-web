/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      width:{
        'calc90': 'calc(100% - 10px)'
      },
      height:{

      },
      colors:{
        'main': '#4cc2ff',
        'navbar-hover': '#2e2e2e',
        'card-opacity': 'rgba( 255, 255, 255, 0.02 )',
        'border-opacity': 'rgba( 255, 255, 255, 0.18 )'
      },
      padding: {
        '3x5': '3px 5px',
        '3x0': '3px 0'
      },
      boxShadow:{
        'card-opacity': '0 8px 32px 0 rgba( 0, 0, 0, 0.07 );'
      },
      animation: {
        'line-start': 'line-start 0.1s', // Define a animação com duração e comportamento
      },
      keyframes: {
        'line-start': {
          '0%': { height: '0px' }, // Defina o início da animação
          '100%': { height: '16px' }, // Defina o fim da animação
        },
      },
      filterBlur: {
        'blur-sm': 'blur(1px)', // Definindo o valor personalizado para blur de 1px
        'backdrop-filter': 'backdrop-filter: blur( 4px );'
      },
    },
  },
  plugins: [],
}
