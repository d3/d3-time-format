import isoFormat from "./src/isoFormat";
import locale from "./src/locale/en-US";
import localeFormat from "./src/localeFormat";

export var format = locale.format;
export var utcFormat = locale.utcFormat;

export {
  isoFormat,
  localeFormat
};
