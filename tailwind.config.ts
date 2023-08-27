import type {Config} from 'tailwindcss'

const {nextui} = require("@nextui-org/react");


const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './modules/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary) / 1)",
        secondary: "rgb(var(--color-secondary) / 1)",
        // text: "rgb(var(--color-text) / 1)",
        success: "rgb(var(--color-success) / 1)",
        info: "rgb(var(--color-info) / 1)",
        warn: "rgb(var(--color-warn) / 1)",
        error: "rgb(var(--color-error) / 1)",
        // default: "rgb(var(--color-default) / 1)",

        transparent: "transparent",
        current: "currentColor",
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
            'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  darkMode: ['class', '[data-mode="dark"]'],
  plugins: [nextui()],
}
export default config
