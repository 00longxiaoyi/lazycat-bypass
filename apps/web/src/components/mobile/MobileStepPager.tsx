import { useEffect, useState, type ReactNode } from "react";

type MobileStepPagerProps = {
  items: string[];
  renderStepContent?: (index: number, controls: { goNext: () => void; hasNext: boolean }) => ReactNode;
  renderTitleAction?: (index: number) => ReactNode;
  canGoNext?: (index: number) => boolean;
  storageKey?: string;
};

function getInitialStep(storageKey: string | undefined, itemCount: number) {
  if (!storageKey || typeof window === "undefined") return 0;

  const storedValue = window.localStorage.getItem(storageKey);
  const parsedValue = storedValue ? Number.parseInt(storedValue, 10) : 0;
  if (Number.isNaN(parsedValue)) return 0;

  return Math.min(Math.max(parsedValue, 0), Math.max(itemCount - 1, 0));
}

export function MobileStepPager({ items, renderStepContent, renderTitleAction, canGoNext, storageKey }: MobileStepPagerProps) {
  const [currentIndex, setCurrentIndex] = useState(() => getInitialStep(storageKey, items.length));
  const safeCurrentIndex = Math.min(currentIndex, Math.max(items.length - 1, 0));
  const hasPrevious = safeCurrentIndex > 0;
  const hasNext = safeCurrentIndex < items.length - 1 && (canGoNext?.(safeCurrentIndex) ?? true);
  const previousButtonClass = hasPrevious
    ? "btn btn-ghost btn-circle text-base-content"
    : "btn btn-ghost btn-circle btn-disabled text-base-content/25 opacity-40";
  const nextButtonClass = hasNext
    ? "btn btn-ghost btn-circle text-base-content"
    : "btn btn-ghost btn-circle btn-disabled text-base-content/25 opacity-40";

  useEffect(() => {
    if (safeCurrentIndex !== currentIndex) {
      setCurrentIndex(safeCurrentIndex);
    }
  }, [currentIndex, safeCurrentIndex]);

  useEffect(() => {
    if (!storageKey || typeof window === "undefined") return;
    window.localStorage.setItem(storageKey, String(safeCurrentIndex));
  }, [safeCurrentIndex, storageKey]);

  function goPrevious() {
    if (hasPrevious) setCurrentIndex((index) => index - 1);
  }

  function goNext() {
    if (hasNext) setCurrentIndex((index) => index + 1);
  }

  return (
    <div className="p-1">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
        <div className="flex min-w-0 items-center gap-1.5">
          <h2 className="truncate text-sm font-normal leading-4 text-base-content">{items[safeCurrentIndex]}</h2>
          {renderTitleAction ? <div className="shrink-0">{renderTitleAction(safeCurrentIndex)}</div> : null}
        </div>
        <div className="-mr-2 ml-auto flex shrink-0 items-center justify-end gap-0">
          <button className={previousButtonClass} type="button" aria-label="上一步" disabled={!hasPrevious} onClick={goPrevious}>
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div className="shrink-0 px-1 text-base font-medium tabular-nums text-primary">{safeCurrentIndex + 1} / {items.length}</div>
          <button className={nextButtonClass} type="button" aria-label="下一步" disabled={!hasNext} onClick={goNext}>
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
        {renderStepContent ? <div className="col-span-2 mt-4 w-full">{renderStepContent(safeCurrentIndex, { goNext, hasNext })}</div> : null}
      </div>
    </div>
  );
}
