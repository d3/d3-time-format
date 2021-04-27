import assert from "assert";
import * as d3 from "../src/index.js";
import * as date from "./date.js";


it("utcParse(specifier) coerces the specified specifier to a string", () => {
  const p = d3.utcParse({toString: function() { return "%c"; }});
  assert.deepStrictEqual(p("1/1/1990, 12:00:00 AM"), date.utc(1990, 0, 1));
});

it("utcParse(\"\")(date) parses abbreviated weekday and numeric date", () => {
  const p = d3.utcParse("%a %m/%d/%Y");
  assert.deepStrictEqual(p("Sun 01/01/1990"), date.utc(1990, 0, 1));
  assert.deepStrictEqual(p("Wed 02/03/1991"), date.utc(1991, 1, 3));
  assert.strictEqual(p("XXX 03/10/2010"), null);
});

it("utcParse(\"\")(date) parses weekday and numeric date", () => {
  const p = d3.utcParse("%A %m/%d/%Y");
  assert.deepStrictEqual(p("Sunday 01/01/1990"), date.utc(1990, 0, 1));
  assert.deepStrictEqual(p("Wednesday 02/03/1991"), date.utc(1991, 1, 3));
  assert.strictEqual(p("Caturday 03/10/2010"), null);
});

it("utcParse(\"\")(date) parses numeric date", () => {
  const p = d3.utcParse("%m/%d/%y");
  assert.deepStrictEqual(p("01/01/90"), date.utc(1990, 0, 1));
  assert.deepStrictEqual(p("02/03/91"), date.utc(1991, 1, 3));
  assert.strictEqual(p("03/10/2010"), null);
});

it("utcParse(\"\")(date) parses locale date", () => {
  const p = d3.utcParse("%x");
  assert.deepStrictEqual(p("01/01/1990"), date.utc(1990, 0, 1));
  assert.deepStrictEqual(p("02/03/1991"), date.utc(1991, 1, 3));
  assert.deepStrictEqual(p("03/10/2010"), date.utc(2010, 2, 10));
});

it("utcParse(\"\")(date) parses abbreviated month, date and year", () => {
  const p = d3.utcParse("%b %d, %Y");
  assert.deepStrictEqual(p("jan 01, 1990"), date.utc(1990, 0, 1));
  assert.deepStrictEqual(p("feb  2, 2010"), date.utc(2010, 1, 2));
  assert.strictEqual(p("jan. 1, 1990"), null);
});

it("utcParse(\"\")(date) parses month, date and year", () => {
  const p = d3.utcParse("%B %d, %Y");
  assert.deepStrictEqual(p("january 01, 1990"), date.utc(1990, 0, 1));
  assert.deepStrictEqual(p("February  2, 2010"), date.utc(2010, 1, 2));
  assert.strictEqual(p("jan 1, 1990"), null);
});

it("utcParse(\"\")(date) parses locale date and time", () => {
  const p = d3.utcParse("%c");
  assert.deepStrictEqual(p("1/1/1990, 12:00:00 AM"), date.utc(1990, 0, 1));
});

it("utcParse(\"\")(date) parses twenty-four hour, minute and second", () => {
  const p = d3.utcParse("%H:%M:%S");
  assert.deepStrictEqual(p("00:00:00"), date.utc(1900, 0, 1, 0, 0, 0));
  assert.deepStrictEqual(p("11:59:59"), date.utc(1900, 0, 1, 11, 59, 59));
  assert.deepStrictEqual(p("12:00:00"), date.utc(1900, 0, 1, 12, 0, 0));
  assert.deepStrictEqual(p("12:00:01"), date.utc(1900, 0, 1, 12, 0, 1));
  assert.deepStrictEqual(p("23:59:59"), date.utc(1900, 0, 1, 23, 59, 59));
});

it("utcParse(\"\")(date) parses locale time", () => {
  const p = d3.utcParse("%X");
  assert.deepStrictEqual(p("12:00:00 AM"), date.utc(1900, 0, 1, 0, 0, 0));
  assert.deepStrictEqual(p("11:59:59 AM"), date.utc(1900, 0, 1, 11, 59, 59));
  assert.deepStrictEqual(p("12:00:00 PM"), date.utc(1900, 0, 1, 12, 0, 0));
  assert.deepStrictEqual(p("12:00:01 PM"), date.utc(1900, 0, 1, 12, 0, 1));
  assert.deepStrictEqual(p("11:59:59 PM"), date.utc(1900, 0, 1, 23, 59, 59));
});

