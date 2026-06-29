import type { ReactNode } from "react";

type MobileConfigShellProps = {
  title?: string;
  titleActions?: ReactNode;
  steps?: string[];
  currentStep?: number;
  notice?: ReactNode;
  children: ReactNode;
};

export function MobileConfigShell({ title, titleActions, steps, currentStep = 0, notice, children }: MobileConfigShellProps) {
  return (
    <div className="space-y-4 rounded-box border border-base-300 bg-base-100 p-4">
      {title ? (
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-base font-medium text-base-content">{title}</h2>
          {titleActions}
        </div>
      ) : null}
      {notice}
      {steps ? (
        <div className="flex items-center justify-between gap-3 text-sm text-base-content/70">
          <span>{steps[currentStep] ?? steps[0]}</span>
          <span className="font-medium text-primary">{currentStep + 1} / {steps.length}</span>
        </div>
      ) : null}
      {children}
    </div>
  );
}
