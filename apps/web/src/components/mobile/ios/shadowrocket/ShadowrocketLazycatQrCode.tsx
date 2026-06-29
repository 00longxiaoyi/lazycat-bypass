import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { ShadowrocketStepHelpDialog } from "./ShadowrocketStepHelpDialog";

const lazycatSocksUrl = "socks://MTI3LjAuMC4xOjMxMDg2?remarks=lazycat&method=auto";
export type LazycatNodeMethod = "qr" | "copy";

type ShadowrocketLazycatQrCodeProps = {
  method: LazycatNodeMethod;
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
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  document.body.removeChild(textarea);

  if (!copied) throw new Error("复制失败");
}

export function ShadowrocketLazycatQrCode({ method }: ShadowrocketLazycatQrCodeProps) {
  const defaultCopyStatus = "推荐！一键复制 到代理软件里面粘贴";
  const [copyStatus, setCopyStatus] = useState(defaultCopyStatus);

  async function handleCopy() {
    try {
      await copyText(lazycatSocksUrl);
      setCopyStatus("已复制");
      window.setTimeout(() => setCopyStatus(defaultCopyStatus), 1600);
    } catch {
      setCopyStatus("复制失败");
      window.setTimeout(() => setCopyStatus(defaultCopyStatus), 1600);
    }
  }

  return (
    <div className="flex min-h-80 w-full items-center justify-center p-4">
      <div className="mx-auto flex w-full max-w-sm flex-col items-center justify-center gap-4 text-center">
        {method === "qr" ? (
          <>
            <div className="rounded-box bg-base-100 p-3 shadow-sm">
              <QRCodeSVG value={lazycatSocksUrl} size={220} level="M" includeMargin />
            </div>
            <p className="max-w-72 text-center text-sm leading-6 text-base-content/70">
              <span>使用 Shadowrocket 扫描二维码创建独立节点。</span>
              <ShadowrocketStepHelpDialog method={method} />
            </p>
          </>
        ) : (
          <>
            <div className="flex aspect-square w-full max-w-[220px] items-center justify-center rounded-box bg-base-100 p-3 shadow-sm">
              <div className="flex h-full w-full items-center rounded-box border border-base-300 bg-base-200 px-3 text-left text-xs leading-5 break-all text-base-content/80">
                {lazycatSocksUrl}
              </div>
            </div>
            <button className="btn btn-primary btn-sm w-full max-w-sm" type="button" onClick={() => void handleCopy()}>{copyStatus}</button>
            <p className="max-w-72 text-center text-sm leading-6 text-base-content/70">
              <span>复制链接后，到 Shadowrocket 里粘贴导入独立节点。</span>
              <ShadowrocketStepHelpDialog method={method} />
            </p>
          </>
        )}
      </div>
    </div>
  );
}
