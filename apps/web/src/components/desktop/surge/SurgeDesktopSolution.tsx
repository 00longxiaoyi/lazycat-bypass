import { useState } from "react";
import type { DeviceMode, ProxyApp } from "../../../types/proxy";
import { DesktopSolutionFrame } from "../DesktopSolutionFrame";
import { SurgeDesktopConfigGenerator, type SurgeDesktopMethod } from "./SurgeDesktopConfigGenerator";
import { SurgeDesktopKnownIssues } from "./SurgeDesktopKnownIssues";

const surgeDesktopSteps = ["上传配置文件", "下载新配置文件"];

type SurgeDesktopSolutionProps = {
  app: ProxyApp;
  mode: DeviceMode;
  onBack: () => void;
};

function SurgeDesktopMethodPanel({ activeMethod, onMethodChange }: { activeMethod: SurgeDesktopMethod; onMethodChange: (method: SurgeDesktopMethod) => void }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button className={`btn ${activeMethod === "config" ? "btn-primary" : "btn-outline"}`} type="button" onClick={() => onMethodChange("config")}>修改配置文件</button>
      <button className={`btn ${activeMethod === "module" ? "btn-primary" : "btn-outline"}`} type="button" onClick={() => onMethodChange("module")}>新增模块文件</button>
    </div>
  );
}

function SurgeDesktopSidePanel({ activeMethod, onMethodChange }: { activeMethod: SurgeDesktopMethod; onMethodChange: (method: SurgeDesktopMethod) => void }) {
  return (
    <div className="card card-border bg-base-100 shadow-sm">
      <div className="card-body gap-6 p-4 sm:p-8">
        <SurgeDesktopMethodPanel activeMethod={activeMethod} onMethodChange={onMethodChange} />
        <SurgeDesktopKnownIssues activeMethod={activeMethod} />
      </div>
    </div>
  );
}

export function SurgeDesktopSolution({ app, mode, onBack }: SurgeDesktopSolutionProps) {
  const [activeMethod, setActiveMethod] = useState<SurgeDesktopMethod>("config");
  const [currentStep, setCurrentStep] = useState(0);
  const steps = activeMethod === "config" ? surgeDesktopSteps : [];

  function handleMethodChange(method: SurgeDesktopMethod) {
    setActiveMethod(method);
    setCurrentStep(0);
  }

  return (
    <DesktopSolutionFrame
      app={app}
      mode={mode}
      onBack={onBack}
      steps={steps}
      currentStep={currentStep}
      beforeConfig={<SurgeDesktopSidePanel activeMethod={activeMethod} onMethodChange={handleMethodChange} />}
    >
      <SurgeDesktopConfigGenerator activeMethod={activeMethod} currentStep={currentStep} onStepChange={setCurrentStep} />
    </DesktopSolutionFrame>
  );
}
