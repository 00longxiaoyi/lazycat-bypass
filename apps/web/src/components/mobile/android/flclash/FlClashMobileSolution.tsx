import { useState } from "react";
import type { DeviceMode, ProxyApp } from "../../../../types/proxy";
import { MobileImageGuideDialog } from "../../MobileImageGuideDialog";
import { MobileSolutionFrame } from "../../MobileSolutionFrame";
import { MobileStepPager } from "../../MobileStepPager";

const flClashImportScriptImages = Array.from({ length: 8 }, (_, index) => ({
  src: `/imgs/flclash/Android/flcash-import-script-${index + 1}.png`,
  alt: `FlClash 导入覆写脚本第 ${index + 1} 步`
}));

const flClashExcludeAppImages = Array.from({ length: 5 }, (_, index) => ({
  src: `/imgs/flclash/Android/flcash-set-export-app-${index + 1}.png`,
  alt: `FlClash 排除应用第 ${index + 1} 步`
}));

const flClashOverrideScript = [
  "// https://clashparty.org/docs/guide/override/javascript",
  "function main(config) {",
  "  // DNS: 开启 IPv6",
  "  const LazycatNodeName = \"LazycatNode\"",
  "  const LazycatNodeGroupsName = \"LazycatNodeGroups\"",
  "  if (!config.dns) config.dns = {};",
  "  config.dns.ipv6 = true;",
  "  // TUN: 添加 route-exclude-address",
  "  if (!config.tun) config.tun = {};",
  "  if (!config.tun[\"route-exclude-address\"]) {",
  "    config.tun[\"route-exclude-address\"] = [];",
  "  }",
  "  const excludeAddresses = [",
  "    \"6.6.6.6/32\",",
  "    \"2000::6666/128\",",
  "    \"fc00::/7\",",
  "    \"fc03:1136:3800::/40\",",
  "  ];",
  "  for (const address of excludeAddresses) {",
  "    if (!config.tun[\"route-exclude-address\"].includes(address)) {",
  "      config.tun[\"route-exclude-address\"].push(address);",
  "    }",
  "  }",
  "  // 添加Lazycat节点信息",
  "  const LazycatNode = {",
  "    name: LazycatNodeName,",
  "    type: \"http\",",
  "    server: \"127.0.0.1\",",
  "    port: 31085,",
  "  };",
  "",
  "  if (!Array.isArray(config.proxies)) {",
  "    config.proxies = [];",
  "  }",
  "",
  "  config.proxies.unshift(LazycatNode);",
  "",
  "  const LazycatNodeGroups = {",
  "    name: LazycatNodeGroupsName,",
  "    type: \"select\",",
  "    proxies: [\"LazycatNode\"],",
  "  };",
  "",
  "  if (!config[\"proxy-groups\"]) {",
  "    config[\"proxy-groups\"] = [];",
  "  }",
  "",
  "  config[\"proxy-groups\"].unshift(LazycatNodeGroups);",
  "",
  "  //  Rules: 添加直连规则",
  "  if (!config.rules) config.rules = [];",
  "  const rules = [",
  "    `DOMAIN-SUFFIX,heiyu.space,${LazycatNodeGroupsName}`,",
  "    \"DOMAIN-SUFFIX,lazycat.cloud,DIRECT\",",
  "    \"IP-CIDR,6.6.6.6/32,DIRECT,no-resolve\",",
  "    \"IP-CIDR6,2000::6666/128,DIRECT,no-resolve\",",
  "    \"IP-CIDR6,fc03:1136:3800::/40,DIRECT,no-resolve\",",
  "  ];",
  "  // 插入到最前面，并保持原始顺序",
  "  config.rules.unshift(...rules);",
  "  return config;",
  "}"
].join("\n");
type FlClashMobileSolutionProps = {
  app: ProxyApp;
  mode: DeviceMode;
  onBack: () => void;
};

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
    throw new Error("当前浏览器不允许自动复制，请手动复制脚本");
  }
}

