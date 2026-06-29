import type { DeviceMode, PlatformType, ProxyApp } from "../../types/proxy";
import { AndroidMobileSolutionPage } from "./android/AndroidMobileSolutionPage";
import { IosMobileSolutionPage } from "./ios/IosMobileSolutionPage";

type MobileSolutionPageProps = {
  app: ProxyApp;
  mode: DeviceMode;
  platform: PlatformType;
  onBack: () => void;
};

export function MobileSolutionPage({ app, mode, platform, onBack }: MobileSolutionPageProps) {
  if (platform === "ios") {
    return <IosMobileSolutionPage app={app} mode={mode} onBack={onBack} />;
  }

  return <AndroidMobileSolutionPage app={app} mode={mode} onBack={onBack} />;
}
