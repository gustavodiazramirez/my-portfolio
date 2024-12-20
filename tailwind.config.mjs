/** @type {import('tailwindcss').Config} */
import animations from '@midudev/tailwind-animations'

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
	  extend: {
		colors: {
		  primary: '#FACC00', 
		
		},
		fontFamily: {
		  rubik: ['Rubik', 'sans-serif'], 
		},
	  },
	},
	plugins: [animations],
  };
  