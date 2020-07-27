var fs = require("fs"),
    path = require("path"),
    tape = require("tape"),
    d3 = require("../");

tape("locale data is valid", async function(test) {
  fs.readdir("locale", async function(error, locales) {
    if (error) throw error;
    await Promise.all(locales.map(function(locale) {
      if (!/\.json$/i.test(locale)) return;
      return new Promise((resolve, reject) => testLocale(path.join("locale", locale), resolve));
    }));
    test.end();
  });

  function testLocale(locale, callback) {
    fs.readFile(locale, "utf8", function(error, locale) {
      if (error) return void callback(error);
      locale = JSON.parse(locale);
      test.deepEqual(Object.keys(locale).sort(), ["date", "dateTime", "days", "months", "periods", "shortDays", "shortMonths", "time"]);
      locale = d3.timeFormatLocale(locale);
      callback(null);
    });
  }
});
