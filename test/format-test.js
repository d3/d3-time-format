import assert from "assert";
import * as d3 from "../src/index.js";
import * as time from "d3-time";
import * as date from "./date.js";

const formatMillisecond = d3.timeFormat(".%L"),
    formatSecond = d3.timeFormat(":%S"),
    formatMinute = d3.timeFormat("%I:%M"),
    formatHour = d3.timeFormat("%I %p"),
    formatDay = d3.timeFormat("%a %d"),
    formatWeek = d3.timeFormat("%b %d"),
    formatMonth = d3.timeFormat("%B"),
    formatYear = d3.timeFormat("%Y");

function multi(d) {
  return (time.timeSecond(d) < d ? formatMillisecond
      : time.timeMinute(d) < d ? formatSecond
      : time.timeHour(d) < d ? formatMinute
      : time.timeDay(d) < d ? formatHour
      : time.timeMonth(d) < d ? (time.timeWeek(d) < d ? formatDay : formatWeek)
      : time.timeYear(d) < d ? formatMonth
      : formatYear)(d);
}

it("timeFormat(date) coerces the specified date to a Date", () => {
  const f = d3.timeFormat("%c");
  assert.strictEqual(f(+date.local(1990, 0, 1)), "1/1/1990, 12:00:00 AM");
  assert.strictEqual(f(+date.local(1990, 0, 2)), "1/2/1990, 12:00:00 AM");
  assert.strictEqual(f(+date.local(1990, 0, 3)), "1/3/1990, 12:00:00 AM");
  assert.strictEqual(f(+date.local(1990, 0, 4)), "1/4/1990, 12:00:00 AM");
  assert.strictEqual(f(+date.local(1990, 0, 5)), "1/5/1990, 12:00:00 AM");
  assert.strictEqual(f(+date.local(1990, 0, 6)), "1/6/1990, 12:00:00 AM");
  assert.strictEqual(f(+date.local(1990, 0, 7)), "1/7/1990, 12:00:00 AM");
});

it("timeFormat(\"%a\")(date) formats abbreviated weekdays", () => {
  const f = d3.timeFormat("%a");
  assert.strictEqual(f(date.local(1990, 0, 1)), "Mon");
  assert.strictEqual(f(date.local(1990, 0, 2)), "Tue");
  assert.strictEqual(f(date.local(1990, 0, 3)), "Wed");
  assert.strictEqual(f(date.local(1990, 0, 4)), "Thu");
  assert.strictEqual(f(date.local(1990, 0, 5)), "Fri");
  assert.strictEqual(f(date.local(1990, 0, 6)), "Sat");
  assert.strictEqual(f(date.local(1990, 0, 7)), "Sun");
});

it("timeFormat(\"%A\")(date) formats weekdays", () => {
  const f = d3.timeFormat("%A");
  assert.strictEqual(f(date.local(1990, 0, 1)), "Monday");
  assert.strictEqual(f(date.local(1990, 0, 2)), "Tuesday");
  assert.strictEqual(f(date.local(1990, 0, 3)), "Wednesday");
  assert.strictEqual(f(date.local(1990, 0, 4)), "Thursday");
  assert.strictEqual(f(date.local(1990, 0, 5)), "Friday");
  assert.strictEqual(f(date.local(1990, 0, 6)), "Saturday");
  assert.strictEqual(f(date.local(1990, 0, 7)), "Sunday");
});

it("timeFormat(\"%b\")(date) formats abbreviated months", () => {
  const f = d3.timeFormat("%b");
  assert.strictEqual(f(date.local(1990,  0, 1)), "Jan");
  assert.strictEqual(f(date.local(1990,  1, 1)), "Feb");
  assert.strictEqual(f(date.local(1990,  2, 1)), "Mar");
  assert.strictEqual(f(date.local(1990,  3, 1)), "Apr");
  assert.strictEqual(f(date.local(1990,  4, 1)), "May");
  assert.strictEqual(f(date.local(1990,  5, 1)), "Jun");
  assert.strictEqual(f(date.local(1990,  6, 1)), "Jul");
  assert.strictEqual(f(date.local(1990,  7, 1)), "Aug");
  assert.strictEqual(f(date.local(1990,  8, 1)), "Sep");
  assert.strictEqual(f(date.local(1990,  9, 1)), "Oct");
  assert.strictEqual(f(date.local(1990, 10, 1)), "Nov");
  assert.strictEqual(f(date.local(1990, 11, 1)), "Dec");
});

