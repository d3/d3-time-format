exports.local = function(year, month, day, hours, minutes, seconds, milliseconds) {
  if (!year) year = 0;
  if (!month) month = 0;
  if (!day) day = 0;
  if (!hours) hours = 0;
  if (!minutes) minutes = 0;
  if (!seconds) seconds = 0;
  if (!milliseconds) milliseconds = 0;
  if (0 <= year && year < 100) {
    var date = new Date(-1, month, day, hours, minutes, seconds, milliseconds);
    date.setFullYear(year);
    return date;
  }
  return new Date(year, month, day, hours, minutes, seconds, milliseconds);
};

exports.utc = function(year, month, day, hours, minutes, seconds, milliseconds) {
  if (!year) year = 0;
  if (!month) month = 0;
  if (!day) day = 0;
  if (!hours) hours = 0;
  if (!minutes) minutes = 0;
  if (!seconds) seconds = 0;
  if (!milliseconds) milliseconds = 0;
  if (0 <= year && year < 100) {
    var date = new Date(Date.UTC(-1, month, day, hours, minutes, seconds, milliseconds));
    date.setUTCFullYear(year);
    return date;
  }
  return new Date(Date.UTC(year, month, day, hours, minutes, seconds, milliseconds));
};
