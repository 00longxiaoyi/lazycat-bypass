import { MobileImageGuideDialog, type MobileGuideImage } from "../../MobileImageGuideDialog";

const useConfigImages: MobileGuideImage[] = [
  {
    src: "/imgs/shadowrocket/ios/shadowrocket-use-config-1.png",
    alt: "Shadowrocket 使用新配置文件示例第 1 步"
  },
  {
    src: "/imgs/shadowrocket/ios/shadowrocket-use-config-2.png",
    alt: "Shadowrocket 使用新配置文件示例第 2 步"
  },
  {
    src: "/imgs/shadowrocket/ios/shadowrocket-use-config-3.png",
    alt: "Shadowrocket 使用新配置文件示例第 3 步"
  }
];

export function ShadowrocketUseConfigHelpDialog() {
  return (
    <MobileImageGuideDialog
      title="使用新配置文件"
      images={useConfigImages}
      ariaLabel="查看使用新配置文件示例"
    />
  );
}
