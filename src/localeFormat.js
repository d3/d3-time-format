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

  var _periodLookup = formatLookup(locale_periods),
      _dayRe = formatRe(locale_days),
      _dayLookup = formatLookup(locale_days),
      _dayAbbrevRe = formatRe(locale_shortDays),
      _dayAbbrevLookup = formatLookup(locale_shortDays),
      _monthRe = formatRe(locale_months),
      _monthLookup = formatLookup(locale_months),
      _monthAbbrevRe = formatRe(locale_shortMonths),
      _monthAbbrevLookup = formatLookup(locale_shortMonths);

  var formats = {
    "a": function(d) { return locale_shortDays[d.getDay()]; },
    "A": function(d) { return locale_days[d.getDay()]; },
    "b": function(d) { return locale_shortMonths[d.getMonth()]; },
    "B": function(d) { return locale_months[d.getMonth()]; },
    "c": newFormat(locale_dateTime),
    "d": function(d, p) { return formatPad(d.getDate(), p, 2); },
    "e": function(d, p) { return formatPad(d.getDate(), p, 2); },
    "H": function(d, p) { return formatPad(d.getHours(), p, 2); },
    "I": function(d, p) { return formatPad(d.getHours() % 12 || 12, p, 2); },
    "j": function(d, p) { return formatPad(1 + day.count(year(d), d), p, 3); },
    "L": function(d, p) { return formatPad(d.getMilliseconds(), p, 3); },
    "m": function(d, p) { return formatPad(d.getMonth() + 1, p, 2); },
    "M": function(d, p) { return formatPad(d.getMinutes(), p, 2); },
    "p": function(d) { return locale_periods[+(d.getHours() >= 12)]; },
    "S": function(d, p) { return formatPad(d.getSeconds(), p, 2); },
    "U": function(d, p) { return formatPad(sunday.count(year(d), d), p, 2); },
    "w": function(d) { return d.getDay(); },
    "W": function(d, p) { return formatPad(monday.count(year(d), d), p, 2); },
    "x": newFormat(locale_date),
    "X": newFormat(locale_time),
    "y": function(d, p) { return formatPad(d.getFullYear() % 100, p, 2); },
    "Y": function(d, p) { return formatPad(d.getFullYear() % 10000, p, 4); },
    "Z": _formatZone,
    "%": function() { return "%"; }
  };

  var _parsers = {
    "a": _parseWeekdayAbbrev,
    "A": _parseWeekday,
    "b": _parseMonthAbbrev,
    "B": _parseMonth,
    "c": _parseLocaleFull,
    "d": _parseDay,
    "e": _parseDay,
    "H": _parseHour24,
    "I": _parseHour24,
    "j": _parseDayOfYear,
    "L": _parseMilliseconds,
    "m": _parseMonthNumber,
    "M": _parseMinutes,
    "p": _parseAmPm,
    "S": _parseSeconds,
    "U": _parseWeekNumberSunday,
    "w": _parseWeekdayNumber,
    "W": _parseWeekNumberMonday,
    "x": _parseLocaleDate,
    "X": _parseLocaleTime,
    "y": _parseYear,
    "Y": _parseFullYear,
    "Z": _parseZone,
    "%": _parseLiteralPercent
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
          if ((pad = formatPads[c = template.charAt(++i)]) != null) c = template.charAt(++i);
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
          i = _parse(d, template, string, 0);
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

  function _parse(date, template, string, j) {
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
        parse = _parsers[c in formatPads ? template.charAt(i++) : c];
        if (!parse || ((j = parse(date, string, j)) < 0)) return -1;
      } else if (c != string.charCodeAt(j++)) {
        return -1;
      }
    }

    return j;
  }

  function _parseWeekdayAbbrev(date, string, i) {
    _dayAbbrevRe.lastIndex = 0;
    var n = _dayAbbrevRe.exec(string.slice(i));
    return n ? (date.w = _dayAbbrevLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }

  function _parseWeekday(date, string, i) {
    _dayRe.lastIndex = 0;
    var n = _dayRe.exec(string.slice(i));
    return n ? (date.w = _dayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }

  function _parseMonthAbbrev(date, string, i) {
    _monthAbbrevRe.lastIndex = 0;
    var n = _monthAbbrevRe.exec(string.slice(i));
    return n ? (date.m = _monthAbbrevLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }

  function _parseMonth(date, string, i) {
    _monthRe.lastIndex = 0;
    var n = _monthRe.exec(string.slice(i));
    return n ? (date.m = _monthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }

  function _parseLocaleFull(date, string, i) {
    return _parse(date, formats.c.toString(), string, i);
  }

  function _parseLocaleDate(date, string, i) {
    return _parse(date, formats.x.toString(), string, i);
  }

  function _parseLocaleTime(date, string, i) {
    return _parse(date, formats.X.toString(), string, i);
  }

  function _parseAmPm(date, string, i) {
    var n = _periodLookup.get(string.slice(i, i += 2).toLowerCase());
    return n == null ? -1 : (date.p = n, i);
  }

  return {
    format: newFormat,
    multiFormat: newMultiFormat(newFormat),
    utcFormat: newUtcFormat,
    utcMultiFormat: newMultiFormat(newUtcFormat)
  };
};

var formatPads = {"-": "", "_": " ", "0": "0"},
    numberRe = /^\s*\d+/, // note: ignores next directive
    percentRe = /^%/,
    requoteRe = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;

function formatPad(value, fill, width) {
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

function _parseWeekdayNumber(date, string, i) {
  numberRe.lastIndex = 0;
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (date.w = +n[0], i + n[0].length) : -1;
}

function _parseWeekNumberSunday(date, string, i) {
  numberRe.lastIndex = 0;
  var n = numberRe.exec(string.slice(i));
  return n ? (date.U = +n[0], i + n[0].length) : -1;
}

function _parseWeekNumberMonday(date, string, i) {
  numberRe.lastIndex = 0;
  var n = numberRe.exec(string.slice(i));
  return n ? (date.W = +n[0], i + n[0].length) : -1;
}

function _parseFullYear(date, string, i) {
  numberRe.lastIndex = 0;
  var n = numberRe.exec(string.slice(i, i + 4));
  return n ? (date.y = +n[0], i + n[0].length) : -1;
}

function _parseYear(date, string, i) {
  numberRe.lastIndex = 0;
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (date.y = _expandYear(+n[0]), i + n[0].length) : -1;
}

function _parseZone(date, string, i) {
  return /^[+-]\d{4}$/.test(string = string.slice(i, i + 5))
      ? (date.Z = -string, i + 5) // sign differs from getTimezoneOffset!
      : -1;
}

function _expandYear(d) {
  return d + (d > 68 ? 1900 : 2000);
}

function _parseMonthNumber(date, string, i) {
  numberRe.lastIndex = 0;
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (date.m = n[0] - 1, i + n[0].length) : -1;
}

function _parseDay(date, string, i) {
  numberRe.lastIndex = 0;
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (date.d = +n[0], i + n[0].length) : -1;
}

function _parseDayOfYear(date, string, i) {
  numberRe.lastIndex = 0;
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (date.j = +n[0], i + n[0].length) : -1;
}

// Note: we don't validate that the hour is in the range [0,23] or [1,12].
function _parseHour24(date, string, i) {
  numberRe.lastIndex = 0;
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (date.H = +n[0], i + n[0].length) : -1;
}

function _parseMinutes(date, string, i) {
  numberRe.lastIndex = 0;
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (date.M = +n[0], i + n[0].length) : -1;
}

function _parseSeconds(date, string, i) {
  numberRe.lastIndex = 0;
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (date.S = +n[0], i + n[0].length) : -1;
}

function _parseMilliseconds(date, string, i) {
  numberRe.lastIndex = 0;
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (date.L = +n[0], i + n[0].length) : -1;
}

// TODO table of time zone offset names?
function _formatZone(d) {
  var z = d.getTimezoneOffset(),
      zs = z > 0 ? "-" : "+",
      zh = Math.abs(z) / 60 | 0,
      zm = Math.abs(z) % 60;
  return zs + formatPad(zh, "0", 2) + formatPad(zm, "0", 2);
}

function _parseLiteralPercent(date, string, i) {
  percentRe.lastIndex = 0;
  var n = percentRe.exec(string.slice(i, i + 1));
  return n ? i + n[0].length : -1;
}

function newMultiFormat(newFormat) {
  return function(formats) {
    var n = formats.length, i = -1;
    while (++i < n) formats[i][0] = newFormat(formats[i][0]);
    return function(date) {
      var i = 0, f = formats[i];
      while (!f[1](date)) f = formats[++i];
      return f[0](date);
    };
  };
}
