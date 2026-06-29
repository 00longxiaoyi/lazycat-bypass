const PROXY_SECTION = "[Proxy]";
const GENERAL_SECTION = "[General]";
const RULE_SECTION = "[Rule]";

const LAZYCAT_PROXY = "Lazycat = socks5, 127.0.0.1, 31086";
const ALWAYS_REAL_IP_VALUES = ["*.heiyu.space", "*.lazycat.cloud"];
const SKIP_PROXY_VALUES = ["6.6.6.6/32", "2000::6666/128", "fc00::/7", "fc03:1136:3800::/40"];
const TUN_EXCLUDED_ROUTES_VALUES = ["6.6.6.6/32", "2000::6666/128", "fc00::/7", "fc03:1136:3800::/40"];
const LAZYCAT_RULES = [
  "DOMAIN-SUFFIX,heiyu.space,Lazycat",
  "DOMAIN-SUFFIX,lazycat.cloud,DIRECT",
  "IP-CIDR,6.6.6.6/32,DIRECT,no-resolve",
  "IP-CIDR6,2000::6666/128,DIRECT,no-resolve",
  "IP-CIDR6,fc03:1136:3800::/40,DIRECT,no-resolve"
];

export type SurgeProcessResult = {
  config: string;
  addedProxy: boolean;
  addedRules: number;
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

function normalizeValue(value: string) {
  return value.trim().toLowerCase();
}

function normalizeRule(rule: string) {
  return rule.replace(/\s+/g, "").toLowerCase();
}

function ensureSection(lines: string[], sectionName: string) {
  const existingIndex = findSectionIndex(lines, sectionName);
  if (existingIndex !== -1) return existingIndex;

  if (lines.length > 0 && lines[lines.length - 1].trim() !== "") lines.push("");
  lines.push(sectionName);
  return lines.length - 1;
}

function mergeCommaValues(existingValue: string, valuesToAdd: string[]) {
  const existingValues = existingValue
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  const normalizedValues = new Set(existingValues.map(normalizeValue));

  for (const value of valuesToAdd) {
    if (!normalizedValues.has(normalizeValue(value))) {
      existingValues.push(value);
      normalizedValues.add(normalizeValue(value));
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

function ensureProxy(lines: string[], proxyStart: number) {
  const proxyEnd = findNextSectionIndex(lines, proxyStart);
  const existingProxyIndex = findKeyIndex(lines, proxyStart, proxyEnd, "Lazycat");
  if (existingProxyIndex !== -1) return false;

  lines.splice(proxyStart + 1, 0, LAZYCAT_PROXY);
  return true;
}

function ensureGeneral(lines: string[], generalStart: number) {
  let generalEnd = findNextSectionIndex(lines, generalStart);
  upsertCommaList(lines, generalStart, generalEnd, "tun-excluded-routes", TUN_EXCLUDED_ROUTES_VALUES);
  generalEnd = findNextSectionIndex(lines, generalStart);
  upsertValue(lines, generalStart, generalEnd, "ipv6-vif", "auto");
  generalEnd = findNextSectionIndex(lines, generalStart);
  upsertValue(lines, generalStart, generalEnd, "ipv6", "true");
  generalEnd = findNextSectionIndex(lines, generalStart);
  upsertCommaList(lines, generalStart, generalEnd, "skip-proxy", SKIP_PROXY_VALUES);
  generalEnd = findNextSectionIndex(lines, generalStart);
  upsertCommaList(lines, generalStart, generalEnd, "always-real-ip", ALWAYS_REAL_IP_VALUES);
  generalEnd = findNextSectionIndex(lines, generalStart);
  upsertValue(lines, generalStart, generalEnd, "compatibility-mode", "5");
}

function insertRulesAtTop(lines: string[], ruleStart: number) {
  const ruleEnd = findNextSectionIndex(lines, ruleStart);
  const existingRules = new Set(
    lines
      .slice(ruleStart + 1, ruleEnd)
      .map((line) => line.trim())
      .filter(Boolean)
      .map(normalizeRule)
  );
  const rulesToInsert = LAZYCAT_RULES.filter((rule) => !existingRules.has(normalizeRule(rule)));
  if (rulesToInsert.length === 0) return 0;

  lines.splice(ruleStart + 1, 0, ...rulesToInsert);
  return rulesToInsert.length;
}

export function processSurgeConfig(configText: string): SurgeProcessResult {
  const lines = configText.replace(/\r\n/g, "\n").split("\n");

  const proxyStart = ensureSection(lines, PROXY_SECTION);
  const addedProxy = ensureProxy(lines, proxyStart);

  const generalStart = ensureSection(lines, GENERAL_SECTION);
  ensureGeneral(lines, generalStart);

  const ruleStart = ensureSection(lines, RULE_SECTION);
  const addedRules = insertRulesAtTop(lines, ruleStart);

  return {
    config: lines.join("\n").trimEnd() + "\n",
    addedProxy,
    addedRules
  };
}
