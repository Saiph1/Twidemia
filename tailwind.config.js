/** @type {import('tailwindcss').Config} */
module.exports = {
  // corePlugins: {
  // preflight: false,
  // },
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  important: "#__next",
  theme: {
    extend: {
      boxShadow: {
        tweetPosts: "rgba(99, 99, 99, 0.3) 0px 0px 12px 0px",
      },
      colors: {
        "primary-blue": "#1D9BF0", // the Twitter blue
        "primary-black": "#252525", // for black text, #000 is not suggested
      },
    },
  },
  plugins: [],
};
