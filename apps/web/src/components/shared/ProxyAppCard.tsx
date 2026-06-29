import { Link } from "react-router-dom";
import type { ProxyApp } from "../../types/proxy";
import { ProxyAppIcon } from "./ProxyAppIcon";

type ProxyAppCardProps = {
  app: ProxyApp;
};

export function ProxyAppCard({ app }: ProxyAppCardProps) {
  return (
    <Link className="card card-border bg-base-100 text-left shadow-sm transition hover:shadow-md" to={`/apps/${app.id}`}>
      <div className="card-body flex-row items-center gap-4 p-4 sm:block sm:p-8">
        <ProxyAppIcon app={app} />
        <div className="min-w-0 space-y-1 sm:mt-5 sm:space-y-2">
          <h2 className="truncate text-xl font-bold sm:text-2xl">{app.name}</h2>
          <p className="text-sm text-base-content/60">查看适配方案</p>
        </div>
      </div>
    </Link>
  );
}
