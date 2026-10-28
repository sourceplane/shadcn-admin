import packageJson from "../../package.json";
import { SITE_NAME, SOURCE_URL } from "./site";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: SITE_NAME,
  // The environment's public origin, set per build (NEXT_PUBLIC_SITE_URL):
  // the custom domain when the environment has one, else its workers.dev URL.
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  repository: SOURCE_URL,
  version: packageJson.version,
  copyright: `© ${currentYear}, ${SITE_NAME}.`,
  meta: {
    title: `${SITE_NAME}: Open Source shadcn/ui Admin Dashboard`,
    description:
      "Free, MIT-licensed shadcn/ui admin dashboard with 25+ screens and editions for Radix UI, Base UI, React Aria, and TanStack Start.",
  },
};

// The social card. Upstream used the opengraph-image/twitter-image file
// convention, which compiles the PNG into a route inside the Worker (two
// copies, about 1.1 MB); it is served as a static asset instead.
export const SOCIAL_IMAGE = {
  url: "/opengraph-image.png",
  width: 2400,
  height: 1350,
  alt: `${SITE_NAME} open source admin dashboard with shadcn/ui`,
};
