import type { ProxyApp, ProxyStatus } from "../types/proxy";
import clashRules from "./clash-rules.json";
import shadowrocketIosRules from "./shadowrocket-ios-rules.json";
import shadowrocketPcRules from "./shadowrocket-pc-rules.json";
import surgeIosRules from "./surge-ios-rules.json";
import { surgePcConfigSnippet } from "./surgePcConfig";
import singBoxRouteConfig from "./sing-box-route-config.json";
import v2rayaNRouteConfig from "./v2rayaN-route-config.json";

const clashSteps = ["导入配置", "合并配置", "使用合并之后的配置"];

const v2rayNRouteConfigText = JSON.stringify(v2rayaNRouteConfig, null, 2);
const singBoxRouteConfigText = JSON.stringify(singBoxRouteConfig, null, 2);


export const proxyApps: ProxyApp[] = [
  {
    id: "clash",
    name: "Clash Part",
    shortName: "C",
    color: "bg-blue-600",
    icon: "clashParty",
    status: "recommended",
    category: "clash",
    recommendedVersion: "1.9.5及以上版本",
    platforms: ["macos", "windows"],
    summary: {
      desktop: "优先支持。桌面端通过生成懒猫放行版 YAML，保留原节点和代理组，只追加直连规则。",
      mobile: "移动端按 Clash 系客户端规则导入直连片段，避免懒猫流量被第三方代理接管。"
    },
    steps: {
      desktop: clashSteps,
      mobile: clashSteps
    },
    rules: clashRules
  },
  {
    id: "clash-mi",
    name: "Clash MI",
    shortName: "MI",
    color: "bg-sky-600",
    icon: "clashMi",
    status: "recommended",
    category: "clash",
    recommendedVersion: "1.0.25.1100及以上版本",
    platforms: ["macos", "windows"],
    summary: {
      desktop: "PC 端通过添加覆写脚本订阅地址来完成直连配置。",
      mobile: "移动端按 Clash 系客户端规则导入直连片段，避免懒猫流量被第三方代理接管。"
    },
    steps: {
      desktop: ["添加覆写脚本"],
      mobile: clashSteps
    },
    rules: clashRules
  },
  {
    id: "clash-verge",
    name: "Clash Verge",
    shortName: "CV",
    color: "bg-indigo-600",
    icon: "clashVerge",
    status: "recommended",
    category: "clash",
    platforms: ["macos", "windows"],
    summary: {
      desktop: "Clash Verge PC 端通过修改覆写脚本追加懒猫直连规则。",
      mobile: "Clash Verge 没有移动端主流程。"
    },
    steps: {
      desktop: ["导入脚本"],
      mobile: []
    },
    rules: {
      desktop: clashRules.desktop,
      mobile: []
    }
  },
  {
    id: "flclash",
    name: "FlClash",
    shortName: "FC",
    color: "bg-teal-600",
    icon: "flclash",
    status: "recommended",
    category: "clash",
    platforms: ["macos", "windows", "android"],
    summary: {
      desktop: "FlClash 支持 Clash / Mihomo 配置，可通过修改配置文件或覆写脚本追加懒猫直连规则。",
      mobile: "FlClash 移动端可按 Clash 系配置方式导入懒猫直连规则，避免懒猫流量被代理接管。"
    },
    steps: {
      desktop: clashSteps,
      mobile: clashSteps
    },
    rules: clashRules
  },
  {
    id: "clash-meta",
    name: "Clash Meta",
    shortName: "CM",
    color: "bg-indigo-600",
    icon: "clashMeta",
    status: "recommended",
    category: "clash",
    platforms: ["android"],
    summary: {
      desktop: "Clash Meta 没有桌面端主流程。",
      mobile: "Android 端按 Clash / Mihomo 规则片段导入懒猫直连配置。"
    },
    steps: {
      desktop: [],
      mobile: ["排除应用"]
    },
    rules: {
      desktop: [],
      mobile: clashRules.mobile
    }
  },
  {
    id: "surfboard",
    name: "Surfboard",
    shortName: "SB",
    color: "bg-cyan-700",
    icon: "surfboard",
    status: "supported",
    category: "rule",
    platforms: ["android"],
    summary: {
      desktop: "Surfboard 没有桌面端主流程。",
      mobile: "Android 端通过排除应用避免懒猫流量被 Surfboard 代理接管。"
    },
    steps: {
      desktop: [],
      mobile: ["排除应用"]
    },
    rules: {
      desktop: [],
      mobile: []
    }
  },
  {
    id: "karing",
    name: "Karing",
    shortName: "K",
    color: "bg-violet-600",
    icon: "karing",
    status: "supported",
    category: "rule",
    platforms: ["android"],
    summary: {
      desktop: "Karing 没有桌面端主流程。",
      mobile: "Android 端通过排除应用避免懒猫流量被 Karing 代理接管。"
    },
    steps: {
      desktop: [],
      mobile: ["排除应用"]
    },
    rules: {
      desktop: [],
      mobile: []
    }
  },
  {
    id: "surge",
    name: "Surge",
    shortName: "S",
    color: "bg-slate-900",
    icon: "surge",
    status: "supported",
    category: "rule",
    platforms: ["macos", "ios"],
    summary: {
      desktop: "PC 端支持上传现有配置，自动生成新的 Surge 配置文件。",
      mobile: "iOS 端通过内置步骤导入初始配置、最终配置和模块。"
    },
    steps: {
      desktop: ["上传配置文件", "下载新配置文件"],
      mobile: ["确认现有配置", "导入初始配置", "导入最终配置", "添加模块"]
    },
    rules: {
      desktop: surgePcConfigSnippet.split("\n"),
      mobile: surgeIosRules
    }
  },
  {
    id: "shadowrocket",
    name: "Shadowrocket",
    shortName: "SR",
    color: "bg-orange-500",
    icon: "shadowrocket",
    status: "manual",
    category: "rule",
    platforms: ["macos", "ios"],
    summary: {
      desktop: "PC 端可复制 Shadowrocket 规则片段，放入配置的规则区域，避免懒猫流量被代理接管。",
      mobile: "iOS 同时只能一个 VPN，方案是让 Shadowrocket 规则直接放行懒猫流量。"
    },
    steps: {
      desktop: ["上传配置文件", "下载新配置文件"],
      mobile: ["创建独立节点", "输入配置文件", "使用新配置文件"]
    },
    rules: {
      desktop: shadowrocketPcRules,
      mobile: shadowrocketIosRules
    }
  },
  {
    id: "quantumultx",
    name: "Quantumult X",
    shortName: "QX",
    color: "bg-cyan-700",
    status: "manual",
    category: "rule",
    platforms: ["macos", "windows"],
    summary: {
      desktop: "Quantumult X 没有桌面端主流程。",
      mobile: "以规则片段和教程引导为主，懒猫规则需要放在兜底策略前。"
    },
    steps: {
      desktop: [],
      mobile: ["复制 Quantumult X 规则片段", "粘贴到分流规则区域", "确保懒猫规则优先于兜底规则", "保存并重新连接"]
    },
    rules: {
      desktop: [],
      mobile: ["host-suffix, heiyu.space, direct", "host-suffix, lazycat.cloud, direct", "ip-cidr, 6.6.6.6/32, direct", "ip6-cidr, fc03:1136:3800::/40, direct"]
    }
  },
  {
    id: "loon",
    name: "Loon",
    shortName: "L",
    color: "bg-violet-600",
    status: "supported",
    category: "rule",
    platforms: ["macos", "windows"],
    summary: {
      desktop: "Loon 没有桌面端主流程。",
      mobile: "可提供规则片段或插件形式，优先把懒猫流量标记为 DIRECT。"
    },
    steps: {
      desktop: [],
      mobile: ["导入懒猫规则片段", "确认规则优先级", "保留原有代理策略", "重新连接后验证"]
    },
    rules: {
      desktop: [],
      mobile: ["DOMAIN-SUFFIX,heiyu.space,DIRECT", "DOMAIN-SUFFIX,lazycat.cloud,DIRECT", "IP-CIDR,6.6.6.6/32,DIRECT", "IP-CIDR6,fc03:1136:3800::/40,DIRECT"]
    }
  },
  {
    id: "v2rayn",
    name: "v2rayN",
    shortName: "VN",
    color: "bg-sky-500",
    icon: "v2rayaN",
    status: "limited",
    category: "route",
    recommendedVersion: "v7.10.5",
    platforms: ["macos", "windows"],
    summary: {
      desktop: "v2rayN 规则能力取决于版本和路由模式，第一版提供教程和替代建议。",
      mobile: "v2rayN 没有移动端主流程。"
    },
    steps: {
      desktop: ["配置路由规则", "配置 TUN 规则"],
      mobile: []
    },
    rules: {
      desktop: v2rayNRouteConfigText.split("\n"),
      mobile: []
    }
  },
  {
    id: "sing-box",
    name: "sing-box",
    shortName: "SB",
    color: "bg-emerald-600",
    status: "supported",
    category: "route",
    platforms: ["macos", "windows"],
    summary: {
      desktop: "通过 sing-box 路由规则将懒猫域名、网段和进程流量直连。",
      mobile: "移动端可在 sing-box 配置中追加 route.rules，确保懒猫流量走 direct。"
    },
    steps: {
      desktop: ["打开 sing-box 配置文件", "在 route.rules 中追加懒猫直连规则", "确认 direct 出站存在", "保存并重启 sing-box"],
      mobile: ["打开 sing-box 配置编辑", "追加懒猫直连规则", "确认 direct 出站存在", "保存并重新连接"]
    },
    rules: {
      desktop: singBoxRouteConfigText.split("\n"),
      mobile: singBoxRouteConfigText.split("\n")
    }
  },
  {
    id: "v2rayng",
    name: "v2rayNG",
    shortName: "VG",
    color: "bg-sky-500",
    icon: "v2rayaNG",
    status: "limited",
    category: "route",
    platforms: ["android"],
    summary: {
      desktop: "v2rayNG 没有桌面端主流程。",
      mobile: "Android 端通过排除应用避免懒猫流量被 v2rayNG 代理接管。"
    },
    steps: {
      desktop: [],
      mobile: ["排除应用"]
    },
    rules: {
      desktop: [],
      mobile: ["domain:heiyu.space -> direct", "domain:lazycat.cloud -> direct", "6.6.6.6/32 -> direct", "fc03:1136:3800::/40 -> direct"]
    }
  }
];

export const statusLabel: Record<ProxyStatus, string> = {
  recommended: "推荐优先",
  supported: "可适配",
  manual: "教程引导",
  limited: "能力有限"
};

export const statusClass: Record<ProxyStatus, string> = {
  recommended: "badge-primary",
  supported: "badge-success",
  manual: "badge-warning",
  limited: "badge-error"
};
