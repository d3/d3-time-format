# d3-time-format

…

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

## Installing

If you use NPM, `npm install d3-time-format`. Otherwise, download the [latest release](https://github.com/d3/d3-time-format/releases/latest).

## API Reference

…

## Changes from D3 3.x:

* Removed format.multi.

* Removed format.utc; use utcFormat instead.
