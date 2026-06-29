import type { DeviceMode, ProxyApp } from "../../../types/proxy";
import { DesktopSolutionFrame } from "../DesktopSolutionFrame";
import { ClashMiSolutionContent } from "../clash/ClashMiSolutionContent";

type ClashMiDesktopSolutionProps = {
  app: ProxyApp;
  mode: DeviceMode;
  onBack: () => void;
};

export function ClashMiDesktopSolution({ app, mode, onBack }: ClashMiDesktopSolutionProps) {
  return (
    <DesktopSolutionFrame app={app} mode={mode} onBack={onBack} steps={["添加覆写脚本"]} currentStep={0}>
      <ClashMiSolutionContent />
    </DesktopSolutionFrame>
  );
}
