const surgeInitialConfig = `[Proxy]
Lazycat = socks5, 127.0.0.1, 31086

[Rule]
DOMAIN-SUFFIX,heiyu.space,Lazycat
DOMAIN-SUFFIX,lazycat.cloud,DIRECT
IP-CIDR,6.6.6.6/32,DIRECT,no-resolve
IP-CIDR6,2000::6666/128,DIRECT,no-resolve
IP-CIDR6,fc03:1136:3800::/40,DIRECT,no-resolve
`;

export function SurgeInitialConfigDownload() {
  function handleDownload() {
    const blob = new Blob([surgeInitialConfig], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Lazycat.conf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="w-full space-y-3">
      <div className="mockup-code max-h-96 overflow-auto text-xs">
        {surgeInitialConfig.split("\n").map((line, index) => (
          <pre key={`${index}-${line}`}><code>{line || " "}</code></pre>
        ))}
      </div>
      <button className="btn btn-primary btn-sm w-full" type="button" onClick={handleDownload}>下载配置文件</button>
    </div>
  );
}
