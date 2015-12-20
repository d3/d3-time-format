var tape = require("tape"),
    timeFormat = require("../"),
    date = require("./date");

tape("parse(string) coerces the specified string to a string", function(test) {
  var p = timeFormat.format("%c").parse;
  test.deepEqual(p({toString: function() { return "Mon Jan  1 00:00:00 1990"; }}), date.local(1990, 0, 1));
  test.deepEqual(p({toString: function() { return "Tue Jan  2 00:00:00 1990"; }}), date.local(1990, 0, 2));
  test.deepEqual(p({toString: function() { return "Wed Jan  3 00:00:00 1990"; }}), date.local(1990, 0, 3));
  test.deepEqual(p({toString: function() { return "Thu Jan  4 00:00:00 1990"; }}), date.local(1990, 0, 4));
  test.deepEqual(p({toString: function() { return "Fri Jan  5 00:00:00 1990"; }}), date.local(1990, 0, 5));
  test.deepEqual(p({toString: function() { return "Sat Jan  6 00:00:00 1990"; }}), date.local(1990, 0, 6));
  test.deepEqual(p({toString: function() { return "Sun Jan  7 00:00:00 1990"; }}), date.local(1990, 0, 7));
  test.end();
});

tape("format(\"%a %m/%d/%Y\").parse(date) parses abbreviated weekday and date", function(test) {
  var p = timeFormat.format("%a %m/%d/%Y").parse;
  test.deepEqual(p("Sun 01/01/1990"), date.local(1990, 0, 1));
  test.deepEqual(p("Wed 02/03/1991"), date.local(1991, 1, 3));
  test.equal(p("XXX 03/10/2010"), null);
  test.end();
});

tape("format(\"%A %m/%d/%Y\").parse(date) parses weekday and date", function(test) {
  var p = timeFormat.format("%A %m/%d/%Y").parse;
  test.deepEqual(p("Sunday 01/01/1990"), date.local(1990, 0, 1));
  test.deepEqual(p("Wednesday 02/03/1991"), date.local(1991, 1, 3));
  test.equal(p("Caturday 03/10/2010"), null);
  test.end();
});

tape("format(\"%U %Y\").parse(date) parses week number (Sunday) and year", function(test) {
  var p = timeFormat.format("%U %Y").parse;
  test.deepEqual(p("00 1990"), date.local(1989, 11, 31));
  test.deepEqual(p("05 1991"), date.local(1991,  1,  3));
  test.deepEqual(p("01 1995"), date.local(1995,  0,  1));
  test.end();
});

tape("format(\"%a %U %Y\").parse(date) parses abbreviated weekday, week number (Sunday) and year", function(test) {
  var p = timeFormat.format("%a %U %Y").parse;
  test.deepEqual(p("Mon 00 1990"), date.local(1990, 0, 1));
  test.deepEqual(p("Sun 05 1991"), date.local(1991, 1, 3));
  test.deepEqual(p("Sun 01 1995"), date.local(1995, 0, 1));
  test.equal(p("XXX 03 2010"), null);
  test.end();
});

tape("format(\"%A %U %Y\").parse(date) parses weekday, week number (Sunday) and year", function(test) {
  var p = timeFormat.format("%A %U %Y").parse;
  test.deepEqual(p("Monday 00 1990"), date.local(1990, 0, 1));
  test.deepEqual(p("Sunday 05 1991"), date.local(1991, 1, 3));
  test.deepEqual(p("Sunday 01 1995"), date.local(1995, 0, 1));
  test.equal(p("Caturday 03 2010"), null);
  test.end();
});

tape("format(\"%w %U %Y\").parse(date) parses numeric weekday, week number (Sunday) and year", function(test) {
  var p = timeFormat.format("%w %U %Y").parse;
  test.deepEqual(p("1 00 1990"), date.local(1990, 0, 1));
  test.deepEqual(p("0 05 1991"), date.local(1991, 1, 3));
  test.deepEqual(p("0 01 1995"), date.local(1995, 0, 1));
  test.equal(p("X 03 2010"), null);
  test.end();
});

tape("format(\"%W %Y\").parse(date) parses week number (Monday) and year", function(test) {
  var p = timeFormat.format("%W %Y").parse;
  test.deepEqual(p("01 1990"), date.local(1990,  0,  1));
  test.deepEqual(p("04 1991"), date.local(1991,  0, 28));
  test.deepEqual(p("00 1995"), date.local(1994, 11, 26));
  test.end();
});

tape("format(\"%a %W %Y\").parse(date) parses abbreviated weekday, week number (Monday) and year", function(test) {
  var p = timeFormat.format("%a %W %Y").parse;
  test.deepEqual(p("Mon 01 1990"), date.local(1990, 0, 1));
  test.deepEqual(p("Sun 04 1991"), date.local(1991, 1, 3));
  test.deepEqual(p("Sun 00 1995"), date.local(1995, 0, 1));
  test.equal(p("XXX 03 2010"), null);
  test.end();
});

