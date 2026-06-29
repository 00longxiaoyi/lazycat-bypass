import type { ReactNode } from "react";
import type { ProxyApp } from "../../types/proxy";
import { ProxyAppIcon } from "./ProxyAppIcon";

type SolutionLayoutProps = {
  app: ProxyApp;
  onBack: () => void;
  leftPanel: ReactNode;
  children: ReactNode;
};

function AppHeader({ app, onBack }: { app: ProxyApp; onBack: () => void }) {
  return (
    <div className="card card-border bg-base-100 shadow-sm">
      <div className="card-body gap-4 p-4 sm:gap-5 sm:p-8">
        <div className="card-actions justify-start">
          <button className="btn btn-ghost btn-sm" type="button" onClick={onBack}>← 返回列表</button>
        </div>
        <div className="flex items-center gap-4 sm:gap-5">
          <ProxyAppIcon app={app} size="compact" />
          <div className="flex min-h-14 min-w-0 flex-col justify-center gap-2 sm:min-h-16">
            <h1 className="truncate text-2xl font-bold leading-none sm:text-3xl">{app.name}</h1>
            {app.recommendedVersion ? (
              <div className="badge badge-primary badge-outline self-start">推荐版本：{app.recommendedVersion}</div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SolutionLayout({ app, onBack, leftPanel, children }: SolutionLayoutProps) {
  return (
    <section className="mx-auto w-full max-w-[90rem] px-3 py-4 sm:px-4 sm:py-8">
      <div className="space-y-4 lg:hidden">
        <AppHeader app={app} onBack={onBack} />
        <div className="space-y-4">{children}</div>
        <div className="space-y-4">{leftPanel}</div>
      </div>

      <div className="hidden gap-6 lg:grid lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-6 self-start">
          <AppHeader app={app} onBack={onBack} />
          {leftPanel}
        </div>

        <div className="space-y-6">{children}</div>
      </div>
    </section>
  );
}
