import { Ipv6CheckInfo } from "../../shared/Ipv6CheckInfo";
import { Ipv4ExitInfo } from "../../shared/Ipv4ExitInfo";
import type { SurgeDesktopMethod } from "./SurgeDesktopConfigGenerator";

type SurgeDesktopKnownIssuesProps = {
  activeMethod: SurgeDesktopMethod;
};

export function SurgeDesktopKnownIssues({ activeMethod }: SurgeDesktopKnownIssuesProps) {
  const isModuleMethod = activeMethod === "module";

  if (isModuleMethod) {
    return (
      <div className="space-y-4">
        <div className="text-sm leading-6 text-base-content/80">
          <p>兼容性不好，在没有 IPv6 的情况下会影响打洞。</p>
        </div>
        <Ipv6CheckInfo defaultOpen={false} />
      </div>
    );
  }

  return (
    <div className="space-y-4 text-sm leading-6 text-base-content/80">
      <div className="space-y-2">
        <h3 className="text-base font-bold text-base-content">如果没有 IPv6 只有 IPv4</h3>
        <ol className="list-decimal space-y-1 pl-5">
          <li>需要知晓 Lazycat 的 IPv4 出口节点信息。</li>
          <li>如果没有公网 IPv4 的话，IPv4 出口节点会时不时变化。</li>
        </ol>
      </div>
      <Ipv4ExitInfo defaultOpen={false} />
      <Ipv6CheckInfo defaultOpen={false} />
    </div>
  );
}
