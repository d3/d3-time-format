var tape = require("tape"),
    time = require("d3-time"),
    timeFormat = require("../"),
    date = require("./date");

var formatMillisecond = timeFormat.format(".%L"),
    formatSecond = timeFormat.format(":%S"),
    formatMinute = timeFormat.format("%I:%M"),
    formatHour = timeFormat.format("%I %p"),
    formatDay = timeFormat.format("%a %d"),
    formatWeek = timeFormat.format("%b %d"),
    formatMonth = timeFormat.format("%B"),
    formatYear = timeFormat.format("%Y");

function multi(d) {
  return (time.second(d) < d ? formatMillisecond
      : time.minute(d) < d ? formatSecond
      : time.hour(d) < d ? formatMinute
      : time.day(d) < d ? formatHour
      : time.month(d) < d ? (time.week(d) < d ? formatDay : formatWeek)
      : time.year(d) < d ? formatMonth
      : formatYear)(d);
}

tape("format(date) coerces the specified date to a Date", function(test) {
  var f = timeFormat.format("%c");
  test.equal(f(+date.local(1990, 0, 1)), "Mon Jan  1 00:00:00 1990");
  test.equal(f(+date.local(1990, 0, 2)), "Tue Jan  2 00:00:00 1990");
  test.equal(f(+date.local(1990, 0, 3)), "Wed Jan  3 00:00:00 1990");
  test.equal(f(+date.local(1990, 0, 4)), "Thu Jan  4 00:00:00 1990");
  test.equal(f(+date.local(1990, 0, 5)), "Fri Jan  5 00:00:00 1990");
  test.equal(f(+date.local(1990, 0, 6)), "Sat Jan  6 00:00:00 1990");
  test.equal(f(+date.local(1990, 0, 7)), "Sun Jan  7 00:00:00 1990");
  test.end();
});

tape("format(\"%a\")(date) formats abbreviated weekdays", function(test) {
  var f = timeFormat.format("%a");
  test.equal(f(date.local(1990, 0, 1)), "Mon");
  test.equal(f(date.local(1990, 0, 2)), "Tue");
  test.equal(f(date.local(1990, 0, 3)), "Wed");
  test.equal(f(date.local(1990, 0, 4)), "Thu");
  test.equal(f(date.local(1990, 0, 5)), "Fri");
  test.equal(f(date.local(1990, 0, 6)), "Sat");
  test.equal(f(date.local(1990, 0, 7)), "Sun");
  test.end();
});

tape("format(\"%A\")(date) formats weekdays", function(test) {
  var f = timeFormat.format("%A");
  test.equal(f(date.local(1990, 0, 1)), "Monday");
  test.equal(f(date.local(1990, 0, 2)), "Tuesday");
  test.equal(f(date.local(1990, 0, 3)), "Wednesday");
  test.equal(f(date.local(1990, 0, 4)), "Thursday");
  test.equal(f(date.local(1990, 0, 5)), "Friday");
  test.equal(f(date.local(1990, 0, 6)), "Saturday");
  test.equal(f(date.local(1990, 0, 7)), "Sunday");
  test.end();
});

tape("format(\"%b\")(date) formats abbreviated months", function(test) {
  var f = timeFormat.format("%b");
  test.equal(f(date.local(1990,  0, 1)), "Jan");
  test.equal(f(date.local(1990,  1, 1)), "Feb");
  test.equal(f(date.local(1990,  2, 1)), "Mar");
  test.equal(f(date.local(1990,  3, 1)), "Apr");
  test.equal(f(date.local(1990,  4, 1)), "May");
  test.equal(f(date.local(1990,  5, 1)), "Jun");
  test.equal(f(date.local(1990,  6, 1)), "Jul");
  test.equal(f(date.local(1990,  7, 1)), "Aug");
  test.equal(f(date.local(1990,  8, 1)), "Sep");
  test.equal(f(date.local(1990,  9, 1)), "Oct");
  test.equal(f(date.local(1990, 10, 1)), "Nov");
  test.equal(f(date.local(1990, 11, 1)), "Dec");
  test.end();
});

tape("format(\"%B\")(date) formats months", function(test) {
  var f = timeFormat.format("%B");
  test.equal(f(date.local(1990,  0, 1)), "January");
  test.equal(f(date.local(1990,  1, 1)), "February");
  test.equal(f(date.local(1990,  2, 1)), "March");
  test.equal(f(date.local(1990,  3, 1)), "April");
  test.equal(f(date.local(1990,  4, 1)), "May");
  test.equal(f(date.local(1990,  5, 1)), "June");
  test.equal(f(date.local(1990,  6, 1)), "July");
  test.equal(f(date.local(1990,  7, 1)), "August");
  test.equal(f(date.local(1990,  8, 1)), "September");
  test.equal(f(date.local(1990,  9, 1)), "October");
  test.equal(f(date.local(1990, 10, 1)), "November");
  test.equal(f(date.local(1990, 11, 1)), "December");
  test.end();
});

