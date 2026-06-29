import type { DeviceMode, ProxyApp } from "../../../types/proxy";
import { ClashMetaMobileSolution } from "./clash-meta/ClashMetaMobileSolution";
import { ClashMobileSolution } from "./clash/ClashMobileSolution";
import { FlClashMobileSolution } from "./flclash/FlClashMobileSolution";
import { GenericMobileSolution } from "./generic/GenericMobileSolution";
import { KaringMobileSolution } from "./karing/KaringMobileSolution";
import { SurfboardMobileSolution } from "./surfboard/SurfboardMobileSolution";
import { V2rayNGMobileSolution } from "./v2rayng/V2rayNGMobileSolution";

type AndroidMobileSolutionPageProps = {
  app: ProxyApp;
  mode: DeviceMode;
  onBack: () => void;
};

export function AndroidMobileSolutionPage({ app, mode, onBack }: AndroidMobileSolutionPageProps) {
  if (app.id === "clash-meta") {
    return <ClashMetaMobileSolution app={app} mode={mode} onBack={onBack} />;
  }

  if (app.id === "flclash") {
    return <FlClashMobileSolution app={app} mode={mode} onBack={onBack} />;
  }

  if (app.id === "surfboard") {
    return <SurfboardMobileSolution app={app} mode={mode} onBack={onBack} />;
  }

  if (app.id === "karing") {
    return <KaringMobileSolution app={app} mode={mode} onBack={onBack} />;
  }

  if (app.id === "v2rayng") {
    return <V2rayNGMobileSolution app={app} mode={mode} onBack={onBack} />;
  }

  if (app.category === "clash") {
    return <ClashMobileSolution app={app} mode={mode} onBack={onBack} />;
  }

  return <GenericMobileSolution app={app} mode={mode} onBack={onBack} />;
}