function FlClashOverrideScriptPanel() {
  const [copyStatus, setCopyStatus] = useState("复制脚本");
  const [error, setError] = useState("");

  async function handleCopy() {
    setError("");

    try {
      await copyText(flClashOverrideScript);
      setCopyStatus("已复制");
      window.setTimeout(() => setCopyStatus("复制脚本"), 1600);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "复制失败，请手动复制脚本");
    }
  }

  return (
    <div className="rounded-box border border-base-300 bg-base-100 p-4">
      {error ? <div role="alert" className="alert alert-error mb-3 text-sm">{error}</div> : null}
      <textarea className="textarea min-h-96 w-full font-mono text-xs leading-5" readOnly value={flClashOverrideScript} />
      <div className="mt-3 flex justify-end">
        <button className="btn btn-primary btn-sm" type="button" onClick={() => void handleCopy()}>{copyStatus}</button>
      </div>
    </div>
  );
}

function FlClashExcludeAppPanel() {
  return (
    <div className="rounded-box border border-base-300 bg-base-100 p-4 text-sm leading-6 text-base-content/80">
      <p>将懒猫微服相关应用加入 FlClash 的排除应用列表，避免本地服务流量被代理回环。</p>
      <div className="mt-4 flex justify-end">
        <MobileImageGuideDialog
          title="排除应用"
          ariaLabel="查看 FlClash 排除应用图示"
          buttonLabel="如何排除应用"
          images={flClashExcludeAppImages}
        />
      </div>
    </div>
  );
}

function FlClashKnownIssues() {
  return (
    <div className="space-y-3">
      <div className="rounded-box border border-base-300 bg-base-100 p-4 text-sm leading-6 text-base-content/80">
        <h2 className="mb-2 font-medium text-base-content">覆写脚本方案</h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>FlClash Android 端当前只提供覆写脚本这一种配置方式。</li>
          <li>导入脚本后需要重新加载或更新当前配置，脚本才会生效。</li>
          <li>脚本会新增“懒猫微服”和“懒猫微服策略”，客户端内可选择 DIRECT 或 懒猫微服。</li>
        </ol>
      </div>

      <div className="rounded-box border border-base-300 bg-base-100 p-4 text-sm leading-6 text-base-content/80">
        <h2 className="mb-2 font-medium text-base-content">本地代理端口</h2>
        <p>脚本默认使用懒猫微服本地 HTTP 代理地址：</p>
        <div className="mockup-code mt-3 text-xs">
          <pre><code>server: 127.0.0.1</code></pre>
          <pre><code>port: 31085</code></pre>
        </div>
        <p className="mt-3">如果后续本地端口变化，需要同步修改覆写脚本里的端口。</p>
      </div>
    </div>
  );
}

export function FlClashMobileSolution({ app, onBack }: FlClashMobileSolutionProps) {
  const stepStorageKey = `mobile-solution-step:${app.id}:override`;
  const tabStorageKey = `mobile-solution-tab:${app.id}`;

  function handleBack() {
    window.localStorage.removeItem(stepStorageKey);
    window.localStorage.removeItem(tabStorageKey);
    onBack();
  }

  const stepsContent = (
    <MobileStepPager
      items={["导入覆写脚本", "排除应用"]}
      storageKey={stepStorageKey}
      renderTitleAction={(index) => {
        if (index !== 0) return null;
        return (
          <MobileImageGuideDialog
            title="导入覆写脚本"
            ariaLabel="查看 FlClash 导入覆写脚本图示"
            images={flClashImportScriptImages}
          />
        );
      }}
      renderStepContent={(index) => {
        if (index === 0) return <FlClashOverrideScriptPanel />;
        if (index === 1) return <FlClashExcludeAppPanel />;
        return null;
      }}
    />
  );

  return (
    <MobileSolutionFrame
      app={app}
      onBack={handleBack}
      storageKey={tabStorageKey}
      tabs={[
        { key: "steps", label: "解决步骤", content: stepsContent },
        { key: "known", label: "使用须知", content: <FlClashKnownIssues /> }
      ]}
    />
  );
}
