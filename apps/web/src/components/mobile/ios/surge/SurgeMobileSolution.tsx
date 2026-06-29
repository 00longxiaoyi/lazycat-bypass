import { useEffect, useState } from "react";
import type { DeviceMode, ProxyApp } from "../../../../types/proxy";
import { MobileSolutionFrame } from "../../MobileSolutionFrame";
import { MobileStepPager } from "../../MobileStepPager";
import { SurgeConfigUploadGenerator } from "./SurgeConfigUploadGenerator";
import { SurgeExistingConfigNameInput } from "./SurgeExistingConfigNameInput";
import { SurgeFinalConfigDownload } from "./SurgeFinalConfigDownload";
import { SurgeFinalConfigHelpDialog } from "./SurgeFinalConfigHelpDialog";
import { SurgeInitialConfigDownload } from "./SurgeInitialConfigDownload";
import { SurgeInitialConfigHelpDialog } from "./SurgeInitialConfigHelpDialog";
import { SurgeMobileKnownIssues } from "./SurgeMobileKnownIssues";
import { SurgeModuleConfigCopy } from "./SurgeModuleConfigCopy";
import { SurgeModuleConfigHelpDialog } from "./SurgeModuleConfigHelpDialog";

type SurgeMobileSolutionProps = {
  app: ProxyApp;
  mode: DeviceMode;
  onBack: () => void;
};

function getStoredText(storageKey: string) {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(storageKey) ?? "";
}

export function SurgeMobileSolution({ app, mode, onBack }: SurgeMobileSolutionProps) {
  const surgeExistingConfigNameStorageKey = `surge-existing-config-name:${app.id}`;
  const [surgeExistingConfigName, setSurgeExistingConfigName] = useState(() => getStoredText(surgeExistingConfigNameStorageKey));
  const stepStorageKey = `mobile-solution-step:${app.id}`;
  const tabStorageKey = `mobile-solution-tab:${app.id}`;

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(surgeExistingConfigNameStorageKey, surgeExistingConfigName);
  }, [surgeExistingConfigName, surgeExistingConfigNameStorageKey]);

  function handleBack() {
    window.localStorage.removeItem(stepStorageKey);
    window.localStorage.removeItem(tabStorageKey);
    onBack();
  }

  const stepsContent = (
    <MobileStepPager
      items={app.steps[mode]}
      storageKey={stepStorageKey}
      canGoNext={(index) => index !== 0 || surgeExistingConfigName.trim().length > 0}
      renderTitleAction={(index) => {
        if (index === 1) return <SurgeInitialConfigHelpDialog />;
        if (index === 2) return <SurgeFinalConfigHelpDialog />;
        if (index === 3) return <SurgeModuleConfigHelpDialog />;
        return null;
      }}
      renderStepContent={(index, { goNext }) => {
        if (index === 0) return (
          <SurgeExistingConfigNameInput
            value={surgeExistingConfigName}
            onChange={setSurgeExistingConfigName}
            onConfirm={goNext}
          />
        );
        if (index === 1) return <SurgeInitialConfigDownload />;
        if (index === 2) return <SurgeFinalConfigDownload existingConfigName={surgeExistingConfigName} />;
        if (index === 3) return <SurgeModuleConfigCopy />;
        return null;
      }}
    />
  );

  return (
    <MobileSolutionFrame
      app={app}
      onBack={handleBack}
      storageKey={tabStorageKey}
      tabs={[
        { key: "solution-one", label: "方案一", content: <SurgeConfigUploadGenerator /> },
        { key: "steps", label: "方案二", content: stepsContent },
        { key: "known", label: "使用须知", content: <SurgeMobileKnownIssues /> }
      ]}
    />
  );
}
