// tailwind.config.ts
import type { Config } from "tailwindcss";
import { poppins } from "./app/fonts";
import typography from "@tailwindcss/typography";



const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Use the CSS variable from next/font
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      
    },
  },
  plugins: [typography],
};

export default config;




      

