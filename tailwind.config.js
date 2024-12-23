/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    backgroundImage: {
      'hero-pattern': "url('./src/assets/Image/frame.png')",
      'footer-texture': "url('/img/footer-texture.png')",
    },
  },
  plugins: [],
}

