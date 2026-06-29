export type DeviceMode = "desktop" | "mobile";

export type PlatformType = "macos" | "windows" | "android" | "ios";

export type ProxyStatus = "recommended" | "supported" | "manual" | "limited";

export type ProxyCategory = "clash" | "rule" | "route";

export type ProxyIconKey = "clashMeta" | "clashMi" | "clashParty" | "clashVerge" | "flclash" | "karing" | "surfboard" | "surge" | "shadowrocket" | "v2rayaN" | "v2rayaNG";

export type ProxyApp = {
  id: string;
  name: string;
  shortName: string;
  color: string;
  icon?: ProxyIconKey;
  status: ProxyStatus;
  category: ProxyCategory;
  recommendedVersion?: string;
  platforms: PlatformType[];
  summary: Record<DeviceMode, string>;
  steps: Record<DeviceMode, string[]>;
  rules: Record<DeviceMode, string[]>;
};
