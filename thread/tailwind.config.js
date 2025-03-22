/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    // "components/**/*.{ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        bluedark: "var(--bluedark)",
        "bluedark-active": "var(--bluedark-active)",
        "bluedark-hover": "var(--bluedark-hover)",
        "bluelight-active": "var(--bluelight-active)",
        "bluelight-hover": "var(--bluelight-hover)",
        bluelighter: "var(--bluelighter)",
        bluenormal: "var(--bluenormal)",
        "bluenormal-active": "var(--bluenormal-active)",
        "bluenormal-hover": "var(--bluenormal-hover)",
        greydark: "var(--greydark)",
        "greydark-active": "var(--greydark-active)",
        "greydark-hover": "var(--greydark-hover)",
        greydarker: "var(--greydarker)",
        greylight: "var(--greylight)",
        "greylight-active": "var(--greylight-active)",
        "greylight-hover": "var(--greylight-hover)",
        greynormal: "var(--greynormal)",
        "greynormal-active": "var(--greynormal-active)",
        "greynormal-hover": "var(--greynormal-hover)",
        whitedark: "var(--whitedark)",
        "whitedark-active": "var(--whitedark-active)",
        "whitedark-hover": "var(--whitedark-hover)",
        whitedarker: "var(--whitedarker)",
        whitelight: "var(--whitelight)",
        "whitelight-active": "var(--whitelight-active)",
        "whitelight-hover": "var(--whitelight-hover)",
        whitenormal: "var(--whitenormal)",
        "whitenormal-active": "var(--whitenormal-active)",
        "whitenormal-hover": "var(--whitenormal-hover)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
  },
  plugins: [],
  darkMode: ["class"],
};
