import { isMap, isScalar, isSeq, parseDocument, type Scalar, type YAMLSeq } from "yaml";

const LAZYCAT_RULES = [
  "DOMAIN-SUFFIX,heiyu.space,DIRECT",
  "DOMAIN-SUFFIX,lazycat.cloud,DIRECT",
  "IP-CIDR,6.6.6.6/32,DIRECT,no-resolve",
  "IP-CIDR6,2000::6666/128,DIRECT,no-resolve",
  "IP-CIDR6,fc03:1136:3800::/40,DIRECT,no-resolve"
];

const LAZYCAT_TUN_EXCLUDES = ["6.6.6.6/32", "2000::6666/128", "fc00::/7", "fc03:1136:3800::/40"];

export type ClashProcessResult = {
  yaml: string;
  addedRules: number;
  addedTunExcludes: number;
  enabledDnsIpv6: boolean;
};

type StringSeq = YAMLSeq<Scalar<string>>;

function normalize(value: unknown) {
  return String(value).replace(/\s+/g, "").toLowerCase();
}

function getNodeValue(value: unknown) {
  return isScalar(value) ? value.value : value;
}

function toStringSeq(value: unknown, fallback: unknown): StringSeq {
  return (isSeq(value) ? value : fallback) as unknown as StringSeq;
}

export function processClashConfig(input: string): ClashProcessResult {
  const document = parseDocument(input, { keepSourceTokens: true });

  if (document.errors.length > 0) {
    throw new Error(document.errors[0]?.message ?? "配置处理失败，请检查 YAML 格式");
  }

  if (!isMap(document.contents)) {
    throw new Error("配置内容不是有效的 Clash YAML 对象");
  }

  const rulesNode = document.get("rules", true);
  const rules = toStringSeq(rulesNode, document.createNode([]));
  const existingRules = new Set(rules.items.map((item) => normalize(getNodeValue(item))));
  const rulesToAdd = LAZYCAT_RULES.filter((rule) => !existingRules.has(normalize(rule)));
  rules.items.unshift(...rulesToAdd.map((rule) => document.createNode(rule)));

  if (!isSeq(rulesNode)) {
    document.set("rules", rules);
  }

  let addedTunExcludes = 0;
  let enabledDnsIpv6 = false;
  const tunNode = document.get("tun", true);
  const dnsNode = document.get("dns", true);

  if (isMap(dnsNode) && dnsNode.get("enable") === true && dnsNode.get("ipv6") !== true) {
    dnsNode.set("ipv6", true);
    enabledDnsIpv6 = true;
  }

  if (isMap(tunNode) && tunNode.get("enable") === true) {
    const excludesNode = tunNode.get("route-exclude-address", true);
    const excludes = toStringSeq(excludesNode, document.createNode([]));
    const existingExcludes = new Set(excludes.items.map((item) => normalize(getNodeValue(item))));
    const excludesToAdd = LAZYCAT_TUN_EXCLUDES.filter((exclude) => !existingExcludes.has(normalize(exclude)));
    excludes.items.unshift(...excludesToAdd.map((exclude) => document.createNode(exclude)));

    if (!isSeq(excludesNode)) {
      tunNode.set("route-exclude-address", excludes);
    }

    addedTunExcludes = excludesToAdd.length;
  }

  return {
    yaml: document.toString({ lineWidth: 0 }).trimEnd() + "\n",
    addedRules: rulesToAdd.length,
    addedTunExcludes,
    enabledDnsIpv6
  };
}
