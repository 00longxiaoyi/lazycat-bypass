import { useState, type ChangeEvent } from "react";
import { processShadowrocketPcConfig } from "../../../lib/shadowrocketProcessor";

type ShadowrocketDesktopConfigGeneratorProps = {
  currentStep: number;
  onStepChange: (step: number) => void;
};

function downloadConfig(content: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "lazycat-fix.conf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function ShadowrocketDesktopConfigGenerator({ currentStep, onStepChange }: ShadowrocketDesktopConfigGeneratorProps) {
  const [sourceConfig, setSourceConfig] = useState("");
  const [error, setError] = useState("");

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setError("");
    setSourceConfig("");
    onStepChange(0);

    if (!file) return;

    try {
      const sourceText = await file.text();
      setSourceConfig(sourceText);
    } catch {
      setError("配置处理失败，请重新上传 Shadowrocket 配置文件");
    }
  }

  const generatedConfig = sourceConfig.trim() ? processShadowrocketPcConfig(sourceConfig) : "";
  const canGoNext = generatedConfig.trim().length > 0;

  return (
    <>
      {currentStep === 0 ? (
        <div className="card card-border bg-base-100 shadow-sm">
          <div className="card-body gap-4">
            <div className="flex items-center justify-between gap-4">
              <h2 className="card-title">上传配置文件</h2>
            </div>
            <input className="file-input file-input-bordered w-full" type="file" accept=".conf,.txt,.ini,text/plain" onChange={(event) => void handleFileChange(event)} />
            {error ? <div role="alert" className="alert alert-error text-sm">{error}</div> : null}
            <textarea className="textarea min-h-72 w-full font-mono text-xs leading-5" value={sourceConfig} onChange={(event) => setSourceConfig(event.target.value)} placeholder="请粘贴或编辑 Shadowrocket 配置文件内容" />
            <div className="card-actions justify-end">
              <button className="btn btn-primary btn-sm" type="button" disabled={!canGoNext} onClick={() => onStepChange(1)}>
                下一步
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {currentStep === 1 && generatedConfig ? (
        <div className="card card-border bg-base-100 shadow-sm">
          <div className="card-body gap-4">
            <div className="flex items-center justify-between gap-4">
              <h2 className="card-title">下载新配置文件</h2>
              <button className="btn btn-primary btn-sm" type="button" onClick={() => downloadConfig(generatedConfig)}>
                下载新配置
              </button>
            </div>
            <textarea className="textarea min-h-96 w-full font-mono text-xs leading-5" readOnly value={generatedConfig} />
            <div className="card-actions justify-start">
              <button className="btn btn-ghost btn-sm" type="button" onClick={() => onStepChange(0)}>
                上一步
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
