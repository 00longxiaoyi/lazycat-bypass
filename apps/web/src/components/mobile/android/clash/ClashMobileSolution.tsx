import { useSearchParams } from "react-router-dom";
import type { DeviceMode, ProxyApp } from "../../../../types/proxy";
import { ClashMethodPanel, type ClashModifyMethod } from "../../../shared/ClashMethodPanel";
import { MobileRuleSnippetContent } from "../../MobileRuleSnippetContent";
import { MobileSolutionFrame } from "../../MobileSolutionFrame";
import { MobileClashSolutionContent } from "./MobileClashSolutionContent";

type ClashMobileSolutionProps = {
  app: ProxyApp;
  mode: DeviceMode;
  onBack: () => void;
};

export function ClashMobileSolution({ app, mode, onBack }: ClashMobileSolutionProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const methodParam = searchParams.get("method");
  const activeMethod: ClashModifyMethod = methodParam === "override" ? "override" : "config";
  const stepStorageKey = `mobile-solution-step:${app.id}`;
  const tabStorageKey = `mobile-solution-tab:${app.id}`;

  function handleBack() {
    window.localStorage.removeItem(stepStorageKey);
    window.localStorage.removeItem(tabStorageKey);
    onBack();
  }

  function handleClashMethodChange(method: ClashModifyMethod) {
    setSearchParams(method === "config" ? {} : { method });
  }

  return (
    <MobileSolutionFrame
      app={app}
      onBack={handleBack}
      storageKey={tabStorageKey}
      afterHeader={<ClashMethodPanel activeMethod={activeMethod} onMethodChange={handleClashMethodChange} />}
      knownContent={<MobileRuleSnippetContent app={app} mode={mode} />}
      stepsContent={<MobileClashSolutionContent app={app} activeMethod={activeMethod} />}
    />
  );
}
