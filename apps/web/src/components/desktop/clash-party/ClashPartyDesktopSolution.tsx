import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { DeviceMode, ProxyApp } from "../../../types/proxy";
import { ClashMethodPanel, type ClashModifyMethod } from "../../shared/ClashMethodPanel";
import { DesktopSolutionFrame } from "../DesktopSolutionFrame";
import { ClashSolutionContent } from "../clash/ClashSolutionContent";

type ClashPartyDesktopSolutionProps = {
  app: ProxyApp;
  mode: DeviceMode;
  onBack: () => void;
};

export function ClashPartyDesktopSolution({ app, mode, onBack }: ClashPartyDesktopSolutionProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const methodParam = searchParams.get("method");
  const activeMethod: ClashModifyMethod = methodParam === "override" ? "override" : "config";
  const [currentStep, setCurrentStep] = useState(0);
  const steps = activeMethod === "override" ? ["导入脚本"] : app.steps.desktop;

  function handleMethodChange(method: ClashModifyMethod) {
    setCurrentStep(0);
    setSearchParams(method === "config" ? {} : { method });
  }

  return (
    <DesktopSolutionFrame
      app={app}
      mode={mode}
      onBack={onBack}
      steps={steps}
      currentStep={currentStep}
      beforeConfig={<ClashMethodPanel activeMethod={activeMethod} onMethodChange={handleMethodChange} />}
    >
      <ClashSolutionContent app={app} activeMethod={activeMethod} currentStep={currentStep} onStepChange={setCurrentStep} />
    </DesktopSolutionFrame>
  );
}
