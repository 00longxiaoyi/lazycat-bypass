export const surgePcConfig = {
  general: {
    values: [
      { key: "block-quic", value: "always-allow" },
      { key: "udp-policy-not-supported-behaviour", value: "DIRECT" },
      { key: "ipv6", value: "true" },
      { key: "ipv6-vif", value: "auto" }
    ],
    appendValues: [
      { key: "always-real-ip", values: ["*.heiyu.space", "*.lazycat.cloud"] },
      { key: "skip-proxy", values: ["6.6.6.6/32", "2000::6666/128", "fc00::/7", "fc03:1136:3800::/40"] },
      { key: "tun-excluded-routes", values: ["6.6.6.6/32", "2000::6666/128", "fc00::/7", "fc03:1136:3800::/40"] }
    ]
  },
  rules: [
    "PROCESS-NAME,/Applications/懒猫微服.app/,DIRECT",
    "DOMAIN-SUFFIX,heiyu.space,DIRECT",
    "DOMAIN-SUFFIX,lazycat.cloud,DIRECT",
    "IP-CIDR,6.6.6.6/32,DIRECT,no-resolve",
    "IP-CIDR6,2000::6666/128,DIRECT,no-resolve",
    "IP-CIDR6,fc03:1136:3800::/40,DIRECT,no-resolve"
  ]
};

export const surgePcConfigSnippet = [
  "[General]",
  ...surgePcConfig.general.values.map((item) => `${item.key} = ${item.value}`),
  ...surgePcConfig.general.appendValues.map((item) => `${item.key} = %APPEND% ${item.values.join(", ")}`),
  "",
  "[Rule]",
  ...surgePcConfig.rules
].join("\n");
