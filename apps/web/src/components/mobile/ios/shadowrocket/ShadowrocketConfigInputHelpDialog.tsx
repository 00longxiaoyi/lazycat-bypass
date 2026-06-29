import { MobileImageGuideDialog, type MobileGuideImage } from "../../MobileImageGuideDialog";

const configInputImages: MobileGuideImage[] = [
  {
    src: "/imgs/shadowrocket/ios/shadowrocket-import-config-1.png",
    alt: "Shadowrocket 导入配置文件示例第 1 步"
  },
  {
    src: "/imgs/shadowrocket/ios/shadowrocket-import-config-2.png",
    alt: "Shadowrocket 导入配置文件示例第 2 步"
  },
  {
    src: "/imgs/shadowrocket/ios/shadowrocket-import-config-3.png",
    alt: "Shadowrocket 导入配置文件示例第 3 步"
  }
];

export function ShadowrocketConfigInputHelpDialog() {
  return (
    <MobileImageGuideDialog
      title="输入配置文件"
      images={configInputImages}
      ariaLabel="查看输入配置文件示例"
    />
  );
}
