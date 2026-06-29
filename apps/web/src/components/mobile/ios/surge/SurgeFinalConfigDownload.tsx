type SurgeFinalConfigDownloadProps = {
  existingConfigName: string;
};

function getConfigFileName(configName: string) {
  const trimmedName = configName.trim() || "Nexitally_Surge";
  return trimmedName.toLowerCase().endsWith(".conf") ? trimmedName : `${trimmedName}.conf`;
}

export function SurgeFinalConfigDownload({ existingConfigName }: SurgeFinalConfigDownloadProps) {
  const existingConfigFileName = getConfigFileName(existingConfigName);
  const surgeFinalConfig = `[Proxy]
#!include ${existingConfigFileName}, Lazycat.conf

[Proxy Group]
#!include ${existingConfigFileName}

[General]
#!include ${existingConfigFileName}

[Rule]
#!include Lazycat.conf, ${existingConfigFileName}
`;

  function handleDownload() {
    const blob = new Blob([surgeFinalConfig], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Lazycat-surge.conf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="w-full space-y-3">
      <div className="mockup-code max-h-96 overflow-auto text-xs">
        {surgeFinalConfig.split("\n").map((line, index) => (
          <pre key={`${index}-${line}`}><code>{line || " "}</code></pre>
        ))}
      </div>
      <button className="btn btn-primary btn-sm w-full" type="button" onClick={handleDownload}>下载最终配置</button>
    </div>
  );
}
