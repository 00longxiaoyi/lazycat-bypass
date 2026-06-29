import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { MobileOverviewGuide } from "./components/mobile/MobileOverviewGuide";
import { AppShell } from "./components/shared/AppShell";
import { HomePage } from "./components/shared/HomePage";
import { SolutionPage } from "./components/SolutionPage";
import { proxyApps } from "./data/proxyApps";
import { detectDeviceMode, detectPlatform } from "./lib/detectDeviceMode";
import type { DeviceMode, PlatformType } from "./types/proxy";
import "./styles.css";

const hiddenDesktopAppIds = new Set(["v2rayng", "quantumultx", "loon", "sing-box"]);

function App() {
  const [mode] = useState<DeviceMode>(() => detectDeviceMode());
  const [platform] = useState<PlatformType>(() => detectPlatform());
  const visibleApps = useMemo(
    () => proxyApps.filter((app) => app.platforms.includes(platform) && ((platform !== "macos" && platform !== "windows") || !hiddenDesktopAppIds.has(app.id))),
    [platform]
  );

  return (
    <BrowserRouter>
      <AppShell platform={platform}>
        <Routes>
          <Route path="/" element={<HomePage apps={visibleApps} beforeList={mode === "mobile" ? <MobileOverviewGuide /> : undefined} />} />
          <Route path="/apps/:appId" element={<SolutionRoute apps={visibleApps} mode={mode} platform={platform} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}

function SolutionRoute({ apps, mode, platform }: { apps: typeof proxyApps; mode: DeviceMode; platform: PlatformType }) {
  const { appId } = useParams();
  const navigate = useNavigate();
  const selectedApp = apps.find((app) => app.id === appId);

  if (!selectedApp) {
    return <Navigate to="/" replace />;
  }

  return <SolutionPage app={selectedApp} mode={mode} platform={platform} onBack={() => navigate("/")} />;
}

createRoot(document.getElementById("root")!).render(<App />);
