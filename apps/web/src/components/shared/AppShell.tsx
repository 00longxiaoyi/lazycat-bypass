import type { PlatformType } from "../../types/proxy";

const platformLabel: Record<PlatformType, string> = {
  macos: "macOS",
  windows: "Windows",
  android: "Android",
  ios: "iOS"
};

type AppShellProps = {
  children: React.ReactNode;
  platform: PlatformType;
};

export function AppShell({ children, platform }: AppShellProps) {
  return (
    <main className="min-h-screen bg-base-200">
      <div className="navbar bg-base-100 shadow-sm">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-3 sm:px-4">
          <span className="btn btn-ghost text-base sm:text-lg">代理冲突解决</span>
          <div className="badge badge-primary badge-outline max-w-[45vw] shrink truncate whitespace-nowrap" title={`当前平台：${platformLabel[platform]}`}>
            当前平台：{platformLabel[platform]}
          </div>
        </div>
      </div>

      {children}
    </main>
  );
}