tape("format(\"%c\")(date) formats localized dates and times", function(test) {
  var f = timeFormat.format("%c");
  test.equal(f(date.local(1990, 0, 1)), "Mon Jan  1 00:00:00 1990");
  test.end();
});

tape("format(\"%d\")(date) formats zero-padded dates", function(test) {
  var f = timeFormat.format("%d");
  test.equal(f(date.local(1990, 0, 1)), "01");
  test.end();
});

tape("format(\"%e\")(date) formats space-padded dates", function(test) {
  var f = timeFormat.format("%e");
  test.equal(f(date.local(1990, 0, 1)), " 1");
  test.end();
});

tape("format(\"%H\")(date) formats zero-padded hours (24)", function(test) {
  var f = timeFormat.format("%H");
  test.equal(f(date.local(1990, 0, 1,  0)), "00");
  test.equal(f(date.local(1990, 0, 1, 13)), "13");
  test.end();
});

tape("format(\"%I\")(date) formats zero-padded hours (12)", function(test) {
  var f = timeFormat.format("%I");
  test.equal(f(date.local(1990, 0, 1,  0)), "12");
  test.equal(f(date.local(1990, 0, 1, 13)), "01");
  test.end();
});

tape("format(\"%j\")(date) formats zero-padded day of year numbers", function(test) {
  var f = timeFormat.format("%j");
  test.equal(f(date.local(1990,  0,  1)), "001");
  test.equal(f(date.local(1990,  5,  1)), "152");
  test.equal(f(date.local(2010,  2, 13)), "072");
  test.equal(f(date.local(2010,  2, 14)), "073"); // DST begins
  test.equal(f(date.local(2010,  2, 15)), "074");
  test.equal(f(date.local(2010, 10,  6)), "310");
  test.equal(f(date.local(2010, 10,  7)), "311"); // DST ends
  test.equal(f(date.local(2010, 10,  8)), "312");
  test.end();
});

tape("format(\"%m\")(date) formats zero-padded months", function(test) {
  var f = timeFormat.format("%m");
  test.equal(f(date.local(1990, 0, 1)), "01");
  test.equal(f(date.local(1990, 9, 1)), "10");
  test.end();
});

tape("format(\"%M\")(date) formats zero-padded minutes", function(test) {
  var f = timeFormat.format("%M");
  test.equal(f(date.local(1990, 0, 1, 0,  0)), "00");
  test.equal(f(date.local(1990, 0, 1, 0, 32)), "32");
  test.end();
});

tape("format(\"%p\")(date) formats AM or PM", function(test) {
  var f = timeFormat.format("%p");
  test.equal(f(date.local(1990, 0, 1,  0)), "AM");
  test.equal(f(date.local(1990, 0, 1, 13)), "PM");
  test.end();
});

tape("format(\"%S\")(date) formats zero-padded seconds", function(test) {
  var f = timeFormat.format("%S");
  test.equal(f(date.local(1990, 0, 1, 0, 0,  0)), "00");
  test.equal(f(date.local(1990, 0, 1, 0, 0, 32)), "32");
  var f = timeFormat.format("%0S");
  test.equal(f(date.local(1990, 0, 1, 0, 0,  0)), "00");
  test.equal(f(date.local(1990, 0, 1, 0, 0, 32)), "32");
  test.end();
});

tape("format(\"%_S\")(date) formats space-padded seconds", function(test) {
  var f = timeFormat.format("%_S");
  test.equal(f(date.local(1990, 0, 1, 0, 0,  0)), " 0");
  test.equal(f(date.local(1990, 0, 1, 0, 0,  3)), " 3");
  test.equal(f(date.local(1990, 0, 1, 0, 0, 32)), "32");
  test.end();
});

tape("format(\"-S\")(date) formats no-padded seconds", function(test) {
  var f = timeFormat.format("%-S");
  test.equal(f(date.local(1990, 0, 1, 0, 0,  0)), "0");
  test.equal(f(date.local(1990, 0, 1, 0, 0,  3)), "3");
  test.equal(f(date.local(1990, 0, 1, 0, 0, 32)), "32");
  test.end();
});

tape("format(\"%L\")(date) formats zero-padded milliseconds", function(test) {
  var f = timeFormat.format("%L");
  test.equal(f(date.local(1990, 0, 1, 0, 0, 0,   0)), "000");
  test.equal(f(date.local(1990, 0, 1, 0, 0, 0, 432)), "432");
  test.end();
});

