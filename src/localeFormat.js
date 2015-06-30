import {day, sunday, monday, year} from "d3-time";
import UtcDate from "./UtcDate";

var LocalDate = Date;

export default function(locale) {
  var locale_dateTime = locale.dateTime,
      locale_date = locale.date,
      locale_time = locale.time,
      locale_periods = locale.periods,
      locale_days = locale.days,
      locale_shortDays = locale.shortDays,
      locale_months = locale.months,
      locale_shortMonths = locale.shortMonths;

  var periodLookup = formatLookup(locale_periods),
      dayRe = formatRe(locale_days),
      dayLookup = formatLookup(locale_days),
      dayAbbrevRe = formatRe(locale_shortDays),
      dayAbbrevLookup = formatLookup(locale_shortDays),
      monthRe = formatRe(locale_months),
      monthLookup = formatLookup(locale_months),
      monthAbbrevRe = formatRe(locale_shortMonths),
      monthAbbrevLookup = formatLookup(locale_shortMonths);

  var formats = {
    "a": function(d) { return locale_shortDays[d.getDay()]; },
    "A": function(d) { return locale_days[d.getDay()]; },
    "b": function(d) { return locale_shortMonths[d.getMonth()]; },
    "B": function(d) { return locale_months[d.getMonth()]; },
    "c": newFormat(locale_dateTime),
    "d": function(d, p) { return pad(d.getDate(), p, 2); },
    "e": function(d, p) { return pad(d.getDate(), p, 2); },
    "H": function(d, p) { return pad(d.getHours(), p, 2); },
    "I": function(d, p) { return pad(d.getHours() % 12 || 12, p, 2); },
    "j": function(d, p) { return pad(1 + day.count(year(d), d), p, 3); },
    "L": function(d, p) { return pad(d.getMilliseconds(), p, 3); },
    "m": function(d, p) { return pad(d.getMonth() + 1, p, 2); },
    "M": function(d, p) { return pad(d.getMinutes(), p, 2); },
    "p": function(d) { return locale_periods[+(d.getHours() >= 12)]; },
    "S": function(d, p) { return pad(d.getSeconds(), p, 2); },
    "U": function(d, p) { return pad(sunday.count(year(d), d), p, 2); },
    "w": function(d) { return d.getDay(); },
    "W": function(d, p) { return pad(monday.count(year(d), d), p, 2); },
    "x": newFormat(locale_date),
    "X": newFormat(locale_time),
    "y": function(d, p) { return pad(d.getFullYear() % 100, p, 2); },
    "Y": function(d, p) { return pad(d.getFullYear() % 10000, p, 4); },
    "Z": formatZone,
    "%": function() { return "%"; }
  };

  var parses = {
    "a": parseWeekdayAbbrev,
    "A": parseWeekday,
    "b": parseMonthAbbrev,
    "B": parseMonth,
    "c": parseLocaleDateTime,
    "d": parseDay,
    "e": parseDay,
    "H": parseHour24,
    "I": parseHour24,
    "j": parseDayOfYear,
    "L": parseMilliseconds,
    "m": parseMonthNumber,
    "M": parseMinutes,
    "p": parseAmPm,
    "S": parseSeconds,
    "U": parseWeekNumberSunday,
    "w": parseWeekdayNumber,
    "W": parseWeekNumberMonday,
    "x": parseLocaleDate,
    "X": parseLocaleTime,
    "y": parseYear,
    "Y": parseFullYear,
    "Z": parseZone,
    "%": parseLiteralPercent
  };

  function newFormat(template) {
    template += "";

    function format(date) {
      var string = [],
          i = -1,
          j = 0,
          n = template.length,
          c,
          pad,
          format;

      while (++i < n) {
        if (template.charCodeAt(i) === 37) {
          string.push(template.slice(j, i));
          if ((pad = pads[c = template.charAt(++i)]) != null) c = template.charAt(++i);
          if (format = formats[c]) c = format(date, pad == null ? (c === "e" ? " " : "0") : pad);
          string.push(c);
          j = i + 1;
        }
      }

      string.push(template.slice(j, i));
      return string.join("");
    }

    format.parse = function(string) {
      var d = {y: 1900, m: 0, d: 1, H: 0, M: 0, S: 0, L: 0, Z: null},
          i = parseTemplate(d, template, string, 0);
      if (i != string.length) return null;

      // The am-pm flag is 0 for AM, and 1 for PM.
      if ("p" in d) d.H = d.H % 12 + d.p * 12;

      // If a time zone is specified, it is always relative to UTC;
      // we need to use UtcDate if we aren’t already.
      var localZ = d.Z != null && Date !== UtcDate,
          date = new (localZ ? UtcDate : Date);

      // Set year, month, date.
      if ("j" in d) {
        date.setFullYear(d.y, 0, d.j);
      } else if ("w" in d && ("W" in d || "U" in d)) {
        date.setFullYear(d.y, 0, 1);
        date.setFullYear(d.y, 0, "W" in d
            ? (d.w + 6) % 7 + d.W * 7 - (date.getDay() + 5) % 7
            :  d.w          + d.U * 7 - (date.getDay() + 6) % 7);
      } else {
        date.setFullYear(d.y, d.m, d.d);
      }

      // Set hours, minutes, seconds and milliseconds.
      date.setHours(d.H + (d.Z / 100 | 0), d.M + d.Z % 100, d.S, d.L);

      return localZ ? date._ : date;
    };

    format.toString = function() {
      return template;
    };

    return format;
  }

  function newUtcFormat(template) {
    var local = newFormat(template);

    function format(date) {
      try {
        Date = UtcDate;
        var utc = new Date;
        utc._ = date;
        return local(utc);
      } finally {
        Date = LocalDate;
      }
    }

    format.parse = function(string) {
      try {
        Date = UtcDate;
        var date = local.parse(string);
        return date && date._;
      } finally {
        Date = LocalDate;
      }
    };

    format.toString = local.toString;

    return format;
  }

  function parseTemplate(d, template, string, j) {
    var i = 0,
        n = template.length,
        m = string.length,
        c,
        parse;

    while (i < n) {
      if (j >= m) return -1;
      c = template.charCodeAt(i++);
      if (c === 37) {
        c = template.charAt(i++);
        parse = parses[c in pads ? template.charAt(i++) : c];
        if (!parse || ((j = parse(d, string, j)) < 0)) return -1;
      } else if (c != string.charCodeAt(j++)) {
        return -1;
      }
    }

    return j;
  }

  function parseWeekdayAbbrev(d, string, i) {
    var n = dayAbbrevRe.exec(string.slice(i));
    return n ? (d.w = dayAbbrevLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }

  function parseWeekday(d, string, i) {
    var n = dayRe.exec(string.slice(i));
    return n ? (d.w = dayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }

  function parseMonthAbbrev(d, string, i) {
    var n = monthAbbrevRe.exec(string.slice(i));
    return n ? (d.m = monthAbbrevLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }

  function parseMonth(d, string, i) {
    var n = monthRe.exec(string.slice(i));
    return n ? (d.m = monthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }

  function parseLocaleDateTime(d, string, i) {
    return parseTemplate(d, locale_dateTime, string, i);
  }

  function parseLocaleDate(d, string, i) {
    return parseTemplate(d, locale_date, string, i);
  }

  function parseLocaleTime(d, string, i) {
    return parseTemplate(d, locale_time, string, i);
  }

  function parseAmPm(d, string, i) {
    var n = periodLookup.get(string.slice(i, i += 2).toLowerCase());
    return n == null ? -1 : (d.p = n, i);
  }

  return {
    format: newFormat,
    utcFormat: newUtcFormat
  };
};

var pads = {"-": "", "_": " ", "0": "0"},
    numberRe = /^\s*\d+/, // note: ignores next directive
    percentRe = /^%/,
    requoteRe = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;

function pad(value, fill, width) {
  var sign = value < 0 ? "-" : "",
      string = (sign ? -value : value) + "",
      length = string.length;
  return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
}

function requote(s) {
  return s.replace(requoteRe, "\\$&");
}

function formatRe(names) {
  return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
}

function formatLookup(names) {
  var map = new Map, i = -1, n = names.length;
  while (++i < n) map.set(names[i].toLowerCase(), i);
  return map;
}

function parseWeekdayNumber(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.w = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.U = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.W = +n[0], i + n[0].length) : -1;
}

function parseFullYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 4));
  return n ? (d.y = +n[0], i + n[0].length) : -1;
}

function parseYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2000), i + n[0].length) : -1;
}

function parseZone(d, string, i) {
  return /^[+-]\d{4}$/.test(string = string.slice(i, i + 5))
      ? (d.Z = -string, i + 5) // sign differs from getTimezoneOffset!
      : -1;
}

function parseMonthNumber(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
}

function parseDay(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.d = +n[0], i + n[0].length) : -1;
}

function parseDayOfYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.j = +n[0], i + n[0].length) : -1;
}

// Note: we don't validate that the hour is in the range [0,23] or [1,12].
function parseHour24(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.H = +n[0], i + n[0].length) : -1;
}

function parseMinutes(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.M = +n[0], i + n[0].length) : -1;
}

function parseSeconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.S = +n[0], i + n[0].length) : -1;
}

function parseMilliseconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.L = +n[0], i + n[0].length) : -1;
}

function parseLiteralPercent(d, string, i) {
  var n = percentRe.exec(string.slice(i, i + 1));
  return n ? i + n[0].length : -1;
}

function formatZone(d) {
  var z = d.getTimezoneOffset();
  return (z > 0 ? "-" : (z *= -1, "+"))
      + pad(z / 60 | 0, "0", 2)
      + pad(z % 60, "0", 2);
}
