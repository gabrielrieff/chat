import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        chat: "url('../../public/background.png')",
      },
      keyframes: {
        spin: {
          from: {
            transform: "rotateX(0deg)",
          },
          to: {
            transform: "rotateX(360deg)",
          },
        },
      },
      animation: {
        spin: "spin 1.2s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
