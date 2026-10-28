import localFont from "next/font/local";

import { GeistPixelSquare } from "geist/font/pixel";

// Every font is self-hosted: the latin subset of each family's variable font,
// from its @fontsource-variable package (OFL-1.1; Roboto Slab Apache-2.0) or
// the geist package, emitted as a static asset by the build. Upstream loaded
// them with next/font/google, which fetches Google Fonts at build time and
// fails on GitHub's runners. The CSS variables are upstream's, so the font
// picker and the theme presets are unchanged.

const inter = localFont({
  src: "../../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-inter",
});

const notoSans = localFont({
  src: "../../../node_modules/@fontsource-variable/noto-sans/files/noto-sans-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-noto-sans",
});

const roboto = localFont({
  src: "../../../node_modules/@fontsource-variable/roboto/files/roboto-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-roboto",
});

const geist = localFont({
  src: "../../../node_modules/geist/dist/fonts/geist-sans/Geist-Variable.woff2",
  weight: "100 900",
  variable: "--font-geist",
});

const outfit = localFont({
  src: "../../../node_modules/@fontsource-variable/outfit/files/outfit-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-outfit",
});

const geistMono = localFont({
  src: "../../../node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2",
  weight: "100 900",
  variable: "--font-geist-mono",
});

const dmSans = localFont({
  src: "../../../node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2",
  weight: "100 1000",
  variable: "--font-dm-sans",
});

const nunitoSans = localFont({
  src: "../../../node_modules/@fontsource-variable/nunito-sans/files/nunito-sans-latin-standard-normal.woff2",
  weight: "200 1000",
  variable: "--font-nunito-sans",
});

const figtree = localFont({
  src: "../../../node_modules/@fontsource-variable/figtree/files/figtree-latin-wght-normal.woff2",
  weight: "300 900",
  variable: "--font-figtree",
});

const raleway = localFont({
  src: "../../../node_modules/@fontsource-variable/raleway/files/raleway-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-raleway",
});

const publicSans = localFont({
  src: "../../../node_modules/@fontsource-variable/public-sans/files/public-sans-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-public-sans",
});

const jetBrainsMono = localFont({
  src: "../../../node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2",
  weight: "100 800",
  variable: "--font-jetbrains-mono",
});

const notoSerif = localFont({
  src: "../../../node_modules/@fontsource-variable/noto-serif/files/noto-serif-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-noto-serif",
});

const robotoSlab = localFont({
  src: "../../../node_modules/@fontsource-variable/roboto-slab/files/roboto-slab-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-roboto-slab",
});

const merriweather = localFont({
  src: "../../../node_modules/@fontsource-variable/merriweather/files/merriweather-latin-wght-normal.woff2",
  weight: "300 900",
  variable: "--font-merriweather",
});

const lora = localFont({
  src: "../../../node_modules/@fontsource-variable/lora/files/lora-latin-wght-normal.woff2",
  weight: "400 700",
  variable: "--font-lora",
});

const playfairDisplay = localFont({
  src: "../../../node_modules/@fontsource-variable/playfair-display/files/playfair-display-latin-wght-normal.woff2",
  weight: "400 900",
  variable: "--font-playfair-display",
});

export const fontRegistry = {
  geist: {
    label: "Geist",
    font: geist,
  },
  inter: {
    label: "Inter",
    font: inter,
  },
  notoSans: {
    label: "Noto Sans",
    font: notoSans,
  },
  nunitoSans: {
    label: "Nunito Sans",
    font: nunitoSans,
  },
  figtree: {
    label: "Figtree",
    font: figtree,
  },
  roboto: {
    label: "Roboto",
    font: roboto,
  },
  raleway: {
    label: "Raleway",
    font: raleway,
  },
  dmSans: {
    label: "DM Sans",
    font: dmSans,
  },
  publicSans: {
    label: "Public Sans",
    font: publicSans,
  },
  outfit: {
    label: "Outfit",
    font: outfit,
  },
  geistMono: {
    label: "Geist Mono",
    font: geistMono,
  },
  geistPixelSquare: {
    label: "Geist Pixel Square",
    font: GeistPixelSquare,
  },
  jetBrainsMono: {
    label: "JetBrains Mono",
    font: jetBrainsMono,
  },
  notoSerif: {
    label: "Noto Serif",
    font: notoSerif,
  },
  robotoSlab: {
    label: "Roboto Slab",
    font: robotoSlab,
  },
  merriweather: {
    label: "Merriweather",
    font: merriweather,
  },
  lora: {
    label: "Lora",
    font: lora,
  },
  playfairDisplay: {
    label: "Playfair Display",
    font: playfairDisplay,
  },
} as const;

export type FontKey = keyof typeof fontRegistry;

export const fontKeys = Object.keys(fontRegistry) as FontKey[];

export const fontVars = Object.values(fontRegistry)
  .map(({ font }) => font.variable)
  .join(" ");

export const fontOptions = fontKeys.map((key) => ({
  key,
  label: fontRegistry[key].label,
}));
