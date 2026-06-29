import shadowrocketIosRules from "../data/shadowrocket-ios-rules.json";
import shadowrocketPcRules from "../data/shadowrocket-pc-rules.json";

const GENERAL_SECTION = "[General]";
const RULE_SECTION = "[Rule]";

const ALWAYS_REAL_IP_VALUES = ["*.heiyu.space", "*.lazycat.cloud"];
const PC_SKIP_PROXY_VALUES = ["6.6.6.6/32", "2000::6666/128", "fc00::/7", "fc03:1136:3800::/40"];
const PC_TUN_EXCLUDED_ROUTES_VALUES = ["6.6.6.6/32", "2000::6666/128", "fc00::/7", "fc03:1136:3800::/40"];
const IOS_SKIP_PROXY_VALUES = ["6.6.6.6/32", "2000::6666/128"];
const IOS_TUN_EXCLUDED_ROUTES_VALUES = ["6.6.6.6/32", "2000::6666/128"];

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

function mergeCommaValues(existingValue: string, valuesToAdd: string[]) {
  const existingValues = existingValue
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  const normalized = new Set(existingValues.map((value) => value.toLowerCase()));

  for (const value of valuesToAdd) {
    if (!normalized.has(value.toLowerCase())) {
      existingValues.push(value);
      normalized.add(value.toLowerCase());
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

  const [, prefix = `${key} =`, existingValue = ""] = lines[keyIndex].match(/^(\s*[^=]+?\s*=\s*)(.*)$/) ?? [];
  lines[keyIndex] = `${prefix}${mergeCommaValues(existingValue, values)}`;
}

function upsertValue(lines: string[], sectionStart: number, sectionEnd: number, key: string, value: string) {
  const keyIndex = findKeyIndex(lines, sectionStart, sectionEnd, key);
  if (keyIndex === -1) {
    lines.splice(sectionStart + 1, 0, `${key} = ${value}`);
    return;
  }

  const [, prefix = `${key} =`] = lines[keyIndex].match(/^(\s*[^=]+?\s*=\s*).*$/) ?? [];
  lines[keyIndex] = `${prefix}${value}`;
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

function processShadowrocketConfig(configText: string, options: { rules: string[]; skipProxyValues: string[]; tunExcludedRoutesValues: string[]; enableIpv6Vif: boolean }) {
  const lines = configText.replace(/\r\n/g, "\n").split("\n");

  const generalStart = ensureSection(lines, GENERAL_SECTION);
  let generalEnd = findNextSectionIndex(lines, generalStart);
  upsertCommaList(lines, generalStart, generalEnd, "tun-excluded-routes", options.tunExcludedRoutesValues);
  if (options.enableIpv6Vif) {
    generalEnd = findNextSectionIndex(lines, generalStart);
    upsertValue(lines, generalStart, generalEnd, "ipv6-vif", "auto");
  }
  generalEnd = findNextSectionIndex(lines, generalStart);
  upsertValue(lines, generalStart, generalEnd, "ipv6", "true");
  generalEnd = findNextSectionIndex(lines, generalStart);
  upsertCommaList(lines, generalStart, generalEnd, "skip-proxy", options.skipProxyValues);
  generalEnd = findNextSectionIndex(lines, generalStart);
  upsertCommaList(lines, generalStart, generalEnd, "always-real-ip", ALWAYS_REAL_IP_VALUES);

  const ruleStart = ensureSection(lines, RULE_SECTION);
  insertRulesAtTop(lines, ruleStart, options.rules);

  return lines.join("\n").trimEnd();
}

export function processShadowrocketIosConfig(configText: string) {
  return processShadowrocketConfig(configText, {
    rules: shadowrocketIosRules,
    skipProxyValues: IOS_SKIP_PROXY_VALUES,
    tunExcludedRoutesValues: IOS_TUN_EXCLUDED_ROUTES_VALUES,
    enableIpv6Vif: false
  });
}

export function processShadowrocketPcConfig(configText: string) {
  return processShadowrocketConfig(configText, {
    rules: shadowrocketPcRules,
    skipProxyValues: PC_SKIP_PROXY_VALUES,
    tunExcludedRoutesValues: PC_TUN_EXCLUDED_ROUTES_VALUES,
    enableIpv6Vif: true
  });
}
