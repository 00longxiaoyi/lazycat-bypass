import { useState } from "react";
import type { DeviceMode, ProxyApp } from "../../../../types/proxy";
import { MobileSolutionFrame } from "../../MobileSolutionFrame";
import { MobileStepPager } from "../../MobileStepPager";
import { ShadowrocketConfigInput } from "./ShadowrocketConfigInput";
import { ShadowrocketConfigInputHelpDialog } from "./ShadowrocketConfigInputHelpDialog";
import { ShadowrocketGeneratedConfig } from "./ShadowrocketGeneratedConfig";
import { ShadowrocketLazycatQrCode, type LazycatNodeMethod } from "./ShadowrocketLazycatQrCode";
import { ShadowrocketMobileKnownIssues } from "./ShadowrocketMobileKnownIssues";
import { ShadowrocketUseConfigHelpDialog } from "./ShadowrocketUseConfigHelpDialog";

type ShadowrocketMobileSolutionProps = {
  app: ProxyApp;
  mode: DeviceMode;
  onBack: () => void;
};

export function ShadowrocketMobileSolution({ app, mode, onBack }: ShadowrocketMobileSolutionProps) {
  const [lazycatNodeMethod, setLazycatNodeMethod] = useState<LazycatNodeMethod>("qr");
  const [shadowrocketConfig, setShadowrocketConfig] = useState("");
  const stepStorageKey = `mobile-solution-step:${app.id}`;
  const tabStorageKey = `mobile-solution-tab:${app.id}`;

  function handleBack() {
    window.localStorage.removeItem(stepStorageKey);
    window.localStorage.removeItem(tabStorageKey);
    onBack();
  }

  const stepsContent = (
    <MobileStepPager
      items={app.steps[mode]}
      storageKey={stepStorageKey}
      canGoNext={(index) => index !== 1 || shadowrocketConfig.trim().length > 0}
      renderTitleAction={(index) => {
        if (index === 1) return <ShadowrocketConfigInputHelpDialog />;
        if (index === 2) return <ShadowrocketUseConfigHelpDialog />;
        return null;
      }}
      renderStepContent={(index) => {
        if (index === 0) return (
          <div className="relative">
            <div className="absolute -left-4 top-0 z-10 rounded-box border border-base-300 bg-base-100 p-1 shadow-sm">
              <div className="join join-vertical">
                <button
                  className={`btn join-item btn-xs h-14 w-7 px-0 text-[12px] ${lazycatNodeMethod === "qr" ? "btn-primary" : "btn-ghost"}`}
                  type="button"
                  onClick={() => setLazycatNodeMethod("qr")}
                >
                  <span className="[writing-mode:vertical-rl]">扫码</span>
                </button>
                <button
                  className={`btn join-item btn-xs h-14 w-7 px-0 text-[12px] ${lazycatNodeMethod === "copy" ? "btn-primary" : "btn-ghost"}`}
                  type="button"
                  onClick={() => setLazycatNodeMethod("copy")}
                >
                  <span className="[writing-mode:vertical-rl]">粘贴</span>
                </button>
              </div>
            </div>
            <ShadowrocketLazycatQrCode method={lazycatNodeMethod} />
          </div>
        );
        if (index === 1) return <ShadowrocketConfigInput value={shadowrocketConfig} onChange={setShadowrocketConfig} />;
        if (index === 2) return <ShadowrocketGeneratedConfig sourceConfig={shadowrocketConfig} />;
        return null;
      }}
    />
  );

  return (
    <MobileSolutionFrame
      app={app}
      onBack={handleBack}
      storageKey={tabStorageKey}
      knownContent={<ShadowrocketMobileKnownIssues />}
      stepsContent={stepsContent}
    />
  );
}
