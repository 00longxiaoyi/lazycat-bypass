import { surgePcConfig } from "../data/surgePcConfig";

const GENERAL_SECTION = "[General]";
const RULE_SECTION = "[Rule]";

type SurgePcProcessOptions = {
  lazycatIpv4?: string;
};

function findSectionIndex(lines: string[], sectionName: string) {
  const normalizedSection = sectionName.toLowerCase();
  return lines.findIndex((line) => line.trim().toLowerCase() === normalizedSection);
}

function findNextSectionIndex(lines: string[], startIndex: number) {
  const nextIndex = lines.findIndex((line, index) => index > startIndex && /^\s*\[[^\]]+\]\s*$/.test(line));
  return nextIndex === -1 ? lines.length : nextIndex;
}

function findKeyIndex(lines: string[], startIndex: number, endIndex: number, key: string) {
  const normalizedKey = key.toLowerCase();
  for (let index = startIndex + 1; index < endIndex; index += 1) {
    const match = lines[index].match(/^\s*([^=]+?)\s*=/);
    if (match?.[1].trim().toLowerCase() === normalizedKey) return index;
  }
  return -1;
}

function ensureSection(lines: string[], sectionName: string) {
  const existingIndex = findSectionIndex(lines, sectionName);
  if (existingIndex !== -1) return existingIndex;

  if (lines.length > 0 && lines[lines.length - 1].trim() !== "") lines.push("");
  lines.push(sectionName);
  return lines.length - 1;
}

function insertRulesAtTop(lines: string[], ruleStart: number, rules: string[]) {
  const ruleEnd = findNextSectionIndex(lines, ruleStart);
  const existingRules = new Set(
    lines
      .slice(ruleStart + 1, ruleEnd)
      .map((line) => line.trim().toLowerCase())
      .filter(Boolean)
  );
  const rulesToInsert = rules.filter((rule) => !existingRules.has(rule.toLowerCase()));

  if (rulesToInsert.length > 0) {
    lines.splice(ruleStart + 1, 0, ...rulesToInsert);
  }
}

function normalizeAppendValue(value: string) {
  return value.replace(/^%APPEND%\s*/i, "").trim().toLowerCase();
}

function mergeCommaValues(existingValue: string, valuesToAdd: string[]) {
  const existingValues = existingValue
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  const normalizedValues = new Set(existingValues.map(normalizeAppendValue));

  for (const value of valuesToAdd) {
    if (!normalizedValues.has(normalizeAppendValue(value))) {
      existingValues.push(value);
      normalizedValues.add(normalizeAppendValue(value));
    }
  }

  return existingValues.join(", ");
}

function upsertCommaList(lines: string[], sectionStart: number, sectionEnd: number, key: string, values: string[]) {
  const keyIndex = findKeyIndex(lines, sectionStart, sectionEnd, key);
  if (keyIndex === -1) {
    lines.splice(sectionStart + 1, 0, `${key} = ${values.join(", ")}`);
    return;
  }

  const [, prefix = `${key} = `, existingValue = ""] = lines[keyIndex].match(/^(\s*[^=]+?\s*=\s*)(.*)$/) ?? [];
  lines[keyIndex] = `${prefix}${mergeCommaValues(existingValue, values)}`;
}

function upsertValue(lines: string[], sectionStart: number, sectionEnd: number, key: string, value: string) {
  const keyIndex = findKeyIndex(lines, sectionStart, sectionEnd, key);
  if (keyIndex === -1) {
    lines.splice(sectionStart + 1, 0, `${key} = ${value}`);
    return;
  }

  const [, prefix = `${key} = `] = lines[keyIndex].match(/^(\s*[^=]+?\s*=\s*).*$/) ?? [];
  lines[keyIndex] = `${prefix}${value}`;
}

function ensureGeneral(lines: string[], generalStart: number, options: SurgePcProcessOptions) {
  for (const item of surgePcConfig.general.values) {
    const generalEnd = findNextSectionIndex(lines, generalStart);
    upsertValue(lines, generalStart, generalEnd, item.key, item.value);
  }

  for (const item of surgePcConfig.general.appendValues) {
    const generalEnd = findNextSectionIndex(lines, generalStart);
    const values = options.lazycatIpv4 && ["skip-proxy", "tun-excluded-routes"].includes(item.key)
      ? [...item.values, `${options.lazycatIpv4}/32`]
      : item.values;
    upsertCommaList(lines, generalStart, generalEnd, item.key, values);
  }
}

export function processSurgePcConfig(configText: string, options: SurgePcProcessOptions = {}) {
  const lines = configText.replace(/\r\n/g, "\n").split("\n");

  const generalStart = ensureSection(lines, GENERAL_SECTION);
  ensureGeneral(lines, generalStart, options);

  const ruleStart = ensureSection(lines, RULE_SECTION);
  const rules = options.lazycatIpv4
    ? [`IP-CIDR,${options.lazycatIpv4}/32,DIRECT,no-resolve`, ...surgePcConfig.rules]
    : surgePcConfig.rules;
  insertRulesAtTop(lines, ruleStart, rules);

  return lines.join("\n").trimEnd();
}
