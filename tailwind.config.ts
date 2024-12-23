import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "todo-font-color": "#4EA8DE",
        "app-font-color": "#5E60CE",
        "header-background": "#0D0D0D",
        "body-background": "#1A1A1A",
        "card-bg": "#262626",
        "create-task-bg": "#1E6F9F",
        "task-count-color": "#4EA8DE",
        "completed-count-color": "#8284FA"
      },
    },
  },
  plugins: [],
} satisfies Config;
