import { useState } from "react";
import type { DeviceMode, ProxyApp } from "../../../types/proxy";
import { DesktopSolutionFrame } from "../DesktopSolutionFrame";
import { V2rayNSolutionContent } from "./V2rayNSolutionContent";

type V2rayNDesktopSolutionProps = {
  app: ProxyApp;
  mode: DeviceMode;
  onBack: () => void;
};

export function V2rayNDesktopSolution({ app, mode, onBack }: V2rayNDesktopSolutionProps) {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <DesktopSolutionFrame app={app} mode={mode} onBack={onBack} steps={app.steps.desktop} currentStep={currentStep}>
      <V2rayNSolutionContent app={app} currentStep={currentStep} onStepChange={setCurrentStep} />
    </DesktopSolutionFrame>
  );
}
