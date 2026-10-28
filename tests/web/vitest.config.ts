import { defineConfig } from "vitest/config";
import * as path from "node:path";

export default defineConfig({
  resolve: {
    // The app's own alias (apps/web/tsconfig.json: "@/*" → "./src/*").
    alias: [{ find: /^@\//, replacement: path.resolve(__dirname, "../../apps/web/src") + "/" }],
  },
  test: {
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    environment: "node",
  },
});
