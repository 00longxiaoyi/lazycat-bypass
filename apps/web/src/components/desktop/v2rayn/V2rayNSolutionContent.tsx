import type { ProxyApp } from "../../../types/proxy";
import { ImageGuideDialog } from "../../shared/ImageGuideDialog";
import { RuleTextPanel } from "../../shared/RuleTextPanel";

type V2rayNSolutionContentProps = {
  app: ProxyApp;
  currentStep: number;
  onStepChange: (step: number) => void;
};

const routeConfigGuideImages = Array.from({ length: 5 }, (_, index) => ({
  src: `/imgs/v2rayaN/v2rayaN-set-route-config-${index + 1}.png`,
  alt: `配置 v2rayN 路由规则第 ${index + 1} 步示意图`
}));

const tunConfigGuideImages = Array.from({ length: 2 }, (_, index) => ({
  src: `/imgs/v2rayaN/v2rayaN-set-tun-config-${index + 1}.png`,
  alt: `配置 v2rayN TUN 规则第 ${index + 1} 步示意图`
}));

export function V2rayNSolutionContent({ app, currentStep, onStepChange }: V2rayNSolutionContentProps) {
  return (
    <>
      {currentStep === 0 ? (
        <RuleTextPanel
          title="路由规则"
          content={app.rules.desktop.join("\n")}
          titleActions={(
            <ImageGuideDialog
              id="v2rayn-route-config-guide"
              buttonLabel="配置路由规则？"
              title="配置 v2rayN 路由规则"
              description="按图示位置将路由规则粘贴到 v2rayN 对应配置中。"
              images={routeConfigGuideImages}
            />
          )}
          actions={<button className="btn btn-primary w-full sm:w-auto" type="button" onClick={() => onStepChange(1)}>下一步</button>}
        />
      ) : null}

      {currentStep === 1 ? (
        <div className="card card-border bg-base-100 shadow-sm">
          <div className="card-body gap-5 p-4 sm:p-8">
            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <h2 className="card-title">TUN 规则</h2>
              <ImageGuideDialog
                id="v2rayn-tun-config-guide"
                buttonLabel="配置TUN规则？"
                title="配置 v2rayN TUN 规则"
                description="按图示位置关闭 TUN 严格路由，并开启 TUN IPv6 功能。"
                images={tunConfigGuideImages}
              />
            </div>
            <ol className="list-decimal space-y-3 pl-5 text-sm text-base-content/70">
              <li>关闭 TUN 的严格路由。</li>
              <li>开启 TUN 的 IPv6 功能。</li>
            </ol>
            <div className="card-actions">
              <button className="btn btn-outline w-full sm:w-auto" type="button" onClick={() => onStepChange(0)}>上一步</button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
