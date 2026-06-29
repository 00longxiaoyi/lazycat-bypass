export function SurgeMobileKnownIssues() {
  return (
    <div className="space-y-3">
      <div className="rounded-box border border-base-300 bg-base-100 p-4 text-sm leading-6 text-base-content/80">
        <h2 className="mb-2 font-medium text-base-content">方案一</h2>
        <div className="space-y-2">
          <div>
            <p className="font-medium text-base-content">存在的问题：</p>
            <ol className="list-decimal pl-5">
              <li>更新订阅后会导致配置失效。</li>
            </ol>
          </div>
          <div>
            <p className="font-medium text-base-content">优点：</p>
            <p>稳定，在没有 IPv6 的情况下也不影响打洞。</p>
          </div>
        </div>
      </div>

      <div className="rounded-box border border-base-300 bg-base-100 p-4 text-sm leading-6 text-base-content/80">
        <h2 className="mb-2 font-medium text-base-content">方案二</h2>
        <div className="space-y-2">
          <div>
            <p className="font-medium text-base-content">存在的问题：</p>
            <ol className="list-decimal pl-5">
              <li>兼容性不好，在没有 IPv6 的情况下会影响打洞。</li>
            </ol>
          </div>
          <div>
            <p className="font-medium text-base-content">优点：</p>
            <p>可以随意更新订阅地址，不影响配置。</p>
          </div>
        </div>
      </div>

      <div className="rounded-box border border-base-300 bg-base-100 p-4 text-sm leading-6 text-base-content/80">
        <h2 className="mb-2 font-medium text-base-content">怎么判断是否自己有 IPv6？</h2>
        <p>关闭代理软件的情况下，访问以下地址：</p>
        <ol className="mt-2 list-decimal space-y-1 pl-5">
          <li>
            <a className="link link-primary" href="https://ip.sb" target="_blank" rel="noreferrer">https://ip.sb</a>
          </li>
          <li>
            <a className="link link-primary" href="https://test6.ustc.edu.cn" target="_blank" rel="noreferrer">https://test6.ustc.edu.cn</a>
          </li>
        </ol>
      </div>
    </div>
  );
}
