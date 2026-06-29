import type { ProxyApp } from "../../../types/proxy";
import { ClashConfigGenerator } from "./ClashConfigGenerator";
import { ClashOverrideScriptGenerator } from "./ClashOverrideScriptGenerator";
import type { ClashModifyMethod } from "../../shared/ClashMethodPanel";

type ClashSolutionContentProps = {
  app: ProxyApp;
  activeMethod: ClashModifyMethod;
  currentStep: number;
  onStepChange: (step: number) => void;
};

export function ClashSolutionContent({ app, activeMethod, currentStep, onStepChange }: ClashSolutionContentProps) {
  return (
    <>
      {activeMethod === "config" ? <ClashConfigGenerator appId={app.id} appName={app.name} currentStep={currentStep} onStepChange={onStepChange} /> : null}
      {activeMethod === "override" ? <ClashOverrideScriptGenerator appId={app.id} appName={app.name} /> : null}
    </>
  );
}
