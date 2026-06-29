import type { ReactNode } from "react";
import type { ProxyApp } from "../../types/proxy";
import { ProxyAppCard } from "./ProxyAppCard";

type HomePageProps = {
  apps: ProxyApp[];
  beforeList?: ReactNode;
};

export function HomePage({ apps, beforeList }: HomePageProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-3 py-5 sm:px-4 sm:py-12">
      {beforeList}

      <div className="grid gap-3 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {apps.map((app) => (
          <ProxyAppCard key={app.id} app={app} />
        ))}
      </div>

      {apps.length === 0 ? (
        <div role="status" className="alert mt-6 text-sm">当前设备暂时没有可用客户端。</div>
      ) : null}
    </section>
  );
}