tape("format(\"%U\")(date) formats zero-padded week numbers", function(test) {
  var f = timeFormat.format("%U");
  test.equal(f(date.local(1990,  0,  1,  0)), "00");
  test.equal(f(date.local(1990,  5,  1,  0)), "21");
  test.equal(f(date.local(2010,  2, 13, 23)), "10");
  test.equal(f(date.local(2010,  2, 14,  0)), "11"); // DST begins
  test.equal(f(date.local(2010,  2, 15,  0)), "11");
  test.equal(f(date.local(2010, 10,  6, 23)), "44");
  test.equal(f(date.local(2010, 10,  7,  0)), "45"); // DST ends
  test.equal(f(date.local(2010, 10,  8,  0)), "45");
  test.end();
});

tape("format(\"%x\")(date) formats localized dates", function(test) {
  var f = timeFormat.format("%x");
  test.equal(f(date.local(1990, 0, 1)), "01/01/1990");
  test.equal(f(date.local(2010, 5, 1)), "06/01/2010");
  test.end();
});

tape("format(\"%X\")(date) formats localized times", function(test) {
  var f = timeFormat.format("%X");
  test.equal(f(date.local(1990, 0, 1,  0,  0,  0)), "00:00:00");
  test.equal(f(date.local(1990, 0, 1, 13, 34, 59)), "13:34:59");
  test.end();
});

tape("format(\"%y\")(date) formats zero-padded two-digit years", function(test) {
  var f = timeFormat.format("%y");
  test.equal(f(date.local(+1990, 0, 1)), "90");
  test.equal(f(date.local(+2002, 0, 1)), "02");
  test.equal(f(date.local(-0002, 0, 1)), "02"); // unsigned year!
  test.end();
});

tape("format(\"%Y\")(date) formats zero-padded four-digit years", function(test) {
  var f = timeFormat.format("%Y");
  test.equal(f(date.local(  123, 0, 1)), "0123");
  test.equal(f(date.local( 1990, 0, 1)), "1990");
  test.equal(f(date.local( 2002, 0, 1)), "2002");
  test.equal(f(date.local(10002, 0, 1)), "0002");
  test.equal(f(date.local(   -2, 0, 1)), "0002"); // unsigned year!
  test.end();
});

tape("format(\"%+y\")(date) formats zero-padded signed two-digit years", function(test) {
  var f = timeFormat.format("%+y");
  test.equal(f(date.local(+1990, 0, 1)), "+90");
  test.equal(f(date.local(+2002, 0, 1)), "+02");
  test.equal(f(date.local(-0002, 0, 1)), "-02");
  test.end();
});

tape("format(\"%+Y\")(date) formats zero-padded signed four-digit years", function(test) {
  var f = timeFormat.format("%+Y");
  test.equal(f(date.local(  123, 0, 1)), "+0123");
  test.equal(f(date.local( 1990, 0, 1)), "+1990");
  test.equal(f(date.local( 2002, 0, 1)), "+2002");
  test.equal(f(date.local(10002, 0, 1)), "+0002");
  test.equal(f(date.local(   -2, 0, 1)), "-0002");
  test.end();
});

tape("format(\"%+_y\")(date) formats space-padded signed two-digit years", function(test) {
  var f = timeFormat.format("%+_y");
  test.equal(f(date.local(+1990, 0, 1)), "+90");
  test.equal(f(date.local(+2002, 0, 1)), " +2");
  test.equal(f(date.local(-0002, 0, 1)), " -2");
  test.end();
});

tape("format(\"%+_Y\")(date) formats space-padded signed four-digit years", function(test) {
  var f = timeFormat.format("%+_Y");
  test.equal(f(date.local(  123, 0, 1)), " +123");
  test.equal(f(date.local( 1990, 0, 1)), "+1990");
  test.equal(f(date.local( 2002, 0, 1)), "+2002");
  test.equal(f(date.local(10002, 0, 1)), "   +2");
  test.equal(f(date.local(   -2, 0, 1)), "   -2");
  test.end();
});

tape("format(\"%Z\")(date) formats time zones", function(test) {
  var f = timeFormat.format("%Z");
  test.equal(f(date.local(1990, 0, 1)), "-0800");
  test.end();
});

tape("format(\"%%\")(date) formats literal percent signs", function(test) {
  var f = timeFormat.format("%%");
  test.equal(f(date.local(1990, 0, 1)), "%");
  test.end();
});

tape("format(…) can be used to create a conditional multi-format", function(test) {
  test.equal(multi(date.local(1990, 0, 1, 0, 0, 0, 12)), ".012");
  test.equal(multi(date.local(1990, 0, 1, 0, 0, 1,  0)), ":01");
  test.equal(multi(date.local(1990, 0, 1, 0, 1, 0,  0)), "12:01");
  test.equal(multi(date.local(1990, 0, 1, 1, 0, 0,  0)), "01 AM");
  test.equal(multi(date.local(1990, 0, 2, 0, 0, 0,  0)), "Tue 02");
  test.equal(multi(date.local(1990, 1, 1, 0, 0, 0,  0)), "February");
  test.equal(multi(date.local(1990, 0, 1, 0, 0, 0,  0)), "1990");
  test.end();
});
