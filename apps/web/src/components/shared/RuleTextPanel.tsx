import { useState, type ReactNode } from "react";

type RuleTextPanelProps = {
  title: string;
  content: string;
  actions?: ReactNode;
  titleActions?: ReactNode;
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
    throw new Error("当前浏览器不允许自动复制，请手动选中内容复制");
  }
}

export function RuleTextPanel({ title, content, actions, titleActions }: RuleTextPanelProps) {
  const [copyStatus, setCopyStatus] = useState("一键复制");
  const [error, setError] = useState("");

  async function handleCopy() {
    setError("");

    try {
      await copyText(content);
      setCopyStatus("已复制");
      window.setTimeout(() => setCopyStatus("一键复制"), 1600);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "复制失败，请手动复制内容");
    }
  }

  return (
    <div className="card card-border bg-base-100 shadow-sm">
      <div className="card-body gap-4 p-4 sm:gap-5 sm:p-8">
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <h2 className="card-title">{title}</h2>
          {titleActions}
        </div>
        {error ? <div role="alert" className="alert alert-error text-sm">{error}</div> : null}
        <textarea className="textarea min-h-72 w-full font-mono text-xs leading-5 sm:min-h-96" readOnly value={content} />
        <div className="card-actions grid grid-cols-2 gap-3 sm:flex sm:justify-end">
          <button className="btn btn-primary w-full sm:w-auto" type="button" onClick={() => void handleCopy()}>{copyStatus}</button>
          {actions}
        </div>
      </div>
    </div>
  );
}
