import type { ProxyApp } from "../../types/proxy";
import { ProxyAppIcon } from "../shared/ProxyAppIcon";

type DesktopAppHeaderProps = {
  app: ProxyApp;
  onBack: () => void;
};

export function DesktopAppHeader({ app, onBack }: DesktopAppHeaderProps) {
  return (
    <div className="card card-border bg-base-100 shadow-sm">
      <div className="card-body gap-5">
        <div className="card-actions justify-start">
          <button className="btn btn-ghost btn-sm" type="button" onClick={onBack}>← 返回列表</button>
        </div>
        <div className="flex items-center gap-5">
          <ProxyAppIcon app={app} size="detail" />
          <div className="flex min-h-16 flex-col justify-center gap-2">
            <h1 className="text-3xl font-bold leading-none">{app.name}</h1>
            {app.recommendedVersion ? (
              <div className="badge badge-primary badge-outline self-start">推荐版本：{app.recommendedVersion}</div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
