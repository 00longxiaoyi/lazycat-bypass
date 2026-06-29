import { useState, type ChangeEvent } from "react";
import { processSurgePcConfig } from "../../../lib/surgePcProcessor";
import { ImageGuideDialog } from "../../shared/ImageGuideDialog";

export type SurgeDesktopMethod = "config" | "module";
const missingIpv4ConfirmMessage = "请确认是否有ipv6, 如果没有ipv6 且不提供ipv4地址，大概率会导致无法直连。";
const surgeMacExportConfigImages = [
  { src: "/imgs/surge/mac/surge-mac-export-config-1.png", alt: "Surge Mac 导出配置第 1 步" },
  { src: "/imgs/surge/mac/surge-mac-export-config-2.png", alt: "Surge Mac 导出配置第 2 步" },
  { src: "/imgs/surge/mac/surge-mac-export-config-3.png", alt: "Surge Mac 导出配置第 3 步" }
];
const surgeMacImportConfigImages = [
  { src: "/imgs/surge/mac/surge-mac-import-config-1.png", alt: "Surge Mac 导入配置第 1 步" },
  { src: "/imgs/surge/mac/surge-mac-import-config-2.png", alt: "Surge Mac 导入配置第 2 步" },
  { src: "/imgs/surge/mac/surge-mac-import-config-3.png", alt: "Surge Mac 导入配置第 3 步" },
  { src: "/imgs/surge/mac/surge-mac-import-config-4.png", alt: "Surge Mac 导入配置第 4 步" }
];

type SurgeDesktopConfigGeneratorProps = {
  activeMethod: SurgeDesktopMethod;
  currentStep: number;
  onStepChange: (step: number) => void;
};

function downloadConfig(content: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "lazycat-surge.conf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function isValidIpv4Address(value: string) {
  const parts = value.trim().split(".");
  return parts.length === 4 && parts.every((part) => {
    if (!/^\d+$/.test(part)) return false;
    if (part.length > 1 && part.startsWith("0")) return false;
    const number = Number(part);
    return number >= 0 && number <= 255;
  });
}

export function SurgeDesktopConfigGenerator({ activeMethod, currentStep, onStepChange }: SurgeDesktopConfigGeneratorProps) {
  const [sourceConfig, setSourceConfig] = useState("");
  const [lazycatIpv4, setLazycatIpv4] = useState("");
  const [error, setError] = useState("");
  const [ipv4Error, setIpv4Error] = useState("");

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
      setError("配置处理失败，请重新上传 Surge 配置文件");
    }
  }

  const trimmedIpv4 = lazycatIpv4.trim();
  const isIpv4Valid = !trimmedIpv4 || isValidIpv4Address(trimmedIpv4);
  const generatedConfig = sourceConfig.trim() && isIpv4Valid ? processSurgePcConfig(sourceConfig, { lazycatIpv4: trimmedIpv4 || undefined }) : "";
  const canGoNext = sourceConfig.trim().length > 0;

  function handleIpv4Change(value: string) {
    setLazycatIpv4(value);
    const nextValue = value.trim();
    setIpv4Error(nextValue && !isValidIpv4Address(nextValue) ? "请输入正确的 IPv4 地址" : "");
  }

  function handleNextStep() {
    if (!isIpv4Valid) {
      setIpv4Error("请输入正确的 IPv4 地址");
      return;
    }

    if (!trimmedIpv4 && !window.confirm(missingIpv4ConfirmMessage)) return;

    onStepChange(1);
  }

  if (activeMethod === "module") {
    return (
      <div className="card card-border bg-base-100 shadow-sm">
        <div className="card-body gap-4">
          <h2 className="card-title">新增模块文件</h2>
          <p className="text-sm leading-6 text-base-content/70">模块文件方案待配置，当前请先使用“修改配置文件”。</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {currentStep === 0 ? (
        <div className="card card-border bg-base-100 shadow-sm">
          <div className="card-body gap-4">
            <div className="flex items-center justify-between gap-4">
              <h2 className="card-title">上传配置文件</h2>
              <ImageGuideDialog
                id="surge-mac-upload-config-guide"
                buttonLabel="上传配置？"
                title="上传 Surge 配置"
                description="按图示位置导出当前 Surge 配置文件，然后上传到这里生成新配置。"
                images={surgeMacExportConfigImages}
              />
            </div>
            <label className="form-control w-full gap-2">
              <input className={`input input-bordered w-full ${ipv4Error ? "input-error" : ""}`} type="text" inputMode="decimal" placeholder="Lazycat IPv4 出口地址（可选），例如：111.181.69.215" value={lazycatIpv4} onChange={(event) => handleIpv4Change(event.target.value)} />
              {ipv4Error ? <span className="label-text-alt text-error">{ipv4Error}</span> : null}
            </label>
            <input className="file-input file-input-bordered w-full" type="file" accept=".conf,.txt,.ini,text/plain" onChange={(event) => void handleFileChange(event)} />
            {error ? <div role="alert" className="alert alert-error text-sm">{error}</div> : null}
            <textarea className="textarea min-h-72 w-full font-mono text-xs leading-5" value={sourceConfig} onChange={(event) => setSourceConfig(event.target.value)} placeholder="请粘贴或编辑 Surge 配置文件内容" />
            <div className="card-actions justify-end">
              <button className="btn btn-primary btn-sm" type="button" disabled={!canGoNext} onClick={handleNextStep}>
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
              <ImageGuideDialog
                id="surge-mac-import-config-guide"
                buttonLabel="导入配置？"
                title="导入 Surge 配置"
                description="下载新配置文件后，按图示位置导入 Surge 并启用。"
                images={surgeMacImportConfigImages}
              />
            </div>
            <textarea className="textarea min-h-96 w-full font-mono text-xs leading-5" readOnly value={generatedConfig} />
            <div className="card-actions w-full justify-between">
              <button className="btn btn-ghost btn-sm" type="button" onClick={() => onStepChange(0)}>
                上一步
              </button>
              <button className="btn btn-primary btn-sm" type="button" onClick={() => downloadConfig(generatedConfig)}>
                下载新配置
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
