
const config = {

  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        label: '#ebebeb', // Exemplo de cor personalizada
      },
      spacing: {
        128: '32rem', // Exemplo de espaçamento personalizado
      },
      fontFamily: {
        custom: ['"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
