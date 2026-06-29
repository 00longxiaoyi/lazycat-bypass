import type { PlatformType } from "../../types/proxy";
import { PageContainer } from "./PageContainer";

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
        <PageContainer className="flex items-center justify-between">
          <span className="btn btn-ghost text-base sm:text-lg">代理冲突解决</span>
          <div className="flex shrink-0 items-center gap-2">
            <a
              className="btn btn-ghost btn-circle"
              href="https://github.com/00longxiaoyi/lazycat-bypass"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              title="GitHub"
            >
              <svg className="size-5" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.21-3.37-1.21-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.99c.85 0 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .27.18.59.69.49A10.13 10.13 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
              </svg>
            </a>
            <div className="badge badge-primary badge-outline max-w-[45vw] shrink truncate whitespace-nowrap" title={`当前平台：${platformLabel[platform]}`}>
              当前平台：{platformLabel[platform]}
            </div>
          </div>
        </PageContainer>
      </div>

      {children}
    </main>
  );
}
