var tape = require("tape"),
    timeFormat = require("../"),
    date = require("./date");

require("./dateEqual");

tape("format(\"%a %m/%d/%Y\").parse(date) parses abbreviated weekday and date", function(test) {
  var p = timeFormat.format("%a %m/%d/%Y").parse;
  test.dateEqual(p("Sun 01/01/1990"), date.local(1990, 0, 1));
  test.dateEqual(p("Wed 02/03/1991"), date.local(1991, 1, 3));
  test.equal(p("XXX 03/10/2010"), null);
  test.end();
});

tape("format(\"%A %m/%d/%Y\").parse(date) parses weekday and date", function(test) {
  var p = timeFormat.format("%A %m/%d/%Y").parse;
  test.dateEqual(p("Sunday 01/01/1990"), date.local(1990, 0, 1));
  test.dateEqual(p("Wednesday 02/03/1991"), date.local(1991, 1, 3));
  test.equal(p("Caturday 03/10/2010"), null);
  test.end();
});

tape("format(\"%a %U %Y\").parse(date) parses abbreviated weekday, week number (Sunday) and year", function(test) {
  var p = timeFormat.format("%a %U %Y").parse;
  test.dateEqual(p("Mon 00 1990"), date.local(1990, 0, 1));
  test.dateEqual(p("Sun 05 1991"), date.local(1991, 1, 3));
  test.dateEqual(p("Sun 01 1995"), date.local(1995, 0, 1));
  test.equal(p("XXX 03 2010"), null);
  test.end();
});

tape("format(\"%A %U %Y\").parse(date) parses weekday, week number (Sunday) and year", function(test) {
  var p = timeFormat.format("%A %U %Y").parse;
  test.dateEqual(p("Monday 00 1990"), date.local(1990, 0, 1));
  test.dateEqual(p("Sunday 05 1991"), date.local(1991, 1, 3));
  test.dateEqual(p("Sunday 01 1995"), date.local(1995, 0, 1));
  test.equal(p("Caturday 03 2010"), null);
  test.end();
});

tape("format(\"%w %U %Y\").parse(date) parses numeric weekday, week number (Sunday) and year", function(test) {
  var p = timeFormat.format("%w %U %Y").parse;
  test.dateEqual(p("1 00 1990"), date.local(1990, 0, 1));
  test.dateEqual(p("0 05 1991"), date.local(1991, 1, 3));
  test.dateEqual(p("0 01 1995"), date.local(1995, 0, 1));
  test.equal(p("X 03 2010"), null);
  test.end();
});

tape("format(\"%a %W %Y\").parse(date) parses abbreviated weekday, week number (Monday) and year", function(test) {
  var p = timeFormat.format("%a %W %Y").parse;
  test.dateEqual(p("Mon 01 1990"), date.local(1990, 0, 1));
  test.dateEqual(p("Sun 04 1991"), date.local(1991, 1, 3));
  test.dateEqual(p("Sun 00 1995"), date.local(1995, 0, 1));
  test.equal(p("XXX 03 2010"), null);
  test.end();
});

tape("format(\"%A %W %Y\").parse(date) parses weekday, week number (Monday) and year", function(test) {
  var p = timeFormat.format("%A %W %Y").parse;
  test.dateEqual(p("Monday 01 1990"), date.local(1990, 0, 1));
  test.dateEqual(p("Sunday 04 1991"), date.local(1991, 1, 3));
  test.dateEqual(p("Sunday 00 1995"), date.local(1995, 0, 1));
  test.equal(p("Caturday 03 2010"), null);
  test.end();
});

tape("format(\"%w %W %Y\").parse(date) parses numeric weekday, week number (Monday) and year", function(test) {
  var p = timeFormat.format("%w %W %Y").parse;
  test.dateEqual(p("1 01 1990"), date.local(1990, 0, 1));
  test.dateEqual(p("0 04 1991"), date.local(1991, 1, 3));
  test.dateEqual(p("0 00 1995"), date.local(1995, 0, 1));
  test.equal(p("X 03 2010"), null);
  test.end();
});

tape("format(\"%m/%d/%y\").parse(date) parses month, date and two-digit year", function(test) {
  var p = timeFormat.format("%m/%d/%y").parse;
  test.dateEqual(p("02/03/69"), date.local(1969, 1, 3));
  test.dateEqual(p("01/01/90"), date.local(1990, 0, 1));
  test.dateEqual(p("02/03/91"), date.local(1991, 1, 3));
  test.dateEqual(p("02/03/68"), date.local(2068, 1, 3));
  test.equal(p("03/10/2010"), null);
  test.end();
});

tape("format(\"%x\").parse(date) parses locale date", function(test) {
  var p = timeFormat.format("%x").parse;
  test.dateEqual(p("01/01/1990"), date.local(1990, 0, 1));
  test.dateEqual(p("02/03/1991"), date.local(1991, 1, 3));
  test.dateEqual(p("03/10/2010"), date.local(2010, 2, 10));
  test.end();
});

tape("format(\"%b %d, %Y\").parse(date) parses abbreviated month, date and year", function(test) {
  var p = timeFormat.format("%b %d, %Y").parse;
  test.dateEqual(p("jan 01, 1990"), date.local(1990, 0, 1));
  test.dateEqual(p("feb  2, 2010"), date.local(2010, 1, 2));
  test.equal(p("jan. 1, 1990"), null);
  test.end();
});

