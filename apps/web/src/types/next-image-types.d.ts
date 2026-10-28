// Next's static-image module types (`import x from "./a.webp"`). next build writes
// next-env.d.ts with this reference, but a fresh tree has none before its first
// build, and typecheck runs first.
/// <reference types="next/image-types/global" />
