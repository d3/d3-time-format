# d3-time-format

This module is a JavaScript implementation of the venerable [strptime](http://pubs.opengroup.org/onlinepubs/009695399/functions/strptime.html) and [strftime](http://pubs.opengroup.org/onlinepubs/007908799/xsh/strftime.html) functions from the C standard library. (These functions are also available in Python’s [time](http://docs.python.org/library/time.html) module.)

…

For example:

```javascript
var f = format("%Y-%m-%d");
f.parse("2011-01-01"); // Sat Jan 01 2011 00:00:00 GMT-0800 (PST)
f(new Date(2011, 0, 1)); // "2011-01-01"
```

Implementing a conditional format using [time intervals](https://github.com/d3/d3-time):

```js
var formatMillisecond = format(".%L"),
    formatSecond = format(":%S"),
    formatMinute = format("%I:%M"),
    formatHour = format("%I %p"),
    formatDay = format("%a %d"),
    formatWeek = format("%b %d"),
    formatMonth = format("%B"),
    formatYear = format("%Y");

function multiFormat(date) {
  return (second(date) < date ? formatMillisecond
      : minute(date) < date ? formatSecond
      : hour(date) < date ? formatMinute
      : day(date) < date ? formatHour
      : month(date) < date ? (week(date) < date ? formatDay : formatWeek)
      : year(date) < date ? formatMonth
      : formatYear)(date);
}
```

TODO Implement the `iso` format.

## Installing

If you use NPM, `npm install d3-time-format`. Otherwise, download the [latest release](https://github.com/d3/d3-time-format/releases/latest).

## API Reference

<a name="format" href="#format">#</a> <b>format</b>(<i>specifier</i>)

An alias for [*locale*.format](#locale_format) on the default locale. While this method generates output for [U.S. English](https://github.com/d3/d3-time-format/tree/master/src/locale/en-US.js)-speaking humans by default, humans in other locales may be served using [localeFormat](#localeFormat) or by editing [index.js](https://github.com/d3/d3-time-format/tree/master/index.js) and rebuilding.

<a name="locale_format" href="#locale_format">#</a> <i>locale</i>.<b>format</b>(<i>specifier</i>)

Returns a new [*format* function](#_format) for the given string *specifier*. The specifier string may contain the following directives:

* `%a` - abbreviated weekday name.
* `%A` - full weekday name.
* `%b` - abbreviated month name.
* `%B` - full month name.
* `%c` - the locale’s date and time, such as `%a %b %e %H:%M:%S %Y`.
* `%d` - zero-padded day of the month as a decimal number [01,31].
* `%e` - space-padded day of the month as a decimal number [ 1,31]; equivalent to `%_d`.
* `%H` - hour (24-hour clock) as a decimal number [00,23].
* `%I` - hour (12-hour clock) as a decimal number [01,12].
* `%j` - day of the year as a decimal number [001,366].
* `%m` - month as a decimal number [01,12].
* `%M` - minute as a decimal number [00,59].
* `%L` - milliseconds as a decimal number [000, 999].
* `%p` - either AM or PM.
* `%S` - second as a decimal number [00,61].
* `%U` - Sunday-based week of the year as a decimal number [00,53].
* `%w` - Sunday-based weekday as a decimal number [0,6].
* `%W` - Monday-based week of the year as a decimal number [00,53].
* `%x` - the locale’s date, such as `%m/%d/%Y`.
* `%X` - the locale’s time, such as `%H:%M:%S`.
* `%y` - year without century as a decimal number [00,99].
* `%Y` - year with century as a decimal number.
* `%Z` - time zone offset, such as `-0700`.
* `%%` - a literal percent sign (`%`).

For `%U`, all days in a new year preceding the first Sunday are considered to be in week 0. For `%W`, all days in a new year preceding the first Monday are considered to be in week 0. (In some implementations of strftime and strptime, a directive may include an optional field width or precision; this feature is not yet implemented.)

The `%` sign indicating a directive may be immediately followed by a padding modifier:

* `0` - zero-padding
* `_` - space-padding
* `-` - disable padding

If no padding modifier is specified, the default is `0` for all directives except `%e`, which defaults to `_`.

<a name="_format" href="#_format">#</a> <i>format</i>(<i>date</i>)

Formats the specified *[date](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date)*, returning the corresponding string.

```javascript
var formatMonth = format("%B"),
    formatDay = format("%A"),
    date = new Date(2014, 4, 1); // Thu May 01 2014 00:00:00 GMT-0700 (PDT)

formatMonth(date); // "May"
formatDay(date); // "Thursday"
```

<a name="format_parse" href="#format_parse">#</a> <i>format</i>.<b>parse</b>(<i>string</i>)

Parses the specified *string*, returning the corresponding [date](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date) or null if the string could not be parsed according to this format’s specifier.

Parsing is strict: if the specified <i>string</i> does not exactly match the associated format specifier, this method returns null. For example, if the associated format is `"%Y-%m-%dT%H:%M:%SZ"`, then the string `"2011-07-01T19:15:28Z"` will be parsed as expected, but `"2011-07-01T19:15:28"`, `"2011-07-01 19:15:28"` and `"2011-07-01"` will return null. (Note that the hard-coded `"Z"` here is different from the time zone offset directive `%Z`.) If a more flexible parser is desired, try multiple formats sequentially until one returns non-null.

The `%d` and `%e` format specifiers are considered equivalent for parsing.

<a name="format_toString" href="#format_toString">#</a> <i>format</i>.<b>toString</b>()

Returns this format’s specifier.

## Changes from D3 3.x:

* Removed format.multi.

* Removed format.utc; use utcFormat instead.
