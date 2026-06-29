export type ClashModifyMethod = "config" | "override";

const clashModifyMethodText: Record<ClashModifyMethod, { pros: string; cons: string }> = {
  config: {
    pros: "稳定。",
    cons: "直接修改配置文件，更新配置文件后配置会失效。"
  },
  override: {
    pros: "不会受到配置文件变动的影响。",
    cons: "稳定性需要确认。"
  }
};

type ClashMethodPanelProps = {
  activeMethod: ClashModifyMethod;
  onMethodChange: (method: ClashModifyMethod) => void;
  availableMethods?: ClashModifyMethod[];
};

export function ClashMethodPanel({ activeMethod, onMethodChange, availableMethods = ["config", "override"] }: ClashMethodPanelProps) {
  const activeMethodText = clashModifyMethodText[activeMethod];
  const hasConfigMethod = availableMethods.includes("config");
  const hasOverrideMethod = availableMethods.includes("override");

  return (
    <div className="card card-border bg-base-100 shadow-sm">
      <div className="card-body gap-4 p-4 sm:p-8">
        <div className={`grid gap-3 ${availableMethods.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
          {hasConfigMethod ? <button className={`btn ${activeMethod === "config" ? "btn-primary" : "btn-outline"}`} type="button" onClick={() => onMethodChange("config")}>修改配置文件</button> : null}
          {hasOverrideMethod ? <button className={`btn ${activeMethod === "override" ? "btn-primary" : "btn-outline"}`} type="button" onClick={() => onMethodChange("override")}>修改覆写脚本</button> : null}
        </div>

        <div className="space-y-2 text-sm text-base-content/70">
          <p><span className="font-semibold text-success">优点：</span>{activeMethodText.pros}</p>
          <p><span className="font-semibold text-warning">缺点：</span>{activeMethodText.cons}</p>
        </div>
      </div>
    </div>
  );
}
