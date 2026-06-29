import type { DeviceMode, ProxyApp } from "../../../types/proxy";
import { DesktopSolutionFrame } from "../DesktopSolutionFrame";
import { ClashSolutionContent } from "../clash/ClashSolutionContent";

type ClashVergeDesktopSolutionProps = {
  app: ProxyApp;
  mode: DeviceMode;
  onBack: () => void;
};

export function ClashVergeDesktopSolution({ app, mode, onBack }: ClashVergeDesktopSolutionProps) {
  return (
    <DesktopSolutionFrame app={app} mode={mode} onBack={onBack} steps={["导入脚本"]} currentStep={0}>
      <ClashSolutionContent app={app} activeMethod="override" currentStep={0} onStepChange={() => undefined} />
    </DesktopSolutionFrame>
  );
}
