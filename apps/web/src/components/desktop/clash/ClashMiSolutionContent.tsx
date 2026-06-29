import { useState } from "react";
import { ImageGuideDialog } from "../../shared/ImageGuideDialog";

const clashMiOverrideScriptUrl = "https://raw.githubusercontent.com/wlabbyflower/peppapigconfigurationguide/refs/heads/main/docs/03-%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%85%B1%E5%AD%98/macOS/clash-script/clash_mi.js";
const clashMiImportGuideImages = Array.from({ length: 6 }, (_, index) => ({
  src: `/imgs/clash-mi/clash-mi-set-script-config-${index + 1}.png`,
  alt: `导入覆写文件第 ${index + 1} 步示意图`
}));

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
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
    throw new Error("当前浏览器不允许自动复制，请手动复制地址");
  }
}

function ClashMiAddressPanel() {
  const [copyStatus, setCopyStatus] = useState("一键复制");

  async function handleCopy() {
    try {
      await copyText(clashMiOverrideScriptUrl);
      setCopyStatus("已复制");
      window.setTimeout(() => setCopyStatus("一键复制"), 1600);
    } catch {
      setCopyStatus("复制失败");
      window.setTimeout(() => setCopyStatus("一键复制"), 1600);
    }
  }

  return (
    <div className="card card-border bg-base-100 shadow-sm">
      <div className="card-body gap-4 p-4 sm:gap-5 sm:p-8">
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <h2 className="card-title">覆写文件地址</h2>
          <ImageGuideDialog
            id="clash-mi-import-guide"
            buttonLabel="导入覆写文件？"
            title="导入覆写文件"
            description="按图示位置把覆写文件地址填入对应配置入口。"
            images={clashMiImportGuideImages}
          />
        </div>
        <input className="input input-bordered w-full font-mono text-xs" readOnly value={clashMiOverrideScriptUrl} />
        <div className="card-actions justify-end">
          <button className="btn btn-primary" type="button" onClick={() => void handleCopy()}>{copyStatus}</button>
        </div>
      </div>
    </div>
  );
}

export function ClashMiSolutionContent() {
  return <ClashMiAddressPanel />;
}
