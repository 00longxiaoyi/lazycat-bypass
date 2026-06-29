import type { ReactNode } from "react";
import type { ProxyApp } from "../../types/proxy";
import { MobileAppHeader } from "./MobileAppHeader";
import { MobileDetailTabs, type MobileDetailTab } from "./MobileDetailTabs";

type MobileSolutionFrameProps = {
  app: ProxyApp;
  onBack: () => void;
  storageKey: string;
  knownContent?: ReactNode;
  stepsContent?: ReactNode;
  tabs?: MobileDetailTab[];
  afterHeader?: ReactNode;
  children?: ReactNode;
};

export function MobileSolutionFrame({ app, onBack, storageKey, knownContent, stepsContent, tabs, afterHeader, children }: MobileSolutionFrameProps) {
  return (
    <section className="mx-auto w-full max-w-xl space-y-3 px-3 py-4">
      <MobileAppHeader app={app} onBack={onBack} />
      {afterHeader}
      {children ?? (
        <MobileDetailTabs
          storageKey={storageKey}
          tabs={tabs}
          knownContent={knownContent}
          stepsContent={stepsContent}
        />
      )}
    </section>
  );
}