tape("format(\"%A %W %Y\").parse(date) parses weekday, week number (Monday) and year", function(test) {
  var p = timeFormat.format("%A %W %Y").parse;
  test.deepEqual(p("Monday 01 1990"), date.local(1990, 0, 1));
  test.deepEqual(p("Sunday 04 1991"), date.local(1991, 1, 3));
  test.deepEqual(p("Sunday 00 1995"), date.local(1995, 0, 1));
  test.equal(p("Caturday 03 2010"), null);
  test.end();
});

tape("format(\"%w %W %Y\").parse(date) parses numeric weekday, week number (Monday) and year", function(test) {
  var p = timeFormat.format("%w %W %Y").parse;
  test.deepEqual(p("1 01 1990"), date.local(1990, 0, 1));
  test.deepEqual(p("0 04 1991"), date.local(1991, 1, 3));
  test.deepEqual(p("0 00 1995"), date.local(1995, 0, 1));
  test.equal(p("X 03 2010"), null);
  test.end();
});

tape("format(\"%m/%d/%y\").parse(date) parses month, date and two-digit year", function(test) {
  var p = timeFormat.format("%m/%d/%y").parse;
  test.deepEqual(p("02/03/69"), date.local(1969, 1, 3));
  test.deepEqual(p("01/01/90"), date.local(1990, 0, 1));
  test.deepEqual(p("02/03/91"), date.local(1991, 1, 3));
  test.deepEqual(p("02/03/68"), date.local(2068, 1, 3));
  test.equal(p("03/10/2010"), null);
  test.end();
});

// TODO
// tape("format(\"%m/%d/%+y\").parse(date) parses month, date and signed two-digit year", function(test) {
//   var p = timeFormat.format("%m/%d/%y").parse;
//   test.deepEqual(p("02/03/+69"), date.local(1969, 1, 3));
//   test.deepEqual(p("01/01/+90"), date.local(1990, 0, 1));
//   test.deepEqual(p("02/03/+91"), date.local(1991, 1, 3));
//   test.deepEqual(p("02/03/-68"), date.local(-68, 1, 3));
//   test.equal(p("03/10/10"), null);
//   test.end();
// });

tape("format(\"%x\").parse(date) parses locale date", function(test) {
  var p = timeFormat.format("%x").parse;
  test.deepEqual(p("01/01/1990"), date.local(1990, 0, 1));
  test.deepEqual(p("02/03/1991"), date.local(1991, 1, 3));
  test.deepEqual(p("03/10/2010"), date.local(2010, 2, 10));
  test.end();
});

tape("format(\"%b %d, %Y\").parse(date) parses abbreviated month, date and year", function(test) {
  var p = timeFormat.format("%b %d, %Y").parse;
  test.deepEqual(p("jan 01, 1990"), date.local(1990, 0, 1));
  test.deepEqual(p("feb  2, 2010"), date.local(2010, 1, 2));
  test.equal(p("jan. 1, 1990"), null);
  test.end();
});

tape("format(\"%B %d, %Y\").parse(date) parses month, date and year", function(test) {
  var p = timeFormat.format("%B %d, %Y").parse;
  test.deepEqual(p("january 01, 1990"), date.local(1990, 0, 1));
  test.deepEqual(p("February  2, 2010"), date.local(2010, 1, 2));
  test.equal(p("jan 1, 1990"), null);
  test.end();
});

tape("format(\"%j %m/%d/%Y\").parse(date) parses day of year and date", function(test) {
  var p = timeFormat.format("%j %m/%d/%Y").parse;
  test.deepEqual(p("001 01/01/1990"), date.local(1990, 0, 1));
  test.deepEqual(p("034 02/03/1991"), date.local(1991, 1, 3));
  test.equal(p("2012 03/10/2010"), null);
  test.end();
});

tape("format(\"%c\").parse(date) parses locale date and time", function(test) {
  var p = timeFormat.format("%c").parse;
  test.deepEqual(p("Mon Jan  1 00:00:00 1990"), date.local(1990, 0, 1));
  test.deepEqual(p("Sun Jan  1 00:00:00 1990"), date.local(1990, 0, 1));
  test.deepEqual(p("Mon Jan 01 00:00:00 1990"), date.local(1990, 0, 1));
  test.deepEqual(p("Mon Jan 1 00:00:00 1990"), date.local(1990, 0, 1));
  test.deepEqual(p("Mon Jan 1 0:0:0 1990"), date.local(1990, 0, 1));
  test.end();
});

tape("format(\"%H:%M:%S\").parse(date) parses twenty-four hour, minute and second", function(test) {
  var p = timeFormat.format("%H:%M:%S").parse;
  test.deepEqual(p("00:00:00"), date.local(1900, 0, 1, 0, 0, 0));
  test.deepEqual(p("11:59:59"), date.local(1900, 0, 1, 11, 59, 59));
  test.deepEqual(p("12:00:00"), date.local(1900, 0, 1, 12, 0, 0));
  test.deepEqual(p("12:00:01"), date.local(1900, 0, 1, 12, 0, 1));
  test.deepEqual(p("23:59:59"), date.local(1900, 0, 1, 23, 59, 59));
  test.end();
});

