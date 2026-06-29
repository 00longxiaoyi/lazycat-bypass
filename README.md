# 懒猫代理配置助手

这是一个面向懒猫微服用户的纯前端配置助手。它解决的核心问题是：当电脑或手机同时使用第三方代理客户端时，懒猫相关域名、IPv4/IPv6 地址段和本地服务流量可能被代理客户端接管，导致懒猫访问异常。项目会根据访问设备自动展示对应代理软件的处理方案，并在支持的客户端中生成可直接导入或复制的配置片段。

项目不拉取用户订阅、不扫描本机进程、不上传配置文件，也不依赖后端服务。用户上传或粘贴的配置只在浏览器本地处理。

## 目前适配的平台

应用会根据浏览器环境自动识别平台，当前识别范围包括：

- macOS
- Windows
- iOS
- Android / HarmonyOS

桌面端会展示 macOS、Windows 可用的方案，移动端会展示 iOS、Android 可用的方案。路由使用 `HashRouter`，访问路径形如 `/#/apps/clash`，更适合静态部署和懒猫这类反向代理环境。

### 桌面端

| 平台 | 客户端 | 当前状态 | 处理方式 |
| --- | --- | --- | --- |
| macOS / Windows | Clash Part | 推荐优先 | 上传 Clash / Mihomo YAML，生成追加懒猫直连规则后的新配置 |
| macOS / Windows | Clash MI | 推荐优先 | 提供覆写脚本订阅地址方案 |
| macOS / Windows | Clash Verge | 推荐优先 | 通过覆写脚本追加懒猫直连规则 |
| macOS / Windows | FlClash | 推荐优先 | 支持配置文件处理或覆写脚本方案 |
| macOS | Surge | 可适配 | 上传现有配置，生成包含懒猫规则的新配置 |
| macOS | Shadowrocket | 教程引导 | 上传现有配置，生成包含懒猫规则的新配置 |
| macOS / Windows | v2rayN | 能力有限 | 提供路由规则和 TUN 排除规则配置参考 |
| macOS / Windows | sing-box | 可适配 | 提供 `route.rules` 直连规则配置参考 |

> 代码中保留了 Quantumult X、Loon 等规则数据，但当前桌面入口会隐藏部分没有完整桌面主流程的客户端，避免用户误选。

### 移动端

| 平台 | 客户端 | 当前状态 | 处理方式 |
| --- | --- | --- | --- |
| iOS | Surge | 可适配 | 引导导入初始配置、最终配置和模块配置 |
| iOS | Shadowrocket | 教程引导 | 创建 lazycat 本地 SOCKS 节点，并生成可用配置 |
| Android / HarmonyOS | FlClash | 推荐优先 | 导入 Clash / Mihomo 直连规则或脚本方案 |
| Android / HarmonyOS | Clash Meta | 推荐优先 | 通过排除应用避免懒猫流量被代理接管 |
| Android / HarmonyOS | Surfboard | 可适配 | 通过排除应用避免懒猫流量被代理接管 |
| Android / HarmonyOS | Karing | 可适配 | 通过排除应用避免懒猫流量被代理接管 |
| Android / HarmonyOS | v2rayNG | 能力有限 | 通过排除应用或手动路由规则处理 |

## 目前的技术架构

项目是一个 npm workspace，当前只有一个前端应用：

```text
.
├── package.json              # 根 workspace 脚本
├── apps/web                  # Vite + React 前端应用
│   ├── src/main.tsx          # 应用入口与 HashRouter 路由
│   ├── src/data              # 客户端适配数据、规则片段、静态配置
│   ├── src/lib               # Clash / Surge / Shadowrocket 配置处理逻辑
│   ├── src/components        # 桌面端、移动端和共享 UI 组件
│   └── public                # 图标和教程图片资源
└── README.md
```

主要技术栈：

- Vite
- React
- TypeScript
- React Router
- Tailwind CSS
- daisyUI
- yaml
- qrcode.react

### 前端分层

- `apps/web/src/main.tsx`：应用入口，负责平台识别、客户端列表过滤和路由挂载。
- `apps/web/src/lib/detectDeviceMode.ts`：根据 UA、`navigator.platform`、`userAgentData` 和触控能力识别平台与设备形态。
- `apps/web/src/data/proxyApps.ts`：维护客户端适配矩阵，包括名称、平台、状态、步骤、规则片段和图标映射。
- `apps/web/src/components/desktop/`：桌面端配置页面，包含 Clash、Surge、Shadowrocket、v2rayN、sing-box 等方案。
- `apps/web/src/components/mobile/`：移动端配置页面，按 iOS / Android 组织不同客户端的操作流程。
- `apps/web/src/components/shared/`：跨端复用组件，例如应用卡片、图标、规则面板和图片教程弹窗。
- `apps/web/src/lib/*Processor.ts`：配置处理器，负责解析用户上传或粘贴的配置，并在本地生成新配置。

