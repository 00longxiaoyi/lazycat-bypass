export function ShadowrocketMobileKnownIssues() {
  return (
    <div className="rounded-box border border-base-300 bg-base-100 p-4">
      <ol className="list-decimal space-y-3 pl-5 text-sm leading-6 text-base-content/80">
        <li>配置后直连的速度会变慢。</li>
        <li>如果没有 ipv6 的情况很有可能会导致无法直连。</li>
      </ol>
      <p className="mt-4 text-sm leading-6 text-base-content/70">
        <span className="block">如何确认自己是否有 ipv6？</span>
        <span className="block">请访问：</span>
        <a className="link link-primary block w-fit" href="https://ip.sb" target="_blank" rel="noreferrer">https://ip.sb</a>
        <span className="block">或者</span>
        <a className="link link-primary block w-fit" href="https://test6.ustc.edu.cn" target="_blank" rel="noreferrer">https://test6.ustc.edu.cn</a>
      </p>
    </div>
  );
}
