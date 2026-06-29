import type { DeviceMode, ProxyApp } from "../../types/proxy";
import { ClashMiDesktopSolution } from "./clash-mi/ClashMiDesktopSolution";
import { ClashPartyDesktopSolution } from "./clash-party/ClashPartyDesktopSolution";
import { ClashVergeDesktopSolution } from "./clash-verge/ClashVergeDesktopSolution";
import { FlClashDesktopSolution } from "./flclash/FlClashDesktopSolution";
import { GenericDesktopSolution } from "./generic/GenericDesktopSolution";
import { ShadowrocketDesktopSolution } from "./shadowrocket/ShadowrocketDesktopSolution";
import { SurgeDesktopSolution } from "./surge/SurgeDesktopSolution";
import { V2rayNDesktopSolution } from "./v2rayn/V2rayNDesktopSolution";

type DesktopSolutionPageProps = {
  app: ProxyApp;
  mode: DeviceMode;
  onBack: () => void;
};

export function DesktopSolutionPage({ app, mode, onBack }: DesktopSolutionPageProps) {
  if (app.id === "clash") {
    return <ClashPartyDesktopSolution app={app} mode={mode} onBack={onBack} />;
  }

  if (app.id === "clash-mi") {
    return <ClashMiDesktopSolution app={app} mode={mode} onBack={onBack} />;
  }

  if (app.id === "clash-verge") {
    return <ClashVergeDesktopSolution app={app} mode={mode} onBack={onBack} />;
  }

  if (app.id === "flclash") {
    return <FlClashDesktopSolution app={app} mode={mode} onBack={onBack} />;
  }

  if (app.id === "surge") {
    return <SurgeDesktopSolution app={app} mode={mode} onBack={onBack} />;
  }

  if (app.id === "shadowrocket") {
    return <ShadowrocketDesktopSolution app={app} mode={mode} onBack={onBack} />;
  }

  if (app.id === "v2rayn") {
    return <V2rayNDesktopSolution app={app} mode={mode} onBack={onBack} />;
  }

  return <GenericDesktopSolution app={app} mode={mode} onBack={onBack} />;
}
