import type { DeviceMode, ProxyApp } from "../../../../types/proxy";
import { MobileRuleSnippetContent } from "../../MobileRuleSnippetContent";
import { MobileSolutionFrame } from "../../MobileSolutionFrame";
import { MobileStepPager } from "../../MobileStepPager";

type GenericIosMobileSolutionProps = {
  app: ProxyApp;
  mode: DeviceMode;
  onBack: () => void;
};

export function GenericIosMobileSolution({ app, mode, onBack }: GenericIosMobileSolutionProps) {
  const stepStorageKey = `mobile-solution-step:${app.id}`;
  const tabStorageKey = `mobile-solution-tab:${app.id}`;

  function handleBack() {
    window.localStorage.removeItem(stepStorageKey);
    window.localStorage.removeItem(tabStorageKey);
    onBack();
  }

  return (
    <MobileSolutionFrame
      app={app}
      onBack={handleBack}
      storageKey={tabStorageKey}
      knownContent={<MobileRuleSnippetContent app={app} mode={mode} />}
      stepsContent={<MobileStepPager items={app.steps[mode]} storageKey={stepStorageKey} />}
    />
  );
}
