/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/views/**/*.ejs", "./src/public/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        "regular-dark-cl": "var(--vcn-regular-dark-cl)",
        "regular-blue-cl": "var(--vcn-regular-blue-cl)",
        "regular-blue-hover-cl": "var(--vcn-regular-blue-hover-cl)",
        "bg-gradient-top-cl": "var(--vcn-bg-gradient-top-cl)",
        "bg-gradient-bottom-cl": "var(--vcn-bg-gradient-bottom-cl)",
        "blue-main-cl": "var(--vcn-blue-main-cl)",
        "blue-light-cl": "var(--vcn-blue-light-cl)",
        "blue-glow-cl": "var(--vcn-blue-glow-cl)",
        "white-cl": "var(--vcn-white-cl)",
        "text-main-cl": "var(--vcn-text-main-cl)",
        "border-cl": "var(--vcn-border-cl)",
        "input-bg-cl": "var(--vcn-input-bg-cl)",
        "input-border-cl": "var(--vcn-input-border-cl)",
        "btn-blue-cl": "var(--vcn-btn-blue-cl)",
        "btn-blue-hover-cl": "var(--vcn-btn-blue-hover-cl)",
        "btn-glow-cl": "var(--vcn-btn-glow-cl)",
      },
      height: {
        "hero-section": "var(--vcn-hero-section-height)",
      },
    },
  },
  plugins: [],
};