it("timeFormat(\"%B\")(date) formats months", () => {
  const f = d3.timeFormat("%B");
  assert.strictEqual(f(date.local(1990,  0, 1)), "January");
  assert.strictEqual(f(date.local(1990,  1, 1)), "February");
  assert.strictEqual(f(date.local(1990,  2, 1)), "March");
  assert.strictEqual(f(date.local(1990,  3, 1)), "April");
  assert.strictEqual(f(date.local(1990,  4, 1)), "May");
  assert.strictEqual(f(date.local(1990,  5, 1)), "June");
  assert.strictEqual(f(date.local(1990,  6, 1)), "July");
  assert.strictEqual(f(date.local(1990,  7, 1)), "August");
  assert.strictEqual(f(date.local(1990,  8, 1)), "September");
  assert.strictEqual(f(date.local(1990,  9, 1)), "October");
  assert.strictEqual(f(date.local(1990, 10, 1)), "November");
  assert.strictEqual(f(date.local(1990, 11, 1)), "December");
});

it("timeFormat(\"%c\")(date) formats localized dates and times", () => {
  const f = d3.timeFormat("%c");
  assert.strictEqual(f(date.local(1990, 0, 1)), "1/1/1990, 12:00:00 AM");
});

it("timeFormat(\"%d\")(date) formats zero-padded dates", () => {
  const f = d3.timeFormat("%d");
  assert.strictEqual(f(date.local(1990, 0, 1)), "01");
});

it("timeFormat(\"%e\")(date) formats space-padded dates", () => {
  const f = d3.timeFormat("%e");
  assert.strictEqual(f(date.local(1990, 0, 1)), " 1");
});

it("timeFormat(\"%g\")(date) formats zero-padded two-digit ISO 8601 years", () => {
  const f = d3.timeFormat("%g");
  assert.strictEqual(f(date.local(2018, 11, 30, 0)), "18"); // Sunday
  assert.strictEqual(f(date.local(2018, 11, 31, 0)), "19"); // Monday
  assert.strictEqual(f(date.local(2019, 0, 1, 0)), "19");
});

it("timeFormat(\"%G\")(date) formats zero-padded four-digit ISO 8601 years", () => {
  const f = d3.timeFormat("%G");
  assert.strictEqual(f(date.local(2018, 11, 30, 0)), "2018"); // Sunday
  assert.strictEqual(f(date.local(2018, 11, 31, 0)), "2019"); // Monday
  assert.strictEqual(f(date.local(2019, 0, 1, 0)), "2019");
});

it("timeFormat(\"%H\")(date) formats zero-padded hours (24)", () => {
  const f = d3.timeFormat("%H");
  assert.strictEqual(f(date.local(1990, 0, 1,  0)), "00");
  assert.strictEqual(f(date.local(1990, 0, 1, 13)), "13");
});

it("timeFormat(\"%I\")(date) formats zero-padded hours (12)", () => {
  const f = d3.timeFormat("%I");
  assert.strictEqual(f(date.local(1990, 0, 1,  0)), "12");
  assert.strictEqual(f(date.local(1990, 0, 1, 13)), "01");
});

it("timeFormat(\"%j\")(date) formats zero-padded day of year numbers", () => {
  const f = d3.timeFormat("%j");
  assert.strictEqual(f(date.local(1990,  0,  1)), "001");
  assert.strictEqual(f(date.local(1990,  5,  1)), "152");
  assert.strictEqual(f(date.local(2010,  2, 13)), "072");
  assert.strictEqual(f(date.local(2010,  2, 14)), "073"); // DST begins
  assert.strictEqual(f(date.local(2010,  2, 15)), "074");
  assert.strictEqual(f(date.local(2010, 10,  6)), "310");
  assert.strictEqual(f(date.local(2010, 10,  7)), "311"); // DST ends
  assert.strictEqual(f(date.local(2010, 10,  8)), "312");
});

it("timeFormat(\"%m\")(date) formats zero-padded months", () => {
  const f = d3.timeFormat("%m");
  assert.strictEqual(f(date.local(1990, 0, 1)), "01");
  assert.strictEqual(f(date.local(1990, 9, 1)), "10");
});

