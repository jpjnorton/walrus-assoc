/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",  // Include Next.js pages
    "./components/**/*.{js,ts,jsx,tsx}", // Include any components
    "./src/**/*.{js,ts,jsx,tsx}", // Include everything inside /src
    "./styles/**/*.css" // Ensure Tailwind reads from your styles folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
