import assert from "assert";
import * as d3 from "../src/index.js";
import * as date from "./date.js";
import {readFileSync} from "fs";
const fiFi = JSON.parse(readFileSync("./locale/fi-FI.json"));

it("parse(string) coerces the specified string to a string", () => {
  const p = d3.timeParse("%c");
  assert.deepStrictEqual(p({toString: function() { return "1/1/1990, 12:00:00 AM"; }}), date.local(1990, 0, 1));
  assert.deepStrictEqual(p({toString: function() { return "1/2/1990, 12:00:00 AM"; }}), date.local(1990, 0, 2));
  assert.deepStrictEqual(p({toString: function() { return "1/3/1990, 12:00:00 AM"; }}), date.local(1990, 0, 3));
  assert.deepStrictEqual(p({toString: function() { return "1/4/1990, 12:00:00 AM"; }}), date.local(1990, 0, 4));
  assert.deepStrictEqual(p({toString: function() { return "1/5/1990, 12:00:00 AM"; }}), date.local(1990, 0, 5));
  assert.deepStrictEqual(p({toString: function() { return "1/6/1990, 12:00:00 AM"; }}), date.local(1990, 0, 6));
  assert.deepStrictEqual(p({toString: function() { return "1/7/1990, 12:00:00 AM"; }}), date.local(1990, 0, 7));
});

it("timeParse(specifier) coerces the specified specifier to a string", () => {
  const p = d3.timeParse({toString: function() { return "%c"; }});
  assert.deepStrictEqual(p("1/1/1990, 12:00:00 AM"), date.local(1990, 0, 1));
});

it("timeParse(\"%a %m/%d/%Y\")(date) parses abbreviated weekday and date", () => {
  const p = d3.timeParse("%a %m/%d/%Y");
  assert.deepStrictEqual(p("Sun 01/01/1990"), date.local(1990, 0, 1));
  assert.deepStrictEqual(p("Wed 02/03/1991"), date.local(1991, 1, 3));
  assert.strictEqual(p("XXX 03/10/2010"), null);
});

it("timeParse(\"%A %m/%d/%Y\")(date) parses weekday and date", () => {
  const p = d3.timeParse("%A %m/%d/%Y");
  assert.deepStrictEqual(p("Sunday 01/01/1990"), date.local(1990, 0, 1));
  assert.deepStrictEqual(p("Wednesday 02/03/1991"), date.local(1991, 1, 3));
  assert.strictEqual(p("Caturday 03/10/2010"), null);
});

it("timeParse(\"%U %Y\")(date) parses week number (Sunday) and year", () => {
  const p = d3.timeParse("%U %Y");
  assert.deepStrictEqual(p("00 1990"), date.local(1989, 11, 31));
  assert.deepStrictEqual(p("05 1991"), date.local(1991,  1,  3));
  assert.deepStrictEqual(p("01 1995"), date.local(1995,  0,  1));
});

it("timeParse(\"%a %U %Y\")(date) parses abbreviated weekday, week number (Sunday) and year", () => {
  const p = d3.timeParse("%a %U %Y");
  assert.deepStrictEqual(p("Mon 00 1990"), date.local(1990, 0, 1));
  assert.deepStrictEqual(p("Sun 05 1991"), date.local(1991, 1, 3));
  assert.deepStrictEqual(p("Sun 01 1995"), date.local(1995, 0, 1));
  assert.strictEqual(p("XXX 03 2010"), null);
});

it("timeParse(\"%A %U %Y\")(date) parses weekday, week number (Sunday) and year", () => {
  const p = d3.timeParse("%A %U %Y");
  assert.deepStrictEqual(p("Monday 00 1990"), date.local(1990, 0, 1));
  assert.deepStrictEqual(p("Sunday 05 1991"), date.local(1991, 1, 3));
  assert.deepStrictEqual(p("Sunday 01 1995"), date.local(1995, 0, 1));
  assert.strictEqual(p("Caturday 03 2010"), null);
});

