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
import jaJp from "./src/locale/ja-JP.js";
import mkMk from "./src/locale/mk-MK.js";
import nlNl from "./src/locale/nl-NL.js";
import plPl from "./src/locale/pl-PL.js";
import ptBr from "./src/locale/pt-BR.js";
import ruRu from "./src/locale/ru-RU.js";
import zhCn from "./src/locale/zh-CN.js";

var localeDefinitions = (new Map)
    .set("ca-ES", caEs)
    .set("de-DE", deDe)
    .set("en-CA", enCa)
    .set("en-GB", enGb)
    .set("en-US", enUs)
    .set("es-ES", esEs)
    .set("fi-FI", fiFi)
    .set("fr-CA", frCa)
    .set("fr-FR", frFr)
    .set("he-IL", heIl)
    .set("it-IT", itIt)
    .set("ja-JP", jaJp)
    .set("mk-MK", mkMk)
    .set("nl-NL", nlNl)
    .set("pl-PL", plPl)
    .set("pt-BR", ptBr)
    .set("ru-RU", ruRu)
    .set("zh-CN", zhCn);

var defaultLocale = locale(enUs);
export var format = defaultLocale.format;
export var utcFormat = defaultLocale.utcFormat;

export function localeFormat(definition) {
  if (typeof definition === "string") {
    definition = localeDefinitions.get(definition);
    if (!definition) return null;
  }
  return locale(definition);
};

export {
  isoFormat
};
