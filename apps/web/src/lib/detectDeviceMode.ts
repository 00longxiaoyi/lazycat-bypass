import type { DeviceMode, PlatformType } from "../types/proxy";

export function detectPlatform(): PlatformType {
  if (typeof window === "undefined") return "windows";

  const ua = navigator.userAgent.toLowerCase();
  if (/android|harmonyos/.test(ua)) return "android";
  if (/iphone|ipad|ipod/.test(ua)) return "ios";

  const nav = navigator as Navigator & { userAgentData?: { mobile?: boolean; platform?: string } };
  const platform = nav.userAgentData?.platform?.toLowerCase() ?? navigator.platform.toLowerCase();
  if (nav.userAgentData?.mobile && /android|linux/.test(platform)) return "android";
  if (nav.userAgentData?.mobile) return "ios";
  if (/mac|darwin/.test(platform)) return "macos";
  if (/win/.test(platform)) return "windows";

  return "windows";
}

export function detectDeviceMode(): DeviceMode {
  const platform = detectPlatform();
  if (platform === "android" || platform === "ios") return "mobile";

  if (typeof window === "undefined") return "desktop";

  const ua = navigator.userAgent.toLowerCase();
  if (/mobile|windows phone/.test(ua)) return "mobile";

  const coarsePointer = window.matchMedia?.("(pointer: coarse)").matches ?? false;
  if (coarsePointer && window.innerWidth < 900) return "mobile";

  return "desktop";
}
