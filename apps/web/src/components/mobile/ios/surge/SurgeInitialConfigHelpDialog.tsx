import { MobileImageGuideDialog, type MobileGuideImage } from "../../MobileImageGuideDialog";

const initialConfigImages: MobileGuideImage[] = [
  {
    src: "/imgs/surge/ios/sure-ios-use-orgin-config-1.png",
    alt: "Surge 导入初始配置示例第 1 步"
  },
  {
    src: "/imgs/surge/ios/sure-ios-use-orgin-config-2.png",
    alt: "Surge 导入初始配置示例第 2 步"
  },
  {
    src: "/imgs/surge/ios/sure-ios-use-orgin-config-3.png",
    alt: "Surge 导入初始配置示例第 3 步"
  },
  {
    src: "/imgs/surge/ios/sure-ios-use-orgin-config-4.png",
    alt: "Surge 导入初始配置示例第 4 步"
  }
];

export function SurgeInitialConfigHelpDialog() {
  return (
    <MobileImageGuideDialog
      title="导入初始配置"
      images={initialConfigImages}
      ariaLabel="查看导入初始配置示例"
    />
  );
}
