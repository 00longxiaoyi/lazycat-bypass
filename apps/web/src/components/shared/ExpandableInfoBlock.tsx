import { useState, type ReactNode } from "react";

type ExpandableInfoBlockProps = {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
};

export function ExpandableInfoBlock({ title, defaultOpen = true, children }: ExpandableInfoBlockProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="space-y-3 text-sm leading-6 text-base-content/80">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-base font-bold text-base-content">{title}</h3>
        <button className="btn btn-ghost btn-circle btn-xs shrink-0" type="button" aria-label={isOpen ? `收起 ${title}` : `展开 ${title}`} onClick={() => setIsOpen((value) => !value)}>
          <svg className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>
      {isOpen ? <div className="space-y-2">{children}</div> : null}
    </div>
  );
}
