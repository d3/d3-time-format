var tape = require("tape"),
    d3 = require("../");

var enUs = {
  "dateTime": "%a %b %e %X %Y",
  "date": "%m/%d/%Y",
  "time": "%H:%M:%S",
  "periods": ["AM", "PM"],
  "days": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  "shortDays": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  "months": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  "shortMonths": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
};

var frFr = {
  "dateTime": "%A, le %e %B %Y, %X",
  "date": "%d/%m/%Y",
  "time": "%H:%M:%S",
  "periods": ["AM", "PM"],
  "days": ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
  "shortDays": ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
  "months": ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
  "shortMonths": ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."]
};

tape("d3.timeFormatDefaultLocale(definition) returns the new default locale", function(test) {
  var locale = d3.timeFormatDefaultLocale(frFr);
  try {
    test.equal(locale.format("%c")(new Date(2000, 0, 1)), "samedi, le  1 janvier 2000, 00:00:00");
    test.end();
  } finally {
    d3.timeFormatDefaultLocale(enUs);
  }
});

tape("d3.timeFormatDefaultLocale(definition) affects d3.timeFormat", function(test) {
  var locale = d3.timeFormatDefaultLocale(frFr);
  try {
    test.equal(d3.timeFormat, locale.format);
    test.equal(d3.timeFormat("%c")(new Date(2000, 0, 1)), "samedi, le  1 janvier 2000, 00:00:00");
    test.end();
  } finally {
    d3.timeFormatDefaultLocale(enUs);
  }
});

tape("d3.timeFormatDefaultLocale(definition) affects d3.timeParse", function(test) {
  var locale = d3.timeFormatDefaultLocale(frFr);
  try {
    test.equal(d3.timeParse, locale.parse);
    test.equal(+d3.timeParse("%c")("samedi, le  1 janvier 2000, 00:00:00"), +new Date(2000, 0, 1));
    test.end();
  } finally {
    d3.timeFormatDefaultLocale(enUs);
  }
});

tape("d3.timeFormatDefaultLocale(definition) affects d3.utcFormat", function(test) {
  var locale = d3.timeFormatDefaultLocale(frFr);
  try {
    test.equal(d3.utcFormat, locale.utcFormat);
    test.equal(d3.utcFormat("%c")(new Date(Date.UTC(2000, 0, 1))), "samedi, le  1 janvier 2000, 00:00:00");
    test.end();
  } finally {
    d3.timeFormatDefaultLocale(enUs);
  }
});

tape("d3.timeFormatDefaultLocale(definition) affects d3.utcParse", function(test) {
  var locale = d3.timeFormatDefaultLocale(frFr);
  try {
    test.equal(d3.utcParse, locale.utcParse);
    test.equal(+d3.utcParse("%c")("samedi, le  1 janvier 2000, 00:00:00"), +new Date(Date.UTC(2000, 0, 1)));
    test.end();
  } finally {
    d3.timeFormatDefaultLocale(enUs);
  }
});