tape("format(\"%B %d, %Y\").parse(date) parses month, date and year", function(test) {
  var p = timeFormat.format("%B %d, %Y").parse;
  test.dateEqual(p("january 01, 1990"), date.local(1990, 0, 1));
  test.dateEqual(p("February  2, 2010"), date.local(2010, 1, 2));
  test.equal(p("jan 1, 1990"), null);
  test.end();
});

tape("format(\"%j %m/%d/%Y\").parse(date) parses day of year and date", function(test) {
  var p = timeFormat.format("%j %m/%d/%Y").parse;
  test.dateEqual(p("001 01/01/1990"), date.local(1990, 0, 1));
  test.dateEqual(p("034 02/03/1991"), date.local(1991, 1, 3));
  test.equal(p("2012 03/10/2010"), null);
  test.end();
});

tape("format(\"%c\").parse(date) parses locale date and time", function(test) {
  var p = timeFormat.format("%c").parse;
  test.dateEqual(p("Mon Jan  1 00:00:00 1990"), date.local(1990, 0, 1));
  test.dateEqual(p("Sun Jan  1 00:00:00 1990"), date.local(1990, 0, 1));
  test.dateEqual(p("Mon Jan 01 00:00:00 1990"), date.local(1990, 0, 1));
  test.dateEqual(p("Mon Jan 1 00:00:00 1990"), date.local(1990, 0, 1));
  test.dateEqual(p("Mon Jan 1 0:0:0 1990"), date.local(1990, 0, 1));
  test.end();
});

tape("format(\"%H:%M:%S\").parse(date) parses twenty-four hour, minute and second", function(test) {
  var p = timeFormat.format("%H:%M:%S").parse;
  test.dateEqual(p("00:00:00"), date.local(1900, 0, 1, 0, 0, 0));
  test.dateEqual(p("11:59:59"), date.local(1900, 0, 1, 11, 59, 59));
  test.dateEqual(p("12:00:00"), date.local(1900, 0, 1, 12, 0, 0));
  test.dateEqual(p("12:00:01"), date.local(1900, 0, 1, 12, 0, 1));
  test.dateEqual(p("23:59:59"), date.local(1900, 0, 1, 23, 59, 59));
  test.end();
});

tape("format(\"%X\").parse(date) parses locale time", function(test) {
  var p = timeFormat.format("%X").parse;
  test.dateEqual(p("00:00:00"), date.local(1900, 0, 1, 0, 0, 0));
  test.dateEqual(p("11:59:59"), date.local(1900, 0, 1, 11, 59, 59));
  test.dateEqual(p("12:00:00"), date.local(1900, 0, 1, 12, 0, 0));
  test.dateEqual(p("12:00:01"), date.local(1900, 0, 1, 12, 0, 1));
  test.dateEqual(p("23:59:59"), date.local(1900, 0, 1, 23, 59, 59));
  test.end();
});

tape("format(\"%I:%M:%S %p\").parse(date) parses twelve hour, minute and second", function(test) {
  var p = timeFormat.format("%I:%M:%S %p").parse;
  test.dateEqual(p("12:00:00 am"), date.local(1900, 0, 1, 0, 0, 0));
  test.dateEqual(p("11:59:59 AM"), date.local(1900, 0, 1, 11, 59, 59));
  test.dateEqual(p("12:00:00 pm"), date.local(1900, 0, 1, 12, 0, 0));
  test.dateEqual(p("12:00:01 pm"), date.local(1900, 0, 1, 12, 0, 1));
  test.dateEqual(p("11:59:59 PM"), date.local(1900, 0, 1, 23, 59, 59));
  test.end();
});

tape("format(\"%% %m/%d/%Y\").parse(date) parses literal %", function(test) {
  var p = timeFormat.format("%% %m/%d/%Y").parse;
  test.dateEqual(p("% 01/01/1990"), date.local(1990, 0, 1));
  test.dateEqual(p("% 02/03/1991"), date.local(1991, 1, 3));
  test.equal(p("%% 03/10/2010"), null);
  test.end();
});

tape("format(\"%m/%d/%Y %Z\").parse(date) parses timezone offset", function(test) {
  var p = timeFormat.format("%m/%d/%Y %Z").parse;
  test.dateEqual(p("01/02/1990 +0000"), date.local(1990, 0, 1, 16));
  test.dateEqual(p("01/02/1990 +0100"), date.local(1990, 0, 1, 15));
  test.dateEqual(p("01/02/1990 +0130"), date.local(1990, 0, 1, 14, 30));
  test.dateEqual(p("01/02/1990 -0100"), date.local(1990, 0, 1, 17));
  test.dateEqual(p("01/02/1990 -0130"), date.local(1990, 0, 1, 17, 30));
  test.dateEqual(p("01/02/1990 -0800"), date.local(1990, 0, 2, 0));
  test.end();
});

tape("format(\"%-m/%0d/%_Y\").parse(date) ignores optional padding modifier, skipping zeroes and spaces", function(test) {
  var p = timeFormat.format("%-m/%0d/%_Y").parse;
  test.dateEqual(p("01/ 1/1990"), date.local(1990, 0, 1));
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
