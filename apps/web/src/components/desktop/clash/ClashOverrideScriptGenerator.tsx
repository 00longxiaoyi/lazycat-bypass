import { useState } from "react";
import clashOverrideScript from "../../../data/clash-override-script.json";
import { ImageGuideDialog } from "../../shared/ImageGuideDialog";

const overrideScript = clashOverrideScript.lines.join("\n");
const clashVergeOverrideScript = `// https://clashparty.org/docs/guide/override/javascript
function main(config) {
  // 1. DNS: 开启 IPv6
  if (!config.dns) config.dns = {};
  config.dns.ipv6 = true;
  // 2. TUN: 添加 route-exclude-address
  if (!config.tun) config.tun = {};
  if (!config.tun["route-exclude-address"]) {
    config.tun["route-exclude-address"] = [];
  }
  const excludeAddresses = [
    "6.6.6.6/32",
    "2000::6666/128",
    "fc00::/7",
    "fc03:1136:3800::/40",
  ];
  for (const address of excludeAddresses) {
    if (!config.tun["route-exclude-address"].includes(address)) {
      config.tun["route-exclude-address"].push(address);
    }
  }
  // 3. Rules: 添加直连规则
  if (!config.rules) config.rules = [];
  const rules = [
    "DOMAIN-SUFFIX,heiyu.space,DIRECT",
    "DOMAIN-SUFFIX,lazycat.cloud,DIRECT",
    "IP-CIDR,6.6.6.6/32,DIRECT,no-resolve",
    "IP-CIDR6,2000::6666/128,DIRECT,no-resolve",
    "IP-CIDR6,fc03:1136:3800::/40,DIRECT,no-resolve",
  ];

  config.rules.unshift(...rules);
  return config;
}`;

function getOverrideScript(appId: string) {
  return appId === "clash-verge" ? clashVergeOverrideScript : overrideScript;
}

function getOverrideScriptHelpImages(appId: string, appName: string) {
  if (appId === "flclash") {
    return Array.from({ length: 4 }, (_, index) => ({
      src: `/imgs/flclash/flclash-use-script-${index + 1}.png`,
      alt: `使用 ${appName} 覆写脚本第 ${index + 1} 步示意图`
    }));
  }

  if (appId === "clash-verge") {
    return Array.from({ length: 2 }, (_, index) => ({
      src: `/imgs/clash-verge/pc/clash-verge-import-config-${index + 1}.png`,
      alt: `使用 ${appName} 覆写脚本第 ${index + 1} 步示意图`
    }));
  }

  return Array.from({ length: 5 }, (_, index) => ({
    src: `/imgs/clash-part/clash-part-use-script-${index + 1}.png`,
    alt: `使用 ${appName} 覆写脚本第 ${index + 1} 步示意图`
  }));
}

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
    throw new Error("当前浏览器不允许自动复制，请手动选中脚本复制");
  }
}

type ClashOverrideScriptGeneratorProps = {
  appId: string;
  appName: string;
};

export function ClashOverrideScriptGenerator({ appId, appName }: ClashOverrideScriptGeneratorProps) {
  const [copyStatus, setCopyStatus] = useState("复制脚本");
  const [error, setError] = useState("");
  const appOverrideScript = getOverrideScript(appId);

  async function handleCopy() {
    setError("");

    try {
      await copyText(appOverrideScript);
      setCopyStatus("已复制");
      window.setTimeout(() => setCopyStatus("复制脚本"), 1600);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "复制失败，请手动复制脚本");
    }
  }

  return (
    <div className="card card-border bg-base-100 shadow-sm">
      <div className="card-body gap-5">
        <div className="flex items-center justify-between gap-4">
          <h2 className="card-title">导入覆写脚本</h2>
          <ImageGuideDialog
            id="override-script-guide"
            buttonLabel="使用脚本？"
            title="使用覆写脚本"
            description={`按图示位置粘贴 ${appName} JavaScript 覆写脚本。`}
            images={getOverrideScriptHelpImages(appId, appName)}
          />
        </div>
        {error ? <div role="alert" className="alert alert-error text-sm">{error}</div> : null}
        <textarea className="textarea min-h-96 w-full font-mono text-xs leading-5" readOnly value={appOverrideScript} />
        <div className="card-actions justify-end">
          <button className="btn btn-primary" type="button" onClick={() => void handleCopy()}>{copyStatus}</button>
        </div>
      </div>
    </div>
  );
}
