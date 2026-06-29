import type { DeviceMode, ProxyApp } from "../../../types/proxy";
import { GenericIosMobileSolution } from "./generic/GenericIosMobileSolution";
import { ShadowrocketMobileSolution } from "./shadowrocket/ShadowrocketMobileSolution";
import { SurgeMobileSolution } from "./surge/SurgeMobileSolution";

type IosMobileSolutionPageProps = {
  app: ProxyApp;
  mode: DeviceMode;
  onBack: () => void;
};

export function IosMobileSolutionPage({ app, mode, onBack }: IosMobileSolutionPageProps) {
  if (app.id === "surge") {
    return <SurgeMobileSolution app={app} mode={mode} onBack={onBack} />;
  }

  if (app.id === "shadowrocket") {
    return <ShadowrocketMobileSolution app={app} mode={mode} onBack={onBack} />;
  }

  return <GenericIosMobileSolution app={app} mode={mode} onBack={onBack} />;
}
