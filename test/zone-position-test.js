import assert from "node:assert";
import {it} from "vitest";
import {timeParse, utcParse} from "d3-time-format";

for (const [name, parse] of [["timeParse", timeParse], ["utcParse", utcParse]]) {
  it(`${name} requires a time zone at the current input position`, () => {
    const p = parse("%Y-%m-%d %Z%M");
    for (const zone of ["x+0100", "x-0100", "ab+01", "ab-01"]) {
      assert.strictEqual(p(`2020-01-01 ${zone}`), null, zone);
    }
  });

  it(`${name} still parses every supported time zone syntax at the current position`, () => {
    const p = parse("%Y-%m-%d %Z|%M");
    for (const zone of ["+01", "+0100", "+01:00"]) {
      assert.deepStrictEqual(p(`2020-01-01 ${zone}|30`), new Date("2019-12-31T23:30:00Z"));
    }
    for (const zone of ["-01", "-0100", "-01:00"]) {
      assert.deepStrictEqual(p(`2020-01-01 ${zone}|30`), new Date("2020-01-01T01:30:00Z"));
    }
    assert.deepStrictEqual(p("2020-01-01 Z|30"), new Date("2020-01-01T00:30:00Z"));
    assert.deepStrictEqual(parse("%Y-%m-%d %Z%M")("2020-01-01 +010030"), new Date("2019-12-31T23:30:00Z"));
  });
}