## 整个配置流程

用户侧流程大致如下：

1. 用户打开页面，应用自动识别当前平台和设备形态。
2. 首页只展示当前设备可用的代理客户端。
3. 用户选择正在使用的客户端，进入对应的桌面端或移动端方案页。
4. 页面根据客户端类型提供三类处理方式：上传配置生成新文件、复制规则片段、按图文教程手动设置。
5. 所有配置处理都在浏览器本地完成，生成结果由用户自行下载、复制或导入代理客户端。
6. 用户重新连接代理客户端后，懒猫相关流量应优先走直连或排除代理。

当前内置的懒猫直连目标主要包括：

- `heiyu.space`
- `lazycat.cloud`
- `6.6.6.6/32`
- `2000::6666/128`
- `fc03:1136:3800::/40`
- 部分客户端还会配置 `fc00::/7`、`always-real-ip`、`skip-proxy`、`tun-excluded-routes` 或进程直连规则。

### 配置生成逻辑

不同客户端的处理重点不同：

- Clash / Mihomo：使用 `yaml` 解析原配置，在 `rules` 顶部追加懒猫直连规则；如果启用了 TUN，会补充 `route-exclude-address`；如果 DNS 已启用但 IPv6 未开启，会补充 `dns.ipv6 = true`。
- Surge：补充 `[Proxy]`、`[General]` 和 `[Rule]` 中的 lazycat 节点、`always-real-ip`、`skip-proxy`、`tun-excluded-routes` 和规则项。
- Shadowrocket：按 iOS / PC 场景分别补充 `[General]` 与 `[Rule]`，避免移动端和桌面端参数混用。
- sing-box / v2rayN：提供可复制的路由规则和 TUN 相关配置参考，由用户按客户端能力手动合并。
- Android 客户端：优先提供“排除应用”或导入规则片段的操作路径，降低不同 Android VPN 实现之间的兼容风险。

## 如何本地自己部署

### 环境要求

建议使用 Node.js 20 或更高版本，并使用 npm 安装依赖。

```bash
node -v
npm -v
```

### 本地开发

在仓库根目录执行：

```bash
npm install
npm run dev
```

开发服务默认监听：

```text
http://localhost:5173/
```

如果需要让手机访问同一局域网内的开发服务，请使用电脑的局域网 IP：

```text
http://192.168.x.x:5173/
```

### 类型检查

```bash
npm run typecheck
```

### 构建生产版本

```bash
npm run build
```

构建产物会生成在：

```text
apps/web/dist
```

### 本地预览生产版本

```bash
npm run preview -w @lazycat-proxy-guide/web
```

默认预览地址：

```text
http://localhost:4173/
```

### 静态部署

本项目构建后是静态站点，可以部署到任意静态文件服务器，例如 Nginx、Caddy、对象存储静态站点、懒猫应用中的静态资源服务等。由于前端使用 hashtag 路由模式，服务端不需要额外配置 history fallback。

最小部署方式是把 `apps/web/dist` 目录作为静态站点根目录暴露出去。

### Nginx 示例

```nginx
server {
  listen 80;
  server_name example.com;

  root /path/to/lazycat-subscription-generator/apps/web/dist;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

虽然 hashtag 路由不强依赖 `try_files ... /index.html`，保留它可以让根路径和静态资源访问更稳妥。

## 开发说明

新增客户端适配时，优先从 `apps/web/src/data/proxyApps.ts` 增加数据入口，再根据平台放入对应页面组件：

- 桌面端组件放在 `apps/web/src/components/desktop/`
- iOS 组件放在 `apps/web/src/components/mobile/ios/`
- Android 组件放在 `apps/web/src/components/mobile/android/`
- 跨端复用能力放在 `apps/web/src/components/shared/`

如果需要新增教程图片，图片资源放入 `apps/web/public/imgs/`，并通过 `/imgs/...` 的 public 路径引用；应用图标放入 `apps/web/public/icon/`，并优先通过统一的 `ProxyAppIcon` 展示。