it("utcParse(\"%L\")(date) parses milliseconds", () => {
  const p = d3.utcParse("%L");
  assert.deepStrictEqual(p("432"), date.utc(1900, 0, 1, 0, 0, 0, 432));
});

it("utcParse(\"%f\")(date) parses microseconds", () => {
  const p = d3.utcParse("%f");
  assert.deepStrictEqual(p("432000"), date.utc(1900, 0, 1, 0, 0, 0, 432));
});

it("utcParse(\"\")(date) parses twelve hour, minute and second", () => {
  const p = d3.utcParse("%I:%M:%S %p");
  assert.deepStrictEqual(p("12:00:00 am"), date.utc(1900, 0, 1, 0, 0, 0));
  assert.deepStrictEqual(p("11:59:59 AM"), date.utc(1900, 0, 1, 11, 59, 59));
  assert.deepStrictEqual(p("12:00:00 pm"), date.utc(1900, 0, 1, 12, 0, 0));
  assert.deepStrictEqual(p("12:00:01 pm"), date.utc(1900, 0, 1, 12, 0, 1));
  assert.deepStrictEqual(p("11:59:59 PM"), date.utc(1900, 0, 1, 23, 59, 59));
});

it("utcParse(\"\")(date) parses timezone offset", () => {
  const p = d3.utcParse("%m/%d/%Y %Z");
  assert.deepStrictEqual(p("01/02/1990 +0000"), date.utc(1990, 0, 2));
  assert.deepStrictEqual(p("01/02/1990 +0100"), date.utc(1990, 0, 1, 23));
  assert.deepStrictEqual(p("01/02/1990 -0100"), date.utc(1990, 0, 2, 1));
  assert.deepStrictEqual(p("01/02/1990 -0800"), date.local(1990, 0, 2));
});

it("utcParse(\"\")(date) parses timezone offset (in the form '+-hh:mm')", () => {
  const p = d3.utcParse("%m/%d/%Y %Z");
  assert.deepStrictEqual(p("01/02/1990 +01:30"), date.utc(1990, 0, 1, 22, 30));
  assert.deepStrictEqual(p("01/02/1990 -01:30"), date.utc(1990, 0, 2, 1, 30));
});

it("utcParse(\"\")(date) parses timezone offset (in the form '+-hh')", () => {
  const p = d3.utcParse("%m/%d/%Y %Z");
  assert.deepStrictEqual(p("01/02/1990 +01"), date.utc(1990, 0, 1, 23));
  assert.deepStrictEqual(p("01/02/1990 -01"), date.utc(1990, 0, 2, 1));
});

it("utcParse(\"\")(date) parses timezone offset (in the form 'Z')", () => {
  const p = d3.utcParse("%m/%d/%Y %Z");
  assert.deepStrictEqual(p("01/02/1990 Z"), date.utc(1990, 0, 2));
});

it("utcParse(\"%Y %U %w\")(date) handles a year that starts on Sunday", () => {
  const p = d3.utcParse("%Y %U %w");
  assert.deepStrictEqual(p("2012 01 0"), date.utc(2012,  0,  1));
});

it("utcParse(\"%w %V %Y\")(date) parses numeric weekday, week number (ISO) and year", () => {
  const p = d3.utcParse("%w %V %Y");
  assert.deepStrictEqual(p("1 01 1990"), date.utc(1990,  0,  1));
  assert.deepStrictEqual(p("0 05 1991"), date.utc(1991,  1,  3));
  assert.deepStrictEqual(p("4 53 1992"), date.utc(1992, 11, 31));
  assert.deepStrictEqual(p("0 52 1994"), date.utc(1995,  0,  1));
  assert.deepStrictEqual(p("0 01 1995"), date.utc(1995,  0,  8));
  assert.strictEqual(p("X 03 2010"), null);
});

it("utcParse(\"%w %V %G\")(date) parses numeric weekday, week number (ISO) and corresponding year", () => {
  const p = d3.utcParse("%w %V %G");
  assert.deepStrictEqual(p("1 01 1990"), date.utc(1990,  0,  1));
  assert.deepStrictEqual(p("0 05 1991"), date.utc(1991,  1,  3));
  assert.deepStrictEqual(p("4 53 1992"), date.utc(1992, 11, 31));
  assert.deepStrictEqual(p("0 52 1994"), date.utc(1995,  0,  1));
  assert.deepStrictEqual(p("0 01 1995"), date.utc(1995,  0,  8));
  assert.deepStrictEqual(p("1 01 2018"), date.utc(2018, 0, 1));
  assert.deepStrictEqual(p("1 01 2019"), date.utc(2018, 11, 31));
  assert.strictEqual(p("X 03 2010"), null);
});

