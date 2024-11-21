/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
const plugin = require('tailwindcss/plugin')

export default {
  prefix: 'tw-',
  important: false,
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx,glsl}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
    require('@tailwindcss/forms'),
  ],
  daisyui: {
    themes: ["light", "dark"], // Example: Pre-configured themes
  },
};
