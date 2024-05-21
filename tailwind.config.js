/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "or-color": "var(--or-color)",
        "bg-color": "var(--bg-color)",
        "blue-ocean": "var(--blue-800)",
        "blue-light": "var(--lue-200)",
        "text-color": "var(--text-color)",
        "blue-alice": "var(--blue-alice)"
      },
      backgroundImage: {
        "home-presentation": "url(./assets/pics/home_presentation.png)",
        "ceremonie-ouvertue": "url(./assets/pics/ceremonie-paris-2024.jpg)",
        "description-jo-bg": "url(./assets/pics/JO_description_bg.png)",
        "paris-rings": "url(./assets/pics/paris-rings-jo.jpg)"
      }
    },
  },
  plugins: [],
}