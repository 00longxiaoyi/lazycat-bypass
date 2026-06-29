import type { DeviceMode, ProxyApp } from "../../../../types/proxy";
import { MobileImageGuideDialog } from "../../MobileImageGuideDialog";
import { MobileSolutionFrame } from "../../MobileSolutionFrame";
import { MobileStepPager } from "../../MobileStepPager";

const karingExcludeAppImages = Array.from({ length: 2 }, (_, index) => ({
  src: `/imgs/karing/android/karing-set-export-app-${index + 1}.png`,
  alt: `Karing 排除应用第 ${index + 1} 步`
}));

type KaringMobileSolutionProps = {
  app: ProxyApp;
  mode: DeviceMode;
  onBack: () => void;
};

function KaringKnownIssues() {
  return (
    <div className="space-y-3">
      <div className="rounded-box border border-base-300 bg-base-100 p-4 text-sm leading-6 text-base-content/80">
        <h2 className="mb-2 font-medium text-base-content">配置说明</h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>Karing Android 端当前只需要配置排除应用。</li>
          <li>将懒猫微服相关应用加入排除列表，避免本地服务流量被代理接管。</li>
          <li>配置完成后，如仍无法访问懒猫服务，请重新启动 Karing 或重新连接代理。</li>
        </ol>
      </div>
    </div>
  );
}

function KaringExcludeAppPanel() {
  return (
    <div className="rounded-box border border-base-300 bg-base-100 p-4 text-sm leading-6 text-base-content/80">
      <p>将懒猫微服相关应用加入 Karing 的排除应用列表，避免本地服务流量进入代理回环。</p>
      <div className="mt-4 flex justify-end">
        <MobileImageGuideDialog
          title="排除应用"
          ariaLabel="查看 Karing 排除应用图示"
          buttonLabel="如何排除应用"
          images={karingExcludeAppImages}
        />
      </div>
    </div>
  );
}

export function KaringMobileSolution({ app, mode, onBack }: KaringMobileSolutionProps) {
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
      renderStepContent={() => <KaringExcludeAppPanel />}
    />
  );

  return (
    <MobileSolutionFrame
      app={app}
      onBack={handleBack}
      storageKey={tabStorageKey}
      tabs={[
        { key: "steps", label: "解决步骤", content: stepsContent },
        { key: "known", label: "使用须知", content: <KaringKnownIssues /> }
      ]}
    />
  );
}
