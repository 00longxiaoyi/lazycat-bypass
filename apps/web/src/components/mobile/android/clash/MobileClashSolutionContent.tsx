import type { ProxyApp } from "../../../../types/proxy";
import type { ClashModifyMethod } from "../../../shared/ClashMethodPanel";
import { StepCard } from "../../../shared/StepCard";

const methodTitle: Record<ClashModifyMethod, string> = {
  config: "修改配置文件",
  override: "修改覆写脚本"
};

type MobileClashSolutionContentProps = {
  app: ProxyApp;
  activeMethod: ClashModifyMethod;
};

export function MobileClashSolutionContent({ app, activeMethod }: MobileClashSolutionContentProps) {
  return (
    <div className="space-y-4">
      <StepCard title={methodTitle[activeMethod]} items={app.steps.mobile} currentIndex={0} />

      <div className="collapse collapse-open border border-base-300 bg-base-100">
        <div className="collapse-title text-base font-medium">规则片段</div>
        <div className="collapse-content">
          <div className="mockup-code max-h-96 overflow-auto text-xs">
            {app.rules.mobile.map((rule) => (
              <pre key={rule}><code>{rule}</code></pre>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
