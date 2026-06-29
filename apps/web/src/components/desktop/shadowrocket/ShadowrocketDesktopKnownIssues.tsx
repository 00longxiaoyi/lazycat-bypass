import { Ipv6CheckInfo } from "../../shared/Ipv6CheckInfo";

export function ShadowrocketDesktopKnownIssues() {
  return (
    <div className="card card-border bg-base-100 shadow-sm">
      <div className="card-body gap-4">
        <h2 className="card-title">已知问题</h2>
        <div className="text-sm leading-6 text-base-content/80">
          <p>没有 IPv6 的情况下无法直连。</p>
        </div>
        <Ipv6CheckInfo />
      </div>
    </div>
  );
}
