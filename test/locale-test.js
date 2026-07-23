import assert from "assert";
import {readdirSync, readFileSync} from "fs";
import {join} from "path";
import {timeFormatLocale} from "../src/index.js";

it("locale data is valid", () => {
  for (const localePath of readdirSync("locale")) {
    if (!/\.json$/i.test(localePath)) continue;
    const locale = JSON.parse(readFileSync(join("locale", localePath), "utf8"));
    assert.deepStrictEqual(Object.keys(locale).sort(), ["date", "dateTime", "days", "months", "periods", "shortDays", "shortMonths", "time"]);
    timeFormatLocale(locale);
  }
});

it("parse resolves a name that is a prefix of a longer name in the same field", () => {
  // Czech "červen" (June) is a prefix of "červenec" (July); Turkish "Pazar"
  // (Sun) is a prefix of "Pazartesi" (Mon). Ordered alternation matched the
  // shorter name first, so these formatted dates failed to round-trip.
  for (const [file, spec, date] of [
    ["cs-CZ.json", "%d %B %Y", new Date(2020, 6, 15)], // July
    ["tr-TR.json", "%A %d %B %Y", new Date(2020, 6, 13)], // Monday
  ]) {
    const locale = timeFormatLocale(JSON.parse(readFileSync(join("locale", file), "utf8")));
    const string = locale.format(spec)(date);
    assert.deepStrictEqual(locale.parse(spec)(string), date);
  }
});
