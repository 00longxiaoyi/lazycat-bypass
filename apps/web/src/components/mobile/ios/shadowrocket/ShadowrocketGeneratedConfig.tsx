import { processShadowrocketIosConfig } from "../../../../lib/shadowrocketProcessor";

type ShadowrocketGeneratedConfigProps = {
  sourceConfig: string;
};

export function ShadowrocketGeneratedConfig({ sourceConfig }: ShadowrocketGeneratedConfigProps) {
  const generatedConfig = sourceConfig.trim() ? processShadowrocketIosConfig(sourceConfig) : "";

  function handleDownload() {
    const blob = new Blob([generatedConfig], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "shadowrocket-lazycat.conf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  if (!generatedConfig) {
    return (
      <div role="alert" className="alert alert-warning text-sm">
        请先在上一步输入 Shadowrocket 配置文件。
      </div>
    );
  }

  return (
    <div className="w-full space-y-3">
      <button className="btn btn-primary btn-sm w-full" type="button" onClick={handleDownload}>下载最终文件</button>
      <textarea className="textarea min-h-80 w-full font-mono text-xs leading-5" readOnly value={generatedConfig} />
    </div>
  );
}
