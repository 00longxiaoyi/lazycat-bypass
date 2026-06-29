import { useState } from "react";

const surgeModuleConfig = `#!name=lazycat
#!desc=处理通用配置中的兼容性问题

[General]
compatibility-mode = 5
always-real-ip = %APPEND% *.lazycat.cloud
skip-proxy = %APPEND% 6.6.6.6/32, 2000::6666/128, fc00::/7, fc03:1136:3800::/40
ipv6 = true
ipv6-vif = auto
tun-excluded-routes =  %APPEND% 6.6.6.6/32, 2000::6666/128, fc00::/7, fc03:1136:3800::/40
`;

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
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  document.body.removeChild(textarea);

  if (!copied) throw new Error("复制失败");
}

export function SurgeModuleConfigCopy() {
  const defaultCopyStatus = "复制模块配置";
  const [copyStatus, setCopyStatus] = useState(defaultCopyStatus);

  async function handleCopy() {
    try {
      await copyText(surgeModuleConfig);
      setCopyStatus("已复制");
      window.setTimeout(() => setCopyStatus(defaultCopyStatus), 1600);
    } catch {
      setCopyStatus("复制失败");
      window.setTimeout(() => setCopyStatus(defaultCopyStatus), 1600);
    }
  }

  return (
    <div className="w-full space-y-3">
      <div className="mockup-code max-h-96 overflow-auto text-xs">
        {surgeModuleConfig.split("\n").map((line, index) => (
          <pre key={`${index}-${line}`}><code>{line || " "}</code></pre>
        ))}
      </div>
      <button className="btn btn-primary btn-sm w-full" type="button" onClick={() => void handleCopy()}>{copyStatus}</button>
    </div>
  );
}
