import type { ReactNode } from "react";

type DesktopConfigSnippetPanelProps = {
  title?: string;
  children: ReactNode;
};

export function DesktopConfigSnippetPanel({ title = "配置片段", children }: DesktopConfigSnippetPanelProps) {
  return (
    <div className="card card-border bg-base-100 shadow-sm">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        {children}
      </div>
    </div>
  );
}