it("timeFormat(\"%M\")(date) formats zero-padded minutes", () => {
  const f = d3.timeFormat("%M");
  assert.strictEqual(f(date.local(1990, 0, 1, 0,  0)), "00");
  assert.strictEqual(f(date.local(1990, 0, 1, 0, 32)), "32");
});

it("timeFormat(\"%p\")(date) formats AM or PM", () => {
  const f = d3.timeFormat("%p");
  assert.strictEqual(f(date.local(1990, 0, 1,  0)), "AM");
  assert.strictEqual(f(date.local(1990, 0, 1, 13)), "PM");
});

it("timeFormat(\"%q\")(date) formats quarters", () => {
  const f = d3.timeFormat("%q");
  assert.strictEqual(f(date.local(1990, 0, 1)), "1");
  assert.strictEqual(f(date.local(1990, 3, 1)), "2");
  assert.strictEqual(f(date.local(1990, 6, 1)), "3");
  assert.strictEqual(f(date.local(1990, 9, 1)), "4");
});

it("timeFormat(\"%S\")(date) formats zero-padded seconds", () => {
  const f = d3.timeFormat("%S");
  assert.strictEqual(f(date.local(1990, 0, 1, 0, 0,  0)), "00");
  assert.strictEqual(f(date.local(1990, 0, 1, 0, 0, 32)), "32");
  const f2 = d3.timeFormat("%0S");
  assert.strictEqual(f2(date.local(1990, 0, 1, 0, 0,  0)), "00");
  assert.strictEqual(f2(date.local(1990, 0, 1, 0, 0, 32)), "32");
});

it("timeFormat(\"%_S\")(date) formats space-padded seconds", () => {
  const f = d3.timeFormat("%_S");
  assert.strictEqual(f(date.local(1990, 0, 1, 0, 0,  0)), " 0");
  assert.strictEqual(f(date.local(1990, 0, 1, 0, 0,  3)), " 3");
  assert.strictEqual(f(date.local(1990, 0, 1, 0, 0, 32)), "32");
});

it("timeFormat(\"-S\")(date) formats no-padded seconds", () => {
  const f = d3.timeFormat("%-S");
  assert.strictEqual(f(date.local(1990, 0, 1, 0, 0,  0)), "0");
  assert.strictEqual(f(date.local(1990, 0, 1, 0, 0,  3)), "3");
  assert.strictEqual(f(date.local(1990, 0, 1, 0, 0, 32)), "32");
});

it("timeFormat(\"%L\")(date) formats zero-padded milliseconds", () => {
  const f = d3.timeFormat("%L");
  assert.strictEqual(f(date.local(1990, 0, 1, 0, 0, 0,   0)), "000");
  assert.strictEqual(f(date.local(1990, 0, 1, 0, 0, 0, 432)), "432");
});

it("timeFormat(\"%u\")(date) formats week day numbers", () => {
  const f = d3.timeFormat("%u");
  assert.strictEqual(f(date.local(1990,  0,  1,  0)), "1");
  assert.strictEqual(f(date.local(1990,  0,  7,  0)), "7");
  assert.strictEqual(f(date.local(2010,  2, 13, 23)), "6");
});

it("timeFormat(\"%f\")(date) formats zero-padded microseconds", () => {
  const f = d3.timeFormat("%f");
  assert.strictEqual(f(date.local(1990, 0, 1, 0, 0, 0,   0)), "000000");
  assert.strictEqual(f(date.local(1990, 0, 1, 0, 0, 0, 432)), "432000");
});

it("timeFormat(\"%U\")(date) formats zero-padded week numbers", () => {
  const f = d3.timeFormat("%U");
  assert.strictEqual(f(date.local(1990,  0,  1,  0)), "00");
  assert.strictEqual(f(date.local(1990,  5,  1,  0)), "21");
  assert.strictEqual(f(date.local(2010,  2, 13, 23)), "10");
  assert.strictEqual(f(date.local(2010,  2, 14,  0)), "11"); // DST begins
  assert.strictEqual(f(date.local(2010,  2, 15,  0)), "11");
  assert.strictEqual(f(date.local(2010, 10,  6, 23)), "44");
  assert.strictEqual(f(date.local(2010, 10,  7,  0)), "45"); // DST ends
  assert.strictEqual(f(date.local(2010, 10,  8,  0)), "45");
  assert.strictEqual(f(date.local(2012,  0,  1,  0)), "01"); // Sunday!
});