it("timeParse(\"%w %U %Y\")(date) parses numeric weekday (Sunday), week number (Sunday) and year", () => {
  const p = d3.timeParse("%w %U %Y");
  assert.deepStrictEqual(p("1 00 1990"), date.local(1990, 0, 1));
  assert.deepStrictEqual(p("0 05 1991"), date.local(1991, 1, 3));
  assert.deepStrictEqual(p("0 01 1995"), date.local(1995, 0, 1));
  assert.strictEqual(p("X 03 2010"), null);
});

it("timeParse(\"%w %V %G\")(date) parses numeric weekday, week number (ISO) and corresponding year", () => {
  const p = d3.timeParse("%w %V %G");
  assert.deepStrictEqual(p("1 01 1990"), date.local(1990,  0,  1));
  assert.deepStrictEqual(p("0 05 1991"), date.local(1991,  1,  3));
  assert.deepStrictEqual(p("4 53 1992"), date.local(1992, 11, 31));
  assert.deepStrictEqual(p("0 52 1994"), date.local(1995,  0,  1));
  assert.deepStrictEqual(p("0 01 1995"), date.local(1995,  0,  8));
  assert.deepStrictEqual(p("1 01 2018"), date.local(2018,  0,  1));
  assert.deepStrictEqual(p("1 01 2019"), date.local(2018,  11,  31));
});

it("timeParse(\"%w %V %g\")(date) parses numeric weekday, week number (ISO) and corresponding two-digits year", () => {
  const p = d3.timeParse("%w %V %g");
  assert.deepStrictEqual(p("1 01 90"), date.local(1990,  0,  1));
  assert.deepStrictEqual(p("0 05 91"), date.local(1991,  1,  3));
  assert.deepStrictEqual(p("4 53 92"), date.local(1992, 11, 31));
  assert.deepStrictEqual(p("0 52 94"), date.local(1995,  0,  1));
  assert.deepStrictEqual(p("0 01 95"), date.local(1995,  0,  8));
  assert.deepStrictEqual(p("1 01 18"), date.local(2018,  0,  1));
  assert.deepStrictEqual(p("1 01 19"), date.local(2018, 11, 31));
});

it("timeParse(\"%V %g\")(date) parses week number (ISO) and corresponding two-digits year", () => {
  const p = d3.timeParse("%V %g");
  assert.deepStrictEqual(p("01 90"), date.local(1990,  0,  1));
  assert.deepStrictEqual(p("05 91"), date.local(1991,  0, 28));
  assert.deepStrictEqual(p("53 92"), date.local(1992, 11, 28));
  assert.deepStrictEqual(p("52 94"), date.local(1994, 11, 26));
  assert.deepStrictEqual(p("01 95"), date.local(1995,  0,  2));
  assert.deepStrictEqual(p("01 18"), date.local(2018,  0,  1));
  assert.deepStrictEqual(p("01 19"), date.local(2018, 11, 31));
});

it("timeParse(\"%u %U %Y\")(date) parses numeric weekday (Monday), week number (Monday) and year", () => {
  const p = d3.timeParse("%u %W %Y");
  assert.deepStrictEqual(p("1 00 1990"), date.local(1989, 11, 25));
  assert.deepStrictEqual(p("1 01 1990"), date.local(1990, 0, 1));
  assert.deepStrictEqual(p("1 05 1991"), date.local(1991, 1, 4));
  assert.deepStrictEqual(p("7 00 1995"), date.local(1995, 0, 1));
  assert.deepStrictEqual(p("1 01 1995"), date.local(1995, 0, 2));
  assert.strictEqual(p("X 03 2010"), null);
});

it("timeParse(\"%W %Y\")(date) parses week number (Monday) and year", () => {
  const p = d3.timeParse("%W %Y");
  assert.deepStrictEqual(p("01 1990"), date.local(1990,  0,  1));
  assert.deepStrictEqual(p("04 1991"), date.local(1991,  0, 28));
  assert.deepStrictEqual(p("00 1995"), date.local(1994, 11, 26));
});

