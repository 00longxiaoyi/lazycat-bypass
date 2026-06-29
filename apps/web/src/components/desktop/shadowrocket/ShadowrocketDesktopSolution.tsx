import { useState } from "react";
import type { DeviceMode, ProxyApp } from "../../../types/proxy";
import { DesktopSolutionFrame } from "../DesktopSolutionFrame";
import { ShadowrocketDesktopConfigGenerator } from "./ShadowrocketDesktopConfigGenerator";
import { ShadowrocketDesktopKnownIssues } from "./ShadowrocketDesktopKnownIssues";

const shadowrocketDesktopSteps = ["上传配置文件", "下载新配置文件"];

type ShadowrocketDesktopSolutionProps = {
  app: ProxyApp;
  mode: DeviceMode;
  onBack: () => void;
};

export function ShadowrocketDesktopSolution({ app, mode, onBack }: ShadowrocketDesktopSolutionProps) {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <DesktopSolutionFrame
      app={app}
      mode={mode}
      onBack={onBack}
      steps={shadowrocketDesktopSteps}
      currentStep={currentStep}
      beforeConfig={<ShadowrocketDesktopKnownIssues />}
    >
      <ShadowrocketDesktopConfigGenerator currentStep={currentStep} onStepChange={setCurrentStep} />
    </DesktopSolutionFrame>
  );
}
