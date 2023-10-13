/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      fontWeight: {
        'inter-100': '100',
        'inter-200': '200',
        'inter-300': '300',
        'inter-400': '400',
        'inter-500': '500',
        'inter-600': '600',
        'inter-700': '700',
        'inter-800': '800',
        'inter-900': '900',
      },
      colors : {
        'pyellow': '#FEBD22',
        'pyellowHover': '#FFCA3D',
        'pcream' : '#FFF3d6',
        'pblack' : '#322F2A',
        'pgray' : '#959493',
        'pwhite' : '#F9F9FB',
      },
    },
    plugins: [],
  },
};
