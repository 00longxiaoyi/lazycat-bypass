import { useMemo, useState } from "react";
import { ImageGuideDialog } from "../../shared/ImageGuideDialog";
import { processClashConfig } from "../../../lib/clashProcessor";

const DEFAULT_FILE_NAME = "lazycat-clash.yaml";

type ProcessState = {
  output: string;
  fileName: string;
  addedRules: number;
  addedTunExcludes: number;
  enabledDnsIpv6: boolean;
};

function buildOutputFileName(fileName: string) {
  const cleanName = fileName.trim() || DEFAULT_FILE_NAME;
  const dotIndex = cleanName.lastIndexOf(".");

  if (dotIndex <= 0) {
    return `${cleanName}.lazycat.yaml`;
  }

  return `${cleanName.slice(0, dotIndex)}.lazycat${cleanName.slice(dotIndex)}`;
}

async function copyToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "true");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  textarea.style.top = "0";
  document.body.appendChild(textarea);
  textarea.select();

  const copied = document.execCommand("copy");
  document.body.removeChild(textarea);

  if (!copied) {
    throw new Error("当前浏览器不允许自动复制，请手动选中结果复制");
  }
}

type ClashConfigGeneratorProps = {
  appId: string;
  appName: string;
  currentStep: number;
  onStepChange: (step: number) => void;
};

function getConfigHelpImages(appId: string, appName: string) {
  if (appId === "flclash") {
    return Array.from({ length: 2 }, (_, index) => ({
      src: `/imgs/flclash/flcash-get-config-${index + 1}.png`,
      alt: `获取 ${appName} 配置文件第 ${index + 1} 步示意图`
    }));
  }

  return [{ src: "/imgs/clash-part/clash-part-get-config.png", alt: `获取 ${appName} 配置文件示意图` }];
}

export function ClashConfigGenerator({ appId, appName, currentStep, onStepChange }: ClashConfigGeneratorProps) {
  const [input, setInput] = useState("");
  const [sourceName, setSourceName] = useState(DEFAULT_FILE_NAME);
  const [result, setResult] = useState<ProcessState | null>(null);
  const [error, setError] = useState("");
  const [copyText, setCopyText] = useState("复制结果");

  const canProcess = useMemo(() => input.trim().length > 0, [input]);

  function resetResult() {
    setResult(null);
    setError("");
    setCopyText("复制结果");
  }

  function doProcess(nextInput = input, nextSourceName = sourceName) {
    setError("");
    setCopyText("复制结果");

    try {
      const processed = processClashConfig(nextInput);
      setResult({
        output: processed.yaml,
        fileName: buildOutputFileName(nextSourceName),
        addedRules: processed.addedRules,
        addedTunExcludes: processed.addedTunExcludes,
        enabledDnsIpv6: processed.enabledDnsIpv6
      });
      onStepChange(2);
    } catch (caughtError) {
      setResult(null);
      setError(caughtError instanceof Error ? caughtError.message : "配置处理失败，请检查 YAML 格式");
    }
  }

  async function handleUpload(file: File | undefined) {
    if (!file) return;

    resetResult();
    const content = await file.text();
    setSourceName(file.name);
    setInput(content);
    onStepChange(1);
  }

  async function doCopy() {
    if (!result) return;

    try {
      await copyToClipboard(result.output);
      setCopyText("已复制");
      window.setTimeout(() => setCopyText("复制结果"), 1600);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "复制失败，请手动复制结果");
    }
  }

  function doDownload() {
    if (!result) return;

    const blob = new Blob([result.output], { type: "text/yaml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = result.fileName;
    link.click();
    URL.revokeObjectURL(url);
  }

  function handleImportNext() {
    if (!canProcess) return;

    onStepChange(1);
  }

  function handleBack() {
    onStepChange(Math.max(0, currentStep - 1));
  }

  return (
    <div className="card card-border bg-base-100 shadow-sm">
      <div className="card-body gap-5 p-4 sm:p-8">
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <h2 className="card-title">生成 Clash / Mihomo 配置</h2>
          <ImageGuideDialog
            id="get-config-guide"
            buttonLabel="获取配置文件？"
            title="获取配置文件"
            description={`按图示位置找到并导出 ${appName} 当前配置文件。`}
            images={getConfigHelpImages(appId, appName)}
          />
        </div>
      {currentStep === 0 ? (
        <div className="space-y-4">
          <input
            type="file"
            accept=".yaml,.yml,text/yaml,text/plain"
            className="file-input min-h-12 w-full"
            onChange={(event) => void handleUpload(event.target.files?.[0])}
          />
          <textarea
            className="textarea min-h-72 w-full font-mono text-xs leading-5"
            placeholder="把 Clash / Mihomo YAML 配置粘贴到这里"
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
              resetResult();
            }}
          />
          {error ? <div role="alert" className="alert alert-error text-sm">{error}</div> : null}
          <div className="card-actions justify-end">
            <button className="btn btn-primary" type="button" disabled={!canProcess} onClick={handleImportNext}>下一步</button>
          </div>
        </div>
      ) : null}

      {currentStep === 1 ? (
        <div className="space-y-4">
          <div role="status" className="alert min-h-12 text-sm">
            请确认下方导入配置内容无误，然后点击合并配置。
          </div>
          <textarea className="textarea min-h-72 w-full font-mono text-xs leading-5" readOnly value={input} />
          {error ? <div role="alert" className="alert alert-error text-sm">{error}</div> : null}
          <div className="card-actions justify-between">
            <button className="btn btn-outline" type="button" onClick={handleBack}>上一步</button>
            <button className="btn btn-primary" type="button" disabled={!canProcess} onClick={() => doProcess()}>合并配置</button>
          </div>
        </div>
      ) : null}

      {currentStep === 2 ? (
        <div className="space-y-4">
          {result ? (
            <>
              <div role="alert" className="alert alert-success min-h-12 text-sm">
                已生成：新增 {result.addedRules} 条直连规则{result.addedTunExcludes > 0 ? `，新增 ${result.addedTunExcludes} 条 TUN 排除网段` : ""}{result.enabledDnsIpv6 ? "，已开启 DNS IPv6" : ""}。
              </div>
              <textarea className="textarea min-h-72 w-full font-mono text-xs leading-5" readOnly value={result.output} />
            </>
          ) : (
            <div role="alert" className="alert alert-error text-sm">请先完成配置合并。</div>
          )}
          <div className="card-actions justify-between gap-3">
            <button className="btn btn-outline" type="button" onClick={handleBack}>上一步</button>
            {result ? (
              <div className="flex flex-wrap justify-end gap-3">
                <button className="btn btn-primary" type="button" onClick={() => void doCopy()}>{copyText}</button>
                <button className="btn btn-outline" type="button" onClick={doDownload}>下载配置文件</button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
      </div>
    </div>
  );
}