it("timeParse(\"%a %W %Y\")(date) parses abbreviated weekday, week number (Monday) and year", () => {
  const p = d3.timeParse("%a %W %Y");
  assert.deepStrictEqual(p("Mon 01 1990"), date.local(1990, 0, 1));
  assert.deepStrictEqual(p("Sun 04 1991"), date.local(1991, 1, 3));
  assert.deepStrictEqual(p("Sun 00 1995"), date.local(1995, 0, 1));
  assert.strictEqual(p("XXX 03 2010"), null);
});

it("timeParse(\"%A %W %Y\")(date) parses weekday, week number (Monday) and year", () => {
  const p = d3.timeParse("%A %W %Y");
  assert.deepStrictEqual(p("Monday 01 1990"), date.local(1990, 0, 1));
  assert.deepStrictEqual(p("Sunday 04 1991"), date.local(1991, 1, 3));
  assert.deepStrictEqual(p("Sunday 00 1995"), date.local(1995, 0, 1));
  assert.strictEqual(p("Caturday 03 2010"), null);
});

it("timeParse(\"%w %W %Y\")(date) parses numeric weekday (Sunday), week number (Monday) and year", () => {
  const p = d3.timeParse("%w %W %Y");
  assert.deepStrictEqual(p("1 01 1990"), date.local(1990, 0, 1));
  assert.deepStrictEqual(p("0 04 1991"), date.local(1991, 1, 3));
  assert.deepStrictEqual(p("0 00 1995"), date.local(1995, 0, 1));
  assert.strictEqual(p("X 03 2010"), null);
});

it("timeParse(\"%u %W %Y\")(date) parses numeric weekday (Monday), week number (Monday) and year", () => {
  const p = d3.timeParse("%u %W %Y");
  assert.deepStrictEqual(p("1 01 1990"), date.local(1990, 0, 1));
  assert.deepStrictEqual(p("7 04 1991"), date.local(1991, 1, 3));
  assert.deepStrictEqual(p("7 00 1995"), date.local(1995, 0, 1));
  assert.strictEqual(p("X 03 2010"), null);
});

it("timeParse(\"%m/%d/%y\")(date) parses month, date and two-digit year", () => {
  const p = d3.timeParse("%m/%d/%y");
  assert.deepStrictEqual(p("02/03/69"), date.local(1969, 1, 3));
  assert.deepStrictEqual(p("01/01/90"), date.local(1990, 0, 1));
  assert.deepStrictEqual(p("02/03/91"), date.local(1991, 1, 3));
  assert.deepStrictEqual(p("02/03/68"), date.local(2068, 1, 3));
  assert.strictEqual(p("03/10/2010"), null);
});

it("timeParse(\"%x\")(date) parses locale date", () => {
  const p = d3.timeParse("%x");
  assert.deepStrictEqual(p("1/1/1990"), date.local(1990, 0, 1));
  assert.deepStrictEqual(p("2/3/1991"), date.local(1991, 1, 3));
  assert.deepStrictEqual(p("3/10/2010"), date.local(2010, 2, 10));
});

it("timeParse(\"%b %d, %Y\")(date) parses abbreviated month, date and year", () => {
  const p = d3.timeParse("%b %d, %Y");
  assert.deepStrictEqual(p("jan 01, 1990"), date.local(1990, 0, 1));
  assert.deepStrictEqual(p("feb  2, 2010"), date.local(2010, 1, 2));
  assert.strictEqual(p("jan. 1, 1990"), null);
});

it("timeParse(\"%B %d, %Y\")(date) parses month, date and year", () => {
  const p = d3.timeParse("%B %d, %Y");
  assert.deepStrictEqual(p("january 01, 1990"), date.local(1990, 0, 1));
  assert.deepStrictEqual(p("February  2, 2010"), date.local(2010, 1, 2));
  assert.strictEqual(p("jan 1, 1990"), null);
});

