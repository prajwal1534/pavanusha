/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue,html}", // Adjust these paths to match your project structure
  ],
  theme: {
    extend: {
      colors: {
        royal: {
          ivory: "#F9F6F0", // Main invitation text
          gold: "#E6C687", // Couple's names / Callouts
          blush: "#D8B4B4", // Secondary accents / Subheadings
          antique: "#C5A059", // Primary button background (Gold option)
          powder: "#8FA4B5", // Primary button background (Blue option)
          charcoal: "#1A1A1A", // High-contrast text for buttons
        },
      },
      fontFamily: {
        // Font families arranged with primary and fallback options
        couple: ['"Playfair Display"', '"Great Vibes"', "serif"],
        heading: ['"Cinzel"', '"Cormorant Garamond"', "serif"],
        button: ['"Montserrat"', '"Lato"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
