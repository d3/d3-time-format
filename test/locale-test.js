import assert from "node:assert";
import {readdirSync, readFileSync} from "node:fs";
import {join} from "node:path";
import {it} from "vitest";
import {timeFormatLocale} from "d3-time-format";

it("locale data is valid", () => {
  for (const localePath of readdirSync("locale")) {
    if (!/\.json$/i.test(localePath)) continue;
    const locale = JSON.parse(readFileSync(join("locale", localePath), "utf8"));
    assert.deepStrictEqual(Object.keys(locale).sort(), ["date", "dateTime", "days", "months", "periods", "shortDays", "shortMonths", "time"]);
    timeFormatLocale(locale);
  }
});