it("timeParse(\"%j %m/%d/%Y\")(date) parses day of year and date", () => {
  const p = d3.timeParse("%j %m/%d/%Y");
  assert.deepStrictEqual(p("001 01/01/1990"), date.local(1990, 0, 1));
  assert.deepStrictEqual(p("034 02/03/1991"), date.local(1991, 1, 3));
  assert.strictEqual(p("2012 03/10/2010"), null);
});

it("timeParse(\"%c\")(date) parses locale date and time", () => {
  const p = d3.timeParse("%c");
  assert.deepStrictEqual(p("1/1/1990, 12:00:00 AM"), date.local(1990, 0, 1));
});

it("timeParse(\"%H:%M:%S\")(date) parses twenty-four hour, minute and second", () => {
  const p = d3.timeParse("%H:%M:%S");
  assert.deepStrictEqual(p("00:00:00"), date.local(1900, 0, 1, 0, 0, 0));
  assert.deepStrictEqual(p("11:59:59"), date.local(1900, 0, 1, 11, 59, 59));
  assert.deepStrictEqual(p("12:00:00"), date.local(1900, 0, 1, 12, 0, 0));
  assert.deepStrictEqual(p("12:00:01"), date.local(1900, 0, 1, 12, 0, 1));
  assert.deepStrictEqual(p("23:59:59"), date.local(1900, 0, 1, 23, 59, 59));
});

it("timeParse(\"%X\")(date) parses locale time", () => {
  const p = d3.timeParse("%X");
  assert.deepStrictEqual(p("12:00:00 AM"), date.local(1900, 0, 1, 0, 0, 0));
  assert.deepStrictEqual(p("11:59:59 AM"), date.local(1900, 0, 1, 11, 59, 59));
  assert.deepStrictEqual(p("12:00:00 PM"), date.local(1900, 0, 1, 12, 0, 0));
  assert.deepStrictEqual(p("12:00:01 PM"), date.local(1900, 0, 1, 12, 0, 1));
  assert.deepStrictEqual(p("11:59:59 PM"), date.local(1900, 0, 1, 23, 59, 59));
});

it("timeParse(\"%L\")(date) parses milliseconds", () => {
  const p = d3.timeParse("%L");
  assert.deepStrictEqual(p("432"), date.local(1900, 0, 1, 0, 0, 0, 432));
});

it("timeParse(\"%f\")(date) parses microseconds", () => {
  const p = d3.timeParse("%f");
  assert.deepStrictEqual(p("432000"), date.local(1900, 0, 1, 0, 0, 0, 432));
});

it("timeParse(\"%I:%M:%S %p\")(date) parses twelve hour, minute and second", () => {
  const p = d3.timeParse("%I:%M:%S %p");
  assert.deepStrictEqual(p("12:00:00 am"), date.local(1900, 0, 1, 0, 0, 0));
  assert.deepStrictEqual(p("11:59:59 AM"), date.local(1900, 0, 1, 11, 59, 59));
  assert.deepStrictEqual(p("12:00:00 pm"), date.local(1900, 0, 1, 12, 0, 0));
  assert.deepStrictEqual(p("12:00:01 pm"), date.local(1900, 0, 1, 12, 0, 1));
  assert.deepStrictEqual(p("11:59:59 PM"), date.local(1900, 0, 1, 23, 59, 59));
});

it("timeParse(\"%I %p\")(date) parses period in non-English locales", () => {
  const p = d3.timeFormatLocale(fiFi).parse("%I:%M:%S %p");
  assert.deepStrictEqual(p("12:00:00 a.m."), date.local(1900, 0, 1, 0, 0, 0));
  assert.deepStrictEqual(p("11:59:59 A.M."), date.local(1900, 0, 1, 11, 59, 59));
  assert.deepStrictEqual(p("12:00:00 p.m."), date.local(1900, 0, 1, 12, 0, 0));
  assert.deepStrictEqual(p("12:00:01 p.m."), date.local(1900, 0, 1, 12, 0, 1));
  assert.deepStrictEqual(p("11:59:59 P.M."), date.local(1900, 0, 1, 23, 59, 59));
});

