import assert from "node:assert";
import {it} from "vitest";
import {timeFormat, timeParse, utcFormat, utcParse} from "d3-time-format";

for (const [name, parse, format, suffix] of [
  ["timeParse", timeParse, timeFormat, ""],
  ["utcParse", utcParse, utcFormat, "Z"]
]) {
  it(`${name} distinguishes ISO years from calendar years in calendar dates`, () => {
    for (const year of ["%Y", "%y"]) {
      for (const isoYear of ["%G", "%g"]) {
        for (const specifier of [`${year}-%m-%d ${isoYear}`, `${isoYear} ${year}-%m-%d`]) {
          for (const string of ["2018-12-31", "2019-12-30", "2021-01-01", "2021-01-04"]) {
            const date = new Date(`${string}T00:00:00${suffix}`);
            assert.deepStrictEqual(parse(specifier)(format(specifier)(date)), date, specifier);
          }
        }
      }
    }
  });

  it(`${name} uses the ISO year for ISO weeks when a calendar year is also present`, () => {
    for (const year of ["%Y", "%y"]) {
      for (const isoYear of ["%G", "%g"]) {
        for (const specifier of [`${year} ${isoYear}-W%V-%w`, `${isoYear}-W%V-%w ${year}`]) {
          for (const string of ["2018-12-31", "2019-12-30", "2021-01-01", "2021-01-04"]) {
            const date = new Date(`${string}T00:00:00${suffix}`);
            assert.deepStrictEqual(parse(specifier)(format(specifier)(date)), date, specifier);
          }
        }
      }
    }
  });

  it(`${name} retains ISO year parsing when no calendar year is present`, () => {
    for (const specifier of ["%G-%m-%d", "%g-%m-%d", "%G-W%V-%w", "%g-W%V-%w"]) {
      const date = new Date(`2021-01-04T00:00:00${suffix}`);
      assert.deepStrictEqual(parse(specifier)(format(specifier)(date)), date);
    }
  });
}
