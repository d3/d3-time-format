# d3-time-format

This module provides a JavaScript implementation of the venerable [strptime](http://pubs.opengroup.org/onlinepubs/009695399/functions/strptime.html) and [strftime](http://pubs.opengroup.org/onlinepubs/007908799/xsh/strftime.html) functions from the C standard library, and can be used to parse or format [dates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) in a variety of locale-specific representations. To format a date, create a [*format* function](#_format) from a [format specifier](#locale_format) (a string with the desired format *directives*, indicated by `%`); then pass a date to the format function, which returns a string. For example, to convert the current date to a human-readable string:

```js
var f = format("%B %d, %Y");
f(new Date); // "June 30, 2015"
```

Format functions also support parsing as [*format*.parse](#format_parse), so to convert a string back to a date:

```js
var f = format("%B %d, %Y");
f.parse("June 30, 2015"); // Tue Jun 30 2015 00:00:00 GMT-0700 (PDT)
```

You can implement more elaborate conditional time formats, too. For example, here’s a [multi-scale time format](http://bl.ocks.org/mbostock/4149176) using [time intervals](https://github.com/d3/d3-time):

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

This format is used by D3’s time scale to generate human-readable ticks.

## Installing

If you use NPM, `npm install d3-time-format`. Otherwise, download the [latest release](https://github.com/d3/d3-time-format/releases/latest).

## API Reference

<a name="format" href="#format">#</a> <b>format</b>(<i>specifier</i>)

An alias for [*locale*.format](#locale_format) on the default [U.S. English](https://github.com/d3/d3-time-format/tree/master/src/locale/en-US.js) locale. Use [localeFormat](#localeFormat) for a different built-in locale or to define a new locale.

<a name="utcFormat" href="#utcFormat">#</a> <b>utcFormat</b>(<i>specifier</i>)

An alias for [*locale*.utcFormat](#locale_utcFormat) on the default [U.S. English](https://github.com/d3/d3-time-format/tree/master/src/locale/en-US.js) locale. Use [localeFormat](#localeFormat) for a different built-in locale or to define a new locale.

<a name="isoFormat" href="#isoFormat">#</a> <b>isoFormat</b>

The full [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) UTC time [*format* function](#_format). Where available, this method will use [Date.toISOString](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/toISOString) to format and the [Date constructor](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date) to parse strings. If you depend on strict validation of the input format according to ISO 8601, you should construct a [UTC format](#utcFormat):

```js
var isoFormat = utcFormat("%Y-%m-%dT%H:%M:%S.%LZ");
```

<a name="locale_format" href="#locale_format">#</a> <i>locale</i>.<b>format</b>(<i>specifier</i>)

Returns a new [*format* function](#_format) for the given string *specifier*. The specifier string may contain the following directives:

* `%a` - abbreviated weekday name.*
* `%A` - full weekday name.*
* `%b` - abbreviated month name.*
* `%B` - full month name.*
* `%c` - the locale’s date and time, such as `%a %b %e %H:%M:%S %Y`.*
* `%d` - zero-padded day of the month as a decimal number [01,31].
* `%e` - space-padded day of the month as a decimal number [ 1,31]; equivalent to `%_d`.
* `%H` - hour (24-hour clock) as a decimal number [00,23].
* `%I` - hour (12-hour clock) as a decimal number [01,12].
* `%j` - day of the year as a decimal number [001,366].
* `%m` - month as a decimal number [01,12].
* `%M` - minute as a decimal number [00,59].
* `%L` - milliseconds as a decimal number [000, 999].
* `%p` - either AM or PM.*
* `%S` - second as a decimal number [00,61].
* `%U` - Sunday-based week of the year as a decimal number [00,53].
* `%w` - Sunday-based weekday as a decimal number [0,6].
* `%W` - Monday-based week of the year as a decimal number [00,53].
* `%x` - the locale’s date, such as `%m/%d/%Y`.*
* `%X` - the locale’s time, such as `%H:%M:%S`.*
* `%y` - year without century as a decimal number [00,99].
* `%Y` - year with century as a decimal number.
* `%Z` - time zone offset, such as `-0700`, `-07:00`, `-07`, or `Z`.
* `%%` - a literal percent sign (`%`).

Directives marked with an asterisk (*) may be affected by the [locale definition](#localeFormat). For `%U`, all days in a new year preceding the first Sunday are considered to be in week 0. For `%W`, all days in a new year preceding the first Monday are considered to be in week 0. Week numbers are computed using [*interval*.count](https://github.com/d3/d3-time#interval_count).

The `%` sign indicating a directive may be immediately followed by a padding modifier:

* `0` - zero-padding
* `_` - space-padding
* `-` - disable padding

If no padding modifier is specified, the default is `0` for all directives except `%e`, which defaults to `_`. (In some implementations of strftime and strptime, a directive may include an optional field width or precision; this feature is not yet implemented.)

<a name="locale_utcFormat" href="#locale_utcFormat">#</a> <i>locale</i>.<b>utcFormat</b>(<i>specifier</i>)

Equivalent to [*locale*.format](#locale_format), except all directives are interpreted as [Coordinated Universal Time (UTC)](https://en.wikipedia.org/wiki/Coordinated_Universal_Time) rather than local time.

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

Parsing is strict: if the specified <i>string</i> does not exactly match the associated specifier, this method returns null. For example, if the associated specifier is `%Y-%m-%dT%H:%M:%SZ`, then the string `"2011-07-01T19:15:28Z"` will be parsed as expected, but `"2011-07-01T19:15:28"`, `"2011-07-01 19:15:28"` and `"2011-07-01"` will return null. (Note that the literal `Z` here is different from the time zone offset directive `%Z`.) If a more flexible parser is desired, try multiple formats sequentially until one returns non-null.

The `%d` and `%e` directives are considered equivalent for parsing.

<a name="format_toString" href="#format_toString">#</a> <i>format</i>.<b>toString</b>()

Returns this format’s specifier.

<a name="localeFormat" href="#localeFormat">#</a> <b>localeFormat</b>(<i>definition</i>)

Returns a *locale* object for the specified *definition* with [*locale*.format](#locale_format) and [*locale*.utcFormat](#locale_utcFormat) methods. If *definition* is a string, it is the name of a built-in locale:

* `"ca-ES"` - [Catalan (Spain)](https://github.com/d3/d3-time-format/tree/master/src/locale/ca-ES.js)
* `"de-CH"` - [German (Switzerland)](https://github.com/d3/d3-time-format/tree/master/src/locale/de-CH.js)
* `"de-DE"` - [German (Germany)](https://github.com/d3/d3-time-format/tree/master/src/locale/de-DE.js)
* `"en-CA"` - [English (Canada)](https://github.com/d3/d3-time-format/tree/master/src/locale/en-CA.js)
* `"en-GB"` - [English (United Kingdom)](https://github.com/d3/d3-time-format/tree/master/src/locale/en-GB.js)
* `"en-US"` - [English (United States)](https://github.com/d3/d3-time-format/tree/master/src/locale/en-US.js)
* `"es-ES"` - [Spanish (Spain)](https://github.com/d3/d3-time-format/tree/master/src/locale/es-ES.js)
* `"fi-FI"` - [Finnish (Finland)](https://github.com/d3/d3-time-format/tree/master/src/locale/fi-FI.js)
* `"fr-CA"` - [French (Canada)](https://github.com/d3/d3-time-format/tree/master/src/locale/fr-CA.js)
* `"fr-FR"` - [French (France)](https://github.com/d3/d3-time-format/tree/master/src/locale/fr-FR.js)
* `"he-IL"` - [Hebrew (Israel)](https://github.com/d3/d3-time-format/tree/master/src/locale/he-IL.js)
* `"hu-HU"` - [Hungarian (Hungary)](https://github.com/d3/d3-time-format/tree/master/src/locale/hu-HU.js)
* `"it-IT"` - [Italian (Italy)](https://github.com/d3/d3-time-format/tree/master/src/locale/it-IT.js)
* `"ja-JP"` - [Japanese (Japan)](https://github.com/d3/d3-time-format/tree/master/src/locale/ja-JP.js)
* `"ko-KR"` - [Korean (South Korea)](https://github.com/d3/d3-time-format/tree/master/src/locale/ko-KR.js)
* `"mk-MK"` - [Macedonian (Macedonia)](https://github.com/d3/d3-time-format/tree/master/src/locale/mk-MK.js)
* `"nl-NL"` - [Dutch (Netherlands)](https://github.com/d3/d3-time-format/tree/master/src/locale/nl-NL.js)
* `"pl-PL"` - [Polish (Poland)](https://github.com/d3/d3-time-format/tree/master/src/locale/pl-PL.js)
* `"pt-BR"` - [Portuguese (Brazil)](https://github.com/d3/d3-time-format/tree/master/src/locale/pt-BR.js)
* `"ru-RU"` - [Russian (Russia)](https://github.com/d3/d3-time-format/tree/master/src/locale/ru-RU.js)
* `"sv-SE"` - [Swedish (Sweden)](https://github.com/d3/d3-time-format/tree/master/src/locale/sv-SE.js)
* `"zh-CN"` - [Chinese (China)](https://github.com/d3/d3-time-format/tree/master/src/locale/zh-CN.js)

Otherwise, the locale *definition* must include the following properties:

* `dateTime` - the date and time (`%c`) format specifier (<i>e.g.</i>, `"%a %b %e %X %Y"`).
* `date` - the date (`%x`) format specifier (<i>e.g.</i>, `"%m/%d/%Y"`).
* `time` - the time (`%X`) format specifier (<i>e.g.</i>, `"%H:%M:%S"`).
* `periods` - the A.M. and P.M. equivalents (<i>e.g.</i>, `["AM", "PM"]`).
* `days` - the full names of the weekdays, starting with Sunday.
* `shortDays` - the abbreviated names of the weekdays, starting with Sunday.
* `months` - the full names of the months (starting with January).
* `shortMonths` - the abbreviated names of the months (starting with January).

## Changes from D3 3.x:

* Exposed built-in locales.

* Removed format.multi.

* Renamed format.utc to utcFormat and format.iso to isoFormat.
