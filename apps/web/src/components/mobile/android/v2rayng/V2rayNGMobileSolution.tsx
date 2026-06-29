import type { DeviceMode, ProxyApp } from "../../../../types/proxy";
import { MobileImageGuideDialog } from "../../MobileImageGuideDialog";
import { MobileSolutionFrame } from "../../MobileSolutionFrame";
import { MobileStepPager } from "../../MobileStepPager";

const v2rayNGExcludeAppImages = Array.from({ length: 4 }, (_, index) => ({
  src: `/imgs/v2rayaNG/Android/v2rayaNG-set-export-app-${index + 1}.png`,
  alt: `v2rayNG 排除应用第 ${index + 1} 步`
}));

type V2rayNGMobileSolutionProps = {
  app: ProxyApp;
  mode: DeviceMode;
  onBack: () => void;
};

function V2rayNGKnownIssues() {
  return (
    <div className="space-y-3">
      <div className="rounded-box border border-base-300 bg-base-100 p-4 text-sm leading-6 text-base-content/80">
        <h2 className="mb-2 font-medium text-base-content">配置说明</h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>v2rayNG Android 端当前只需要配置排除应用。</li>
          <li>将懒猫微服相关应用加入排除列表，避免本地服务流量被代理接管。</li>
          <li>配置完成后，如仍无法访问懒猫服务，请重新启动 v2rayNG 或重新连接代理。</li>
        </ol>
      </div>
    </div>
  );
}

function V2rayNGExcludeAppPanel() {
  return (
    <div className="rounded-box border border-base-300 bg-base-100 p-4 text-sm leading-6 text-base-content/80">
      <p>将懒猫微服相关应用加入 v2rayNG 的排除应用列表，避免本地服务流量进入代理回环。</p>
      <div className="mt-4 flex justify-end">
        <MobileImageGuideDialog
          title="排除应用"
          ariaLabel="查看 v2rayNG 排除应用图示"
          buttonLabel="如何排除应用"
          images={v2rayNGExcludeAppImages}
        />
      </div>
    </div>
  );
}

export function V2rayNGMobileSolution({ app, mode, onBack }: V2rayNGMobileSolutionProps) {
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
      renderStepContent={() => <V2rayNGExcludeAppPanel />}
    />
  );

  return (
    <MobileSolutionFrame
      app={app}
      onBack={handleBack}
      storageKey={tabStorageKey}
      tabs={[
        { key: "steps", label: "解决步骤", content: stepsContent },
        { key: "known", label: "使用须知", content: <V2rayNGKnownIssues /> }
      ]}
    />
  );
}
