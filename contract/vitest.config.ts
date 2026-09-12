import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Tests require the compiled managed/ directory.
    // Run `npm run compile` before running tests.
    include: ["test/**/*.test.ts"],
    environment: "node",
    globals: false,
  },
});
