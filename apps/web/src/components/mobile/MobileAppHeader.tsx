import { useEffect, useState } from "react";
import type { ProxyApp } from "../../types/proxy";

type MobileAppHeaderProps = {
  app: ProxyApp;
  onBack: () => void;
};

export function MobileAppHeader({ app, onBack }: MobileAppHeaderProps) {
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    if (!showHelp) return;

    const timer = window.setTimeout(() => setShowHelp(false), 10000);
    return () => window.clearTimeout(timer);
  }, [showHelp]);

  return (
    <div className="card card-border bg-base-100 shadow-sm">
      <div className="card-body relative gap-3 p-4">
        <div className="grid grid-cols-[2rem_1fr_2rem] items-center gap-2">
          <button className="btn btn-ghost btn-circle btn-sm text-lg font-bold" type="button" aria-label="返回列表" onClick={onBack}>←</button>
          <h1 className="truncate text-center text-xl font-bold leading-tight">{app.name}</h1>
          <button className="btn btn-ghost btn-circle btn-sm text-lg font-bold" type="button" aria-label="查看安全提示" onClick={() => setShowHelp((value) => !value)}>?</button>
        </div>
        {showHelp ? (
          <button className="absolute inset-0 z-10 cursor-default bg-transparent" type="button" aria-label="关闭安全提示" onClick={() => setShowHelp(false)} />
        ) : null}
        {showHelp ? (
          <div className="absolute right-4 top-12 z-20 max-w-72 rounded-box border border-base-300 bg-base-100 p-3 text-left text-sm leading-6 text-base-content/70 shadow-lg">
            所有操作均在前端进行合并，所以信息都只会在前端，可放心使用！！！
          </div>
        ) : null}
        {app.recommendedVersion ? (
          <div className="badge badge-primary badge-outline self-start">推荐版本：{app.recommendedVersion}</div>
        ) : null}
      </div>
    </div>
  );
}
