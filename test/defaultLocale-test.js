import assert from "assert";
import * as d3 from "../src/index.js";
import {readFileSync} from "fs";

const enUs = JSON.parse(readFileSync("./locale/en-US.json"));
const frFr = JSON.parse(readFileSync("./locale/fr-FR.json"));

it("d3.timeFormat(specifier) defaults to en-US", () => {
  assert.strictEqual(d3.timeFormat("%c")(new Date(2000, 0, 1)), "1/1/2000, 12:00:00 AM");
});

it("d3.timeParse(specifier) defaults to en-US", () => {
  assert.strictEqual(+d3.timeParse("%c")("1/1/2000, 12:00:00 AM"), +new Date(2000, 0, 1));
});

it("d3.utcFormat(specifier) defaults to en-US", () => {
  assert.strictEqual(d3.utcFormat("%c")(new Date(Date.UTC(2000, 0, 1))), "1/1/2000, 12:00:00 AM");
});

it("d3.utcParse(specifier) defaults to en-US", () => {
  assert.strictEqual(+d3.utcParse("%c")("1/1/2000, 12:00:00 AM"), +new Date(Date.UTC(2000, 0, 1)));
});

it("d3.timeFormatDefaultLocale(definition) returns the new default locale", () => {
  const locale = d3.timeFormatDefaultLocale(frFr);
  try {
    assert.strictEqual(locale.format("%c")(new Date(2000, 0, 1)), "samedi  1 janvier 2000 à 00:00:00");
} finally {
    d3.timeFormatDefaultLocale(enUs);
  }
});

it("d3.timeFormatDefaultLocale(definition) affects d3.timeFormat", () => {
  const locale = d3.timeFormatDefaultLocale(frFr);
  try {
    assert.strictEqual(d3.timeFormat, locale.format);
    assert.strictEqual(d3.timeFormat("%c")(new Date(2000, 0, 1)), "samedi  1 janvier 2000 à 00:00:00");
} finally {
    d3.timeFormatDefaultLocale(enUs);
  }
});

it("d3.timeFormatDefaultLocale(definition) affects d3.timeParse", () => {
  const locale = d3.timeFormatDefaultLocale(frFr);
  try {
    assert.strictEqual(d3.timeParse, locale.parse);
    assert.strictEqual(+d3.timeParse("%c")("samedi  1 janvier 2000 à 00:00:00"), +new Date(2000, 0, 1));
} finally {
    d3.timeFormatDefaultLocale(enUs);
  }
});

it("d3.timeFormatDefaultLocale(definition) affects d3.utcFormat", () => {
  const locale = d3.timeFormatDefaultLocale(frFr);
  try {
    assert.strictEqual(d3.utcFormat, locale.utcFormat);
    assert.strictEqual(d3.utcFormat("%c")(new Date(Date.UTC(2000, 0, 1))), "samedi  1 janvier 2000 à 00:00:00");
} finally {
    d3.timeFormatDefaultLocale(enUs);
  }
});

it("d3.timeFormatDefaultLocale(definition) affects d3.utcParse", () => {
  const locale = d3.timeFormatDefaultLocale(frFr);
  try {
    assert.strictEqual(d3.utcParse, locale.utcParse);
    assert.strictEqual(+d3.utcParse("%c")("samedi  1 janvier 2000 à 00:00:00"), +new Date(Date.UTC(2000, 0, 1)));
} finally {
    d3.timeFormatDefaultLocale(enUs);
  }
});
