import assert from "assert";
import * as d3 from "../src/index.js";
import {readdir, readFile} from "fs";
import * as path from "path";

it("locale data is valid", async () => {
  readdir("locale", async function(error, locales) {
    if (error) throw error;
    await Promise.all(locales.map(function(locale) {
      if (!/\.json$/i.test(locale)) return;
      return new Promise(resolve => testLocale(path.join("locale", locale), resolve));
    }));
});

  function testLocale(locale, callback) {
    readFile(locale, "utf8", function(error, locale) {
      if (error) return void callback(error);
      locale = JSON.parse(locale);
      assert.deepStrictEqual(Object.keys(locale).sort(), ["date", "dateTime", "days", "months", "periods", "shortDays", "shortMonths", "time"]);
      locale = d3.timeFormatLocale(locale);
      callback(null);
    });
  }
});