it("timeParse(\"%Y %q\")(date) parses quarters", () => {
  const p = d3.timeParse("%Y %q");
  assert.deepStrictEqual(p("1990 1"), date.local(1990, 0, 1));
  assert.deepStrictEqual(p("1990 2"), date.local(1990, 3, 1));
  assert.deepStrictEqual(p("1990 3"), date.local(1990, 6, 1));
  assert.deepStrictEqual(p("1990 4"), date.local(1990, 9, 1));
});

it("timeParse(\"%Y %q %m\")(date) gives the month number priority", () => {
  const p = d3.timeParse("%Y %q %m");
  assert.deepStrictEqual(p("1990 1 2"), date.local(1990, 1, 1));
  assert.deepStrictEqual(p("1990 2 5"), date.local(1990, 4, 1));
  assert.deepStrictEqual(p("1990 3 8"), date.local(1990, 7, 1));
  assert.deepStrictEqual(p("1990 4 9"), date.local(1990, 8, 1));
});

it("timeParse(\"%% %m/%d/%Y\")(date) parses literal %", () => {
  const p = d3.timeParse("%% %m/%d/%Y");
  assert.deepStrictEqual(p("% 01/01/1990"), date.local(1990, 0, 1));
  assert.deepStrictEqual(p("% 02/03/1991"), date.local(1991, 1, 3));
  assert.strictEqual(p("%% 03/10/2010"), null);
});

it("timeParse(\"%m/%d/%Y %Z\")(date) parses timezone offset", () => {
  const p = d3.timeParse("%m/%d/%Y %Z");
  assert.deepStrictEqual(p("01/02/1990 +0000"), date.local(1990, 0, 1, 16));
  assert.deepStrictEqual(p("01/02/1990 +0100"), date.local(1990, 0, 1, 15));
  assert.deepStrictEqual(p("01/02/1990 +0130"), date.local(1990, 0, 1, 14, 30));
  assert.deepStrictEqual(p("01/02/1990 -0100"), date.local(1990, 0, 1, 17));
  assert.deepStrictEqual(p("01/02/1990 -0130"), date.local(1990, 0, 1, 17, 30));
  assert.deepStrictEqual(p("01/02/1990 -0800"), date.local(1990, 0, 2, 0));
});

it("timeParse(\"%m/%d/%Y %Z\")(date) parses timezone offset in the form '+-hh:mm'", () => {
  const p = d3.timeParse("%m/%d/%Y %Z");
  assert.deepStrictEqual(p("01/02/1990 +01:30"), date.local(1990, 0, 1, 14, 30));
  assert.deepStrictEqual(p("01/02/1990 -01:30"), date.local(1990, 0, 1, 17, 30));
});

it("timeParse(\"%m/%d/%Y %Z\")(date) parses timezone offset in the form '+-hh'", () => {
  const p = d3.timeParse("%m/%d/%Y %Z");
  assert.deepStrictEqual(p("01/02/1990 +01"), date.local(1990, 0, 1, 15));
  assert.deepStrictEqual(p("01/02/1990 -01"), date.local(1990, 0, 1, 17));
});

it("timeParse(\"%m/%d/%Y %Z\")(date) parses timezone offset in the form 'Z'", () => {
  const p = d3.timeParse("%m/%d/%Y %Z");
  assert.deepStrictEqual(p("01/02/1990 Z"), date.local(1990, 0, 1, 16));
});

it("timeParse(\"%-m/%0d/%_Y\")(date) ignores optional padding modifier, skipping zeroes and spaces", () => {
  const p = d3.timeParse("%-m/%0d/%_Y");
  assert.deepStrictEqual(p("01/ 1/1990"), date.local(1990, 0, 1));
});

it("timeParse(\"%b %d, %Y\")(date) doesn't crash when given weird strings", () => {
  try {
    Object.prototype.foo = 10;
    const p = d3.timeParse("%b %d, %Y");
    assert.strictEqual(p("foo 1, 1990"), null);
  } finally {
    delete Object.prototype.foo;
  }
});
