import assert from "node:assert";
import {it} from "vitest";
import {timeFormat, timeParse, utcFormat, utcParse} from "d3-time-format";

for (const [name, parse, format, suffix] of [
  ["timeParse", timeParse, timeFormat, ""],
  ["utcParse", utcParse, utcFormat, "Z"]
]) {
  it(`${name} preserves leap days in years below 100`, () => {
    const p = parse("%Y-%m-%dT%H:%M:%S.%L");
    for (let year = 0; year < 100; year += 4) {
      const string = `${String(year).padStart(4, "0")}-02-29T12:34:56.789`;
      assert.deepStrictEqual(p(string), new Date(string + suffix));
    }
  });

  it(`${name} round-trips ordinal dates in years below 100`, () => {
    const specifier = "%Y %j";
    for (const year of ["0000", "0001", "0004", "0096", "0099"]) {
      for (const monthDay of ["01-01", "02-28", "03-01", "12-31"]) {
        const date = new Date(`${year}-${monthDay}T00:00:00${suffix}`);
        assert.deepStrictEqual(parse(specifier)(format(specifier)(date)), date);
      }
    }
  });

  it(`${name} preserves year boundaries when reconstructing weeks below 100`, () => {
    for (const specifier of ["%Y %U %w", "%Y %W %w"]) {
      const p = parse(specifier);
      assert.deepStrictEqual(p("0001 00 0"), new Date(`0000-12-31T00:00:00${suffix}`));
    }
  });

  it(`${name} preserves year boundaries when applying time zones below 100`, () => {
    const p = parse("%Y-%m-%d %H:%M %Z");
    assert.deepStrictEqual(p("0001-01-01 00:00 +0100"), new Date("0000-12-31T23:00:00Z"));
    assert.deepStrictEqual(p("0099-12-31 23:00 -0100"), new Date("0100-01-01T00:00:00Z"));
  });
}
