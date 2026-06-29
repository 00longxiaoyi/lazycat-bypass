import type { DeviceMode, PlatformType, ProxyApp } from "../types/proxy";
import { DesktopSolutionPage } from "./desktop/DesktopSolutionPage";
import { MobileSolutionPage } from "./mobile/MobileSolutionPage";

type SolutionPageProps = {
  app: ProxyApp;
  mode: DeviceMode;
  platform: PlatformType;
  onBack: () => void;
};

export function SolutionPage({ app, mode, platform, onBack }: SolutionPageProps) {
  if (mode === "mobile") {
    return <MobileSolutionPage app={app} mode={mode} platform={platform} onBack={onBack} />;
  }

  return <DesktopSolutionPage app={app} mode={mode} onBack={onBack} />;
}
