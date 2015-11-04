import locale from "./src/locale";
import caEs from "./src/locale/ca-ES.js";
import deCh from "./src/locale/de-CH.js";
import deDe from "./src/locale/de-DE.js";
import enCa from "./src/locale/en-CA.js";
import enGb from "./src/locale/en-GB.js";
import enUs from "./src/locale/en-US.js";
import esEs from "./src/locale/es-ES.js";
import fiFi from "./src/locale/fi-FI.js";
import frCa from "./src/locale/fr-CA.js";
import frFr from "./src/locale/fr-FR.js";
import heIl from "./src/locale/he-IL.js";
import huHu from "./src/locale/hu-HU.js";
import itIt from "./src/locale/it-IT.js";
import jaJp from "./src/locale/ja-JP.js";
import koKr from "./src/locale/ko-KR.js";
import mkMk from "./src/locale/mk-MK.js";
import nlNl from "./src/locale/nl-NL.js";
import plPl from "./src/locale/pl-PL.js";
import ptBr from "./src/locale/pt-BR.js";
import ruRu from "./src/locale/ru-RU.js";
import svSe from "./src/locale/sv-SE.js";
import zhCn from "./src/locale/zh-CN.js";

var localeDefinitions = {
  "ca-ES": caEs,
  "de-CH": deCh,
  "de-DE": deDe,
  "en-CA": enCa,
  "en-GB": enGb,
  "en-US": enUs,
  "es-ES": esEs,
  "fi-FI": fiFi,
  "fr-CA": frCa,
  "fr-FR": frFr,
  "he-IL": heIl,
  "hu-HU": huHu,
  "it-IT": itIt,
  "ja-JP": jaJp,
  "ko-KR": koKr,
  "mk-MK": mkMk,
  "nl-NL": nlNl,
  "pl-PL": plPl,
  "pt-BR": ptBr,
  "ru-RU": ruRu,
  "sv-SE": svSe,
  "zh-CN": zhCn
};

var defaultLocale = locale(enUs);
export var format = defaultLocale.format;
export var utcFormat = defaultLocale.utcFormat;

export function localeFormat(definition) {
  if (typeof definition === "string") {
    if (!localeDefinitions.hasOwnProperty(definition)) return null;
    definition = localeDefinitions[definition];
  }
  return locale(definition);
};

export {default as isoFormat} from "./src/isoFormat";
