import type { DeviceMode, ProxyApp } from "../../../types/proxy";
import { DesktopSolutionFrame } from "../DesktopSolutionFrame";

type GenericDesktopSolutionProps = {
  app: ProxyApp;
  mode: DeviceMode;
  onBack: () => void;
};

export function GenericDesktopSolution({ app, mode, onBack }: GenericDesktopSolutionProps) {
  return (
    <DesktopSolutionFrame app={app} mode={mode} onBack={onBack} steps={app.steps[mode]} currentStep={0}>
      {null}
    </DesktopSolutionFrame>
  );
}
