/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/views/**/*.ejs", "./public/**/*.js"],
  theme: {
    extend: {
      colors: {
        "regular-black-cl": "var(--vcn-regular-black-cl)",
        "regular-blue-cl": "var(--vcn-regular-blue-cl)",
        "regular-blue-hover-cl": "var(--vcn-regular-blue-hover-cl)",
        "regular-dark-blue-cl": "var(--vcn-regular-dark-blue-cl)",
        "regular-light-blue-cl": "var(--vcn-regular-light-blue-cl)",
        "regular-gray-cl": "var(--vcn-regular-gray-cl)",
        "regular-light-gray-cl": "var(--vcn-regular-light-gray-cl)",
        "regular-gradient-dark-cl": "var(--vcn-regular-gradient-dark-cl)",
        "regular-gradient-dark-blue-cl": "var(--vcn-regular-gradient-dark-blue-cl)",
        "regular-neon-cl": "var(--vcn-regular-neon-cl)",
      },
      height: {
        "hero-bg": "var(--vcn-hero-bg-height)",
        "hero-bg-shorter": "var(--vcn-hero-bg-shorter-height)",
      },
    },
  },
  plugins: [],
}
