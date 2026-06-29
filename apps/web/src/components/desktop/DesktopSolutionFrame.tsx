import type { ReactNode } from "react";
import type { DeviceMode, ProxyApp } from "../../types/proxy";
import { PageContainer } from "../shared/PageContainer";
import { StepCard } from "../shared/StepCard";
import { DesktopAppHeader } from "./DesktopAppHeader";
import { DesktopConfigSnippetPanel } from "./DesktopConfigSnippetPanel";
import { DesktopInfoNotice } from "./DesktopInfoNotice";

type DesktopSolutionFrameProps = {
  app: ProxyApp;
  mode: DeviceMode;
  onBack: () => void;
  steps?: string[];
  currentStep?: number;
  beforeConfig?: ReactNode;
  afterSteps?: ReactNode;
  configTitle?: string;
  configContent?: ReactNode;
  children: ReactNode;
};

function DefaultConfigContent({ app, mode }: { app: ProxyApp; mode: DeviceMode }) {
  return (
    <div className="mockup-code text-xs">
      {app.rules[mode].map((rule) => (
        <pre key={rule}><code>{rule}</code></pre>
      ))}
    </div>
  );
}

export function DesktopSolutionFrame({
  app,
  mode,
  onBack,
  steps,
  currentStep = 0,
  beforeConfig,
  afterSteps,
  configTitle,
  configContent,
  children
}: DesktopSolutionFrameProps) {
  const safeCurrentStep = steps?.length ? Math.min(currentStep, steps.length - 1) : 0;

  return (
    <PageContainer className="grid gap-6 py-8 lg:grid-cols-[35.5rem_minmax(0,1fr)]">
      <div className="space-y-6 self-start">
        <DesktopAppHeader app={app} onBack={onBack} />
        {beforeConfig}
        <DesktopConfigSnippetPanel title={configTitle}>
          {configContent ?? <DefaultConfigContent app={app} mode={mode} />}
        </DesktopConfigSnippetPanel>
      </div>

      <div className="space-y-6">
        <DesktopInfoNotice />
        {steps?.length ? <StepCard title="解决步骤" items={steps} currentIndex={safeCurrentStep} /> : null}
        {afterSteps}
        {children}
      </div>
    </PageContainer>
  );
}
