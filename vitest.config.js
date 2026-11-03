import {defineConfig} from "vitest/config";

export default defineConfig({
  resolve: {alias: {"d3-time-format": "src/index.js"}},
  test: {include: ["test/**/*-test.js"]}
});
