import isoFormat from "./src/isoFormat";
import locale from "./src/locale";

import caEs from "./src/locale/ca-ES.js";
import deDe from "./src/locale/de-DE.js";
import enCa from "./src/locale/en-CA.js";
import enGb from "./src/locale/en-GB.js";
import enUs from "./src/locale/en-US.js";
import esEs from "./src/locale/es-ES.js";
import fiFi from "./src/locale/fi-FI.js";
import frCa from "./src/locale/fr-CA.js";
import frFr from "./src/locale/fr-FR.js";
import heIl from "./src/locale/he-IL.js";
import itIt from "./src/locale/it-IT.js";
import mkMk from "./src/locale/mk-MK.js";
import nlNl from "./src/locale/nl-NL.js";
import plPl from "./src/locale/pl-PL.js";
import ptBr from "./src/locale/pt-BR.js";
import ruRu from "./src/locale/ru-RU.js";
import zhCn from "./src/locale/zh-CN.js";

var localeDefinitions = {
    "ca-ES": caEs,
    "de-DE": deDe,
    "en-CA": enCa,
    "en-GB": enGb,
    "en-US": enUs,
    "es-ES": esEs,
    "fi-FI": fiFi,
    "fr-CA": frCa,
    "fr-FR": frFr,
    "he-IL": heIl,
    "it-IT": itIt,
    "mk-MK": mkMk,
    "nl-NL": nlNl,
    "pl-PL": plPl,
    "pt-BR": ptBr,
    "ru-RU": ruRu,
    "zh-CN": zhCn
};

var defaultLocale = locale(enUs);
export var format = defaultLocale.format;
export var utcFormat = defaultLocale.utcFormat;

export function localeFormat(definition) {
  if (typeof definition === "string") {
    definition = localeDefinitions[definition];
    if (!definition) return null;
  }
  return locale(definition);
};

export {
  isoFormat
};
