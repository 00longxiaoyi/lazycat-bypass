import { useEffect, useState, type ReactNode } from "react";

export type MobileDetailTab = {
  key: string;
  label: string;
  content: ReactNode;
};

type MobileDetailTabsProps = {
  knownContent?: ReactNode;
  stepsContent?: ReactNode;
  storageKey?: string;
  tabs?: MobileDetailTab[];
};

const activeTabClass = "tab-active bg-base-100 border-b-0! shadow-none!";
const inactiveTabClass = "bg-transparent! border-transparent! shadow-none!";

function getInitialTab(storageKey: string | undefined, tabs: MobileDetailTab[]) {
  const defaultTabKey = tabs[0]?.key ?? "";
  if (!storageKey || typeof window === "undefined") return defaultTabKey;

  const storedValue = window.localStorage.getItem(storageKey);
  return tabs.some((tab) => tab.key === storedValue) ? storedValue ?? defaultTabKey : defaultTabKey;
}

export function MobileDetailTabs({ knownContent, stepsContent, storageKey, tabs }: MobileDetailTabsProps) {
  const resolvedTabs = tabs ?? [
    { key: "steps", label: "解决步骤", content: stepsContent },
    { key: "known", label: "使用须知", content: knownContent }
  ];
  const [activeTab, setActiveTab] = useState(() => getInitialTab(storageKey, resolvedTabs));
  const activeIndex = Math.max(resolvedTabs.findIndex((tab) => tab.key === activeTab), 0);
  const activeContent = resolvedTabs[activeIndex]?.content;
  const roundedClass = activeIndex === 0
    ? "rounded-tl-none"
    : activeIndex === resolvedTabs.length - 1
      ? "rounded-tr-none"
      : "rounded-t-none";

  useEffect(() => {
    if (resolvedTabs.some((tab) => tab.key === activeTab)) return;
    setActiveTab(resolvedTabs[0]?.key ?? "");
  }, [activeTab, resolvedTabs]);

  useEffect(() => {
    if (!storageKey || typeof window === "undefined") return;
    window.localStorage.setItem(storageKey, activeTab);
  }, [activeTab, storageKey]);

  return (
    <div className="overflow-visible">
      <div role="tablist" className="tabs tabs-lift relative w-full">
        {resolvedTabs.map((tab) => (
          <button
            key={tab.key}
            role="tab"
            className={`tab flex-1 border-b-transparent! ${activeTab === tab.key ? activeTabClass : inactiveTabClass}`}
            type="button"
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={`card card-border relative -mt-px border-t-0 bg-base-100 shadow-none! ${roundedClass}`}>
        <div className="card-body p-4">
          {activeContent}
        </div>
      </div>
    </div>
  );
}
