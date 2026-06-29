import { useState, type ChangeEvent } from "react";
import { processSurgeConfig, type SurgeProcessResult } from "../../../../lib/surgeProcessor";
import { SurgeConfigUploadHelpDialog } from "./SurgeConfigUploadHelpDialog";
import { MobileConfigShell } from "../../MobileConfigShell";
import { MobileStepPager } from "../../MobileStepPager";

type GeneratedConfig = SurgeProcessResult & {
  fileName: string;
};

const surgeUploadSteps = ["上传现有配置", "下载新配置"];

function downloadConfig(fileName: string, content: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function SurgeConfigUploadGenerator() {
  const [generatedConfig, setGeneratedConfig] = useState<GeneratedConfig | null>(null);
  const [sourceConfig, setSourceConfig] = useState("");
  const [error, setError] = useState("");

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setError("");
    setGeneratedConfig(null);
    setSourceConfig("");

    if (!file) return;

    try {
      const sourceText = await file.text();
      const result = processSurgeConfig(sourceText);
      setSourceConfig(sourceText);
      setGeneratedConfig({ ...result, fileName: "lazycat-fix.conf" });
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "配置处理失败，请重新上传 Surge 配置文件");
    }
  }

  return (
    <MobileConfigShell notice={<div role="alert" className="alert alert-info text-sm">所有操作均在前端进行合并，所以信息都只会在前端，可放心使用！！！</div>}>
      <MobileStepPager
        items={surgeUploadSteps}
        canGoNext={() => Boolean(generatedConfig)}
        renderTitleAction={(index) => (
          <SurgeConfigUploadHelpDialog step={index === 0 ? "export" : "import"} />
        )}
        renderStepContent={(index) => {
          if (index === 0) return (
            <div className="space-y-3">
              <input className="file-input file-input-bordered w-full" type="file" accept=".conf,.txt,text/plain" onChange={(event) => void handleFileChange(event)} />
              {error ? <div role="alert" className="alert alert-error text-sm">{error}</div> : null}
              <textarea className="textarea min-h-80 w-full font-mono text-xs leading-5" readOnly value={sourceConfig} />
            </div>
          );

          return (
            <div className="space-y-3">
              <textarea className="textarea min-h-80 w-full font-mono text-xs leading-5" readOnly value={generatedConfig?.config ?? ""} />
              <button className="btn btn-primary btn-sm w-full" type="button" disabled={!generatedConfig} onClick={() => generatedConfig ? downloadConfig(generatedConfig.fileName, generatedConfig.config) : undefined}>
                下载新配置
              </button>
            </div>
          );
        }}
      />
    </MobileConfigShell>
  );
}
