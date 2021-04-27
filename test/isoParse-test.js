import assert from "assert";
import * as d3 from "../src/index.js";
import * as date from "./date.js";

it("isoParse as ISO 8601", () => {
  assert.deepStrictEqual(d3.isoParse("1990-01-01T00:00:00.000Z"), date.utc(1990, 0, 1, 0, 0, 0));
  assert.deepStrictEqual(d3.isoParse("2011-12-31T23:59:59.000Z"), date.utc(2011, 11, 31, 23, 59, 59));
  assert.strictEqual(d3.isoParse("1990-01-01T00:00:00.000X"), null);
});
