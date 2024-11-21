/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
const plugin = require('tailwindcss/plugin')

export default {
  prefix: 'tw-',
  important: false,
  content: [
    './public/index.html',
    './src/**/*.{vue,js,ts}',
    './src/views/**/*.{vue,js,ts}',
    './src/components/**/*.{vue,js,ts}',
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