tape("format(\"%X\").parse(date) parses locale time", function(test) {
  var p = timeFormat.format("%X").parse;
  test.deepEqual(p("00:00:00"), date.local(1900, 0, 1, 0, 0, 0));
  test.deepEqual(p("11:59:59"), date.local(1900, 0, 1, 11, 59, 59));
  test.deepEqual(p("12:00:00"), date.local(1900, 0, 1, 12, 0, 0));
  test.deepEqual(p("12:00:01"), date.local(1900, 0, 1, 12, 0, 1));
  test.deepEqual(p("23:59:59"), date.local(1900, 0, 1, 23, 59, 59));
  test.end();
});

tape("format(\"%I:%M:%S %p\").parse(date) parses twelve hour, minute and second", function(test) {
  var p = timeFormat.format("%I:%M:%S %p").parse;
  test.deepEqual(p("12:00:00 am"), date.local(1900, 0, 1, 0, 0, 0));
  test.deepEqual(p("11:59:59 AM"), date.local(1900, 0, 1, 11, 59, 59));
  test.deepEqual(p("12:00:00 pm"), date.local(1900, 0, 1, 12, 0, 0));
  test.deepEqual(p("12:00:01 pm"), date.local(1900, 0, 1, 12, 0, 1));
  test.deepEqual(p("11:59:59 PM"), date.local(1900, 0, 1, 23, 59, 59));
  test.end();
});

tape("format(\"%I %p\").parse(date) parses period in non-English locales", function(test) {
  var p = timeFormat.localeFiFi.format("%I:%M:%S %p").parse;
  test.deepEqual(p("12:00:00 a.m."), date.local(1900, 0, 1, 0, 0, 0));
  test.deepEqual(p("11:59:59 A.M."), date.local(1900, 0, 1, 11, 59, 59));
  test.deepEqual(p("12:00:00 p.m."), date.local(1900, 0, 1, 12, 0, 0));
  test.deepEqual(p("12:00:01 p.m."), date.local(1900, 0, 1, 12, 0, 1));
  test.deepEqual(p("11:59:59 P.M."), date.local(1900, 0, 1, 23, 59, 59));
  test.end();
});

tape("format(\"%% %m/%d/%Y\").parse(date) parses literal %", function(test) {
  var p = timeFormat.format("%% %m/%d/%Y").parse;
  test.deepEqual(p("% 01/01/1990"), date.local(1990, 0, 1));
  test.deepEqual(p("% 02/03/1991"), date.local(1991, 1, 3));
  test.equal(p("%% 03/10/2010"), null);
  test.end();
});

tape("format(\"%m/%d/%Y %Z\").parse(date) parses timezone offset", function(test) {
  var p = timeFormat.format("%m/%d/%Y %Z").parse;
  test.deepEqual(p("01/02/1990 +0000"), date.local(1990, 0, 1, 16));
  test.deepEqual(p("01/02/1990 +0100"), date.local(1990, 0, 1, 15));
  test.deepEqual(p("01/02/1990 +0130"), date.local(1990, 0, 1, 14, 30));
  test.deepEqual(p("01/02/1990 -0100"), date.local(1990, 0, 1, 17));
  test.deepEqual(p("01/02/1990 -0130"), date.local(1990, 0, 1, 17, 30));
  test.deepEqual(p("01/02/1990 -0800"), date.local(1990, 0, 2, 0));
  test.end();
});

tape("format(\"%m/%d/%Y %Z\").parse(date) parses timezone offset in the form '+-hh:mm'", function(test) {
  var p = timeFormat.format("%m/%d/%Y %Z").parse;
  test.deepEqual(p("01/02/1990 +01:30"), date.local(1990, 0, 1, 14, 30));
  test.deepEqual(p("01/02/1990 -01:30"), date.local(1990, 0, 1, 17, 30));
  test.end();
});

tape("format(\"%m/%d/%Y %Z\").parse(date) parses timezone offset in the form '+-hh'", function(test) {
  var p = timeFormat.format("%m/%d/%Y %Z").parse;
  test.deepEqual(p("01/02/1990 +01"), date.local(1990, 0, 1, 15));
  test.deepEqual(p("01/02/1990 -01"), date.local(1990, 0, 1, 17));
  test.end();
});

tape("format(\"%m/%d/%Y %Z\").parse(date) parses timezone offset in the form 'Z'", function(test) {
  var p = timeFormat.format("%m/%d/%Y %Z").parse;
  test.deepEqual(p("01/02/1990 Z"), date.local(1990, 0, 1, 16));
  test.end();
});

tape("format(\"%-m/%0d/%_Y\").parse(date) ignores optional padding modifier, skipping zeroes and spaces", function(test) {
  var p = timeFormat.format("%-m/%0d/%_Y").parse;
  test.deepEqual(p("01/ 1/1990"), date.local(1990, 0, 1));
  test.end();
});

tape("format(\"%b %d, %Y\").parse(date) doesn't crash when given weird strings", function(test) {
  try {
    Object.prototype.foo = 10;
    var p = timeFormat.format("%b %d, %Y").parse;
    test.equal(p("foo 1, 1990"), null);
  } finally {
    delete Object.prototype.foo;
  }
  test.end();
});