it("utcParse(\"%V %Y\")(date) week number (ISO) and year", () => {
  const p = d3.utcParse("%V %Y");
  assert.deepStrictEqual(p("01 1990"), date.utc(1990,  0,  1));
  assert.deepStrictEqual(p("05 1991"), date.utc(1991,  0, 28));
  assert.deepStrictEqual(p("53 1992"), date.utc(1992, 11, 28));
  assert.deepStrictEqual(p("01 1993"), date.utc(1993,  0,  4));
  assert.deepStrictEqual(p("01 1995"), date.utc(1995,  0,  2));
  assert.deepStrictEqual(p("00 1995"), null);
  assert.deepStrictEqual(p("54 1995"), null);
  assert.deepStrictEqual(p("X 1995"), null);
});

it("utcParse(\"%V %g\")(date) week number (ISO) and corresponding two-digits year", () => {
  const p = d3.utcParse("%V %g");
  assert.deepStrictEqual(p("01 90"), date.utc(1990,  0,  1));
  assert.deepStrictEqual(p("05 91"), date.utc(1991,  0, 28));
  assert.deepStrictEqual(p("53 92"), date.utc(1992, 11, 28));
  assert.deepStrictEqual(p("01 93"), date.utc(1993,  0,  4));
  assert.deepStrictEqual(p("01 95"), date.utc(1995, 0, 2));
  assert.deepStrictEqual(p("01 18"), date.utc(2018, 0, 1));
  assert.deepStrictEqual(p("01 19"), date.utc(2018, 11, 31));
  assert.deepStrictEqual(p("00 95"), null);
  assert.deepStrictEqual(p("54 95"), null);
  assert.deepStrictEqual(p("X 95"), null);
});

it("utcParse(\"%V %G\")(date) week number (ISO) and corresponding year", () => {
  const p = d3.utcParse("%V %G");
  assert.deepStrictEqual(p("01 1990"), date.utc(1990,  0,  1));
  assert.deepStrictEqual(p("05 1991"), date.utc(1991,  0, 28));
  assert.deepStrictEqual(p("53 1992"), date.utc(1992, 11, 28));
  assert.deepStrictEqual(p("01 1993"), date.utc(1993,  0,  4));
  assert.deepStrictEqual(p("01 1995"), date.utc(1995, 0, 2));
  assert.deepStrictEqual(p("01 2018"), date.utc(2018, 0, 1));
  assert.deepStrictEqual(p("01 2019"), date.utc(2018, 11, 31));
  assert.deepStrictEqual(p("00 1995"), null);
  assert.deepStrictEqual(p("54 1995"), null);
  assert.deepStrictEqual(p("X 1995"), null);
});

it("utcParse(\"%Q\")(date) parses UNIX timestamps", () => {
  const p = d3.utcParse("%Q");
  assert.deepStrictEqual(p("0"), date.utc(1970, 0, 1));
  assert.deepStrictEqual(p("631152000000"), date.utc(1990, 0, 1));
});

it("utcParse(\"%s\")(date) parses UNIX timestamps in seconds", () => {
  const p = d3.utcParse("%s");
  assert.deepStrictEqual(p("0"), date.utc(1970, 0, 1));
  assert.deepStrictEqual(p("631152000"), date.utc(1990, 0, 1));
});

it("utcParse(\"%s.%L\")(date) parses UNIX timetamps in seconds and milliseconds", () => {
  const p = d3.utcParse("%s.%L");
  assert.deepStrictEqual(p("631152000.123"), date.utc(1990, 0, 1,  0,  0,  0, 123));
  assert.deepStrictEqual(p("631197296.789"), date.utc(1990, 0, 1, 12, 34, 56, 789));
});

it("utcParse(\"%s.%f\")(date) parses UNIX timetamps in seconds and microseconds", () => {
  const p = d3.utcParse("%s.%f");
  assert.deepStrictEqual(p("631152000.123000"), date.utc(1990, 0, 1,  0,  0,  0, 123));
  assert.deepStrictEqual(p("631197296.789000"), date.utc(1990, 0, 1, 12, 34, 56, 789));
});
