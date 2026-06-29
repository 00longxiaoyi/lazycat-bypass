import { MobileImageGuideDialog, type MobileGuideImage } from "../../MobileImageGuideDialog";
import type { LazycatNodeMethod } from "./ShadowrocketLazycatQrCode";

const guideSections: Record<LazycatNodeMethod, { title: string; images: MobileGuideImage[] }> = {
  qr: {
    title: "扫二维码",
    images: [
      {
        src: "/imgs/shadowrocket/ios/shadowrocket-get-lazycat-node-qc-1.png",
        alt: "Shadowrocket 扫码创建 lazycat 节点"
      }
    ]
  },
  copy: {
    title: "复制粘贴",
    images: [
      {
        src: "/imgs/shadowrocket/ios/shadowrocket-get-lazycat-node-copy-1.png",
        alt: "Shadowrocket 复制链接创建 lazycat 节点第 1 步"
      },
      {
        src: "/imgs/shadowrocket/ios/shadowrocket-get-lazycat-node-copy-2.png",
        alt: "Shadowrocket 复制链接创建 lazycat 节点第 2 步"
      },
      {
        src: "/imgs/shadowrocket/ios/shadowrocket-get-lazycat-node-copy-3.png",
        alt: "Shadowrocket 复制链接创建 lazycat 节点第 3 步"
      }
    ]
  }
};

type ShadowrocketStepHelpDialogProps = {
  method: LazycatNodeMethod;
};

export function ShadowrocketStepHelpDialog({ method }: ShadowrocketStepHelpDialogProps) {
  const guideSection = guideSections[method];

  return (
    <MobileImageGuideDialog
      title={guideSection.title}
      images={guideSection.images}
      ariaLabel="查看创建独立节点示例"
    />
  );
}
