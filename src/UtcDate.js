var date = Date,
    proto = date.prototype;

function utcDate() {
  this._ = new date(arguments.length > 1 ? date.UTC.apply(this, arguments) : arguments[0]);
}

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
  setDate: function() { return proto.setUTCDate.apply(this._, arguments); },
  setDay: function() { return proto.setUTCDay.apply(this._, arguments); },
  setFullYear: function() { return proto.setUTCFullYear.apply(this._, arguments); },
  setHours: function() { return proto.setUTCHours.apply(this._, arguments); },
  setMilliseconds: function() { return proto.setUTCMilliseconds.apply(this._, arguments); },
  setMinutes: function() { return proto.setUTCMinutes.apply(this._, arguments); },
  setMonth: function() { return proto.setUTCMonth.apply(this._, arguments); },
  setSeconds: function() { return proto.setUTCSeconds.apply(this._, arguments); },
  setTime: function() { return proto.setTime.apply(this._, arguments); }
};

export default utcDate;
