var tape = require("tape");

tape.Test.prototype.dateEqual = function(actual, expected) {
  this._assert(actual instanceof Date && expected instanceof Date && (+actual === +expected), {
    message: "should be equal",
    operator: "dateEqual",
    actual: actual,
    expected: expected
  });
};
