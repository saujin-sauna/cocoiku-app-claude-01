import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'cocoiku-green': '#22c55e',
        'cocoiku-blue': '#3b82f6',
        'cocoiku-light-green': '#dcfce7',
        'cocoiku-light-blue': '#dbeafe',
      },
    },
  },
  plugins: [],
}
export default config
