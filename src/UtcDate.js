function utcDate() {
  this._ = new Date(arguments.length > 1 ? Date.UTC.apply(this, arguments) : arguments[0]);
}

var datePrototype = Date.prototype;

utcDate.prototype = {
  getDate: function() { return this._.getUTCDate(); },
  getDay: function() { return this._.getUTCDay(); },
  getFullYear: function() { return this._.getUTCFullYear(); },
  getHours: function() { return this._.getUTCHours(); },
  getMilliseconds: function() { return this._.getUTCMilliseconds(); },
  getMinutes: function() { return this._.getUTCMinutes(); },
  getMonth: function() { return this._.getUTCMonth(); },
  getSeconds: function() { return this._.getUTCSeconds(); },
  getTime: function() { return this._.getTime(); },
  getTimezoneOffset: function() { return 0; },
  valueOf: function() { return this._.valueOf(); },
  setDate: function() { return datePrototype.setUTCDate.apply(this._, arguments); },
  setDay: function() { return datePrototype.setUTCDay.apply(this._, arguments); },
  setFullYear: function() { return datePrototype.setUTCFullYear.apply(this._, arguments); },
  setHours: function() { return datePrototype.setUTCHours.apply(this._, arguments); },
  setMilliseconds: function() { return datePrototype.setUTCMilliseconds.apply(this._, arguments); },
  setMinutes: function() { return datePrototype.setUTCMinutes.apply(this._, arguments); },
  setMonth: function() { return datePrototype.setUTCMonth.apply(this._, arguments); },
  setSeconds: function() { return datePrototype.setUTCSeconds.apply(this._, arguments); },
  setTime: function() { return datePrototype.setTime.apply(this._, arguments); }
};

export default utcDate;
