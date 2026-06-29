import type { ProxyApp, ProxyIconKey } from "../../types/proxy";

const iconSources: Record<ProxyIconKey, string> = {
  clashMeta: "/icon/clash-meta.png",
  clashMi: "/icon/clash-mi.png",
  clashParty: "/icon/clash-party.png",
  clashVerge: "/icon/clash-verge.png",
  flclash: "/icon/flclash.png",
  karing: "/icon/karing.png",
  surfboard: "/icon/surfboard.png",
  surge: "/icon/surge.png",
  shadowrocket: "/icon/shadowrocket.png",
  v2rayaN: "/icon/v2rayaN.png",
  v2rayaNG: "/icon/v2rayaNG.png"
};

type ProxyAppIconSize = "card" | "detail" | "compact";

type ProxyAppIconProps = {
  app: ProxyApp;
  size?: ProxyAppIconSize;
};

const iconSizeClass: Record<ProxyAppIconSize, string> = {
  card: "h-[67px] w-[67px] sm:h-[115px] sm:w-[115px]",
  detail: "h-16 w-16",
  compact: "h-14 w-14 sm:h-16 sm:w-16"
};

const fallbackTextClass: Record<ProxyAppIconSize, string> = {
  card: "text-xl sm:text-4xl",
  detail: "text-xl",
  compact: "text-lg sm:text-xl"
};

export function ProxyAppIcon({ app, size = "card" }: ProxyAppIconProps) {
  const iconSrc = app.icon ? iconSources[app.icon] : "";
  const sizeClass = size === "card" && app.icon === "clashParty"
    ? "h-14 w-14 sm:h-24 sm:w-24"
    : size === "detail" && app.icon && app.icon !== "clashParty"
      ? "h-[77px] w-[77px]"
      : iconSizeClass[size];
  const alignClass = size === "card" && app.icon === "clashParty" ? "ml-[11px] mt-[11px] sm:ml-[19px] sm:mt-[19px]" : "";

  return (
    <div className={`grid ${sizeClass} ${alignClass} shrink-0 place-items-center overflow-hidden rounded-box bg-base-100 ${iconSrc ? "p-1" : `font-black text-primary-content ${fallbackTextClass[size]} ${app.color}`}`}>
      {iconSrc ? <img className="h-full w-full object-contain" src={iconSrc} alt={`${app.name} 图标`} loading="lazy" /> : app.shortName}
    </div>
  );
}
