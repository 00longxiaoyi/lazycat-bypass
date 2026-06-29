import type { DeviceMode, ProxyApp } from "../../types/proxy";

type MobileRuleSnippetContentProps = {
  app: ProxyApp;
  mode: DeviceMode;
};

export function MobileRuleSnippetContent({ app, mode }: MobileRuleSnippetContentProps) {
  return (
    <div className="collapse collapse-open border border-base-300 bg-base-100">
      <div className="collapse-title text-base font-medium">规则片段</div>
      <div className="collapse-content">
        <div className="mockup-code max-h-96 overflow-auto text-xs">
          {app.rules[mode].map((rule) => (
            <pre key={rule}><code>{rule}</code></pre>
          ))}
        </div>
      </div>
    </div>
  );
}