it("timeFormat(\"%W\")(date) formats zero-padded week numbers", () => {
  const f = d3.timeFormat("%W");
  assert.strictEqual(f(date.local(1990,  0,  1,  0)), "01"); // Monday!
  assert.strictEqual(f(date.local(1990,  5,  1,  0)), "22");
  assert.strictEqual(f(date.local(2010,  2, 15,  0)), "11");
  assert.strictEqual(f(date.local(2010, 10,  8,  0)), "45");
});

it("timeFormat(\"%V\")(date) formats zero-padded ISO 8601 week numbers", () => {
  const f = d3.timeFormat("%V");
  assert.strictEqual(f(date.local(1990,  0,  1,  0)), "01");
  assert.strictEqual(f(date.local(1990,  5,  1,  0)), "22");
  assert.strictEqual(f(date.local(2010,  2, 13, 23)), "10");
  assert.strictEqual(f(date.local(2010,  2, 14,  0)), "10"); // DST begins
  assert.strictEqual(f(date.local(2010,  2, 15,  0)), "11");
  assert.strictEqual(f(date.local(2010, 10,  6, 23)), "44");
  assert.strictEqual(f(date.local(2010, 10,  7,  0)), "44"); // DST ends
  assert.strictEqual(f(date.local(2010, 10,  8,  0)), "45");
  assert.strictEqual(f(date.local(2015, 11,  31, 0)), "53");
  assert.strictEqual(f(date.local(2016,  0,  1,  0)), "53");
});

it("timeFormat(\"%x\")(date) formats localized dates", () => {
  const f = d3.timeFormat("%x");
  assert.strictEqual(f(date.local(1990, 0, 1)), "1/1/1990");
  assert.strictEqual(f(date.local(2010, 5, 1)), "6/1/2010");
});

it("timeFormat(\"%X\")(date) formats localized times", () => {
  const f = d3.timeFormat("%X");
  assert.strictEqual(f(date.local(1990, 0, 1,  0,  0,  0)), "12:00:00 AM");
  assert.strictEqual(f(date.local(1990, 0, 1, 13, 34, 59)), "1:34:59 PM");
});

it("timeFormat(\"%y\")(date) formats zero-padded two-digit years", () => {
  const f = d3.timeFormat("%y");
  assert.strictEqual(f(date.local(+1990, 0, 1)), "90");
  assert.strictEqual(f(date.local(+2002, 0, 1)), "02");
  assert.strictEqual(f(date.local(-2, 0, 1)), "-02");
});

it("timeFormat(\"%Y\")(date) formats zero-padded four-digit years", () => {
  const f = d3.timeFormat("%Y");
  assert.strictEqual(f(date.local(  123, 0, 1)), "0123");
  assert.strictEqual(f(date.local( 1990, 0, 1)), "1990");
  assert.strictEqual(f(date.local( 2002, 0, 1)), "2002");
  assert.strictEqual(f(date.local(10002, 0, 1)), "0002");
  assert.strictEqual(f(date.local(   -2, 0, 1)), "-0002");
});

it("timeFormat(\"%Z\")(date) formats time zones", () => {
  const f = d3.timeFormat("%Z");
  assert.strictEqual(f(date.local(1990, 0, 1)), "-0800");
});

it("timeFormat(\"%%\")(date) formats literal percent signs", () => {
  const f = d3.timeFormat("%%");
  assert.strictEqual(f(date.local(1990, 0, 1)), "%");
});

it("timeFormat(…) can be used to create a conditional multi-format", () => {
  assert.strictEqual(multi(date.local(1990, 0, 1, 0, 0, 0, 12)), ".012");
  assert.strictEqual(multi(date.local(1990, 0, 1, 0, 0, 1,  0)), ":01");
  assert.strictEqual(multi(date.local(1990, 0, 1, 0, 1, 0,  0)), "12:01");
  assert.strictEqual(multi(date.local(1990, 0, 1, 1, 0, 0,  0)), "01 AM");
  assert.strictEqual(multi(date.local(1990, 0, 2, 0, 0, 0,  0)), "Tue 02");
  assert.strictEqual(multi(date.local(1990, 1, 1, 0, 0, 0,  0)), "February");
  assert.strictEqual(multi(date.local(1990, 0, 1, 0, 0, 0,  0)), "1990");
});
