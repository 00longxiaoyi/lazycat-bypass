import { MobileImageGuideDialog, type MobileGuideImage } from "../../MobileImageGuideDialog";

const finalConfigImages: MobileGuideImage[] = [
  {
    src: "/imgs/surge/ios/sure-ios-use-fianl-config-1.png",
    alt: "Surge 导入最终配置示例第 1 步"
  },
  {
    src: "/imgs/surge/ios/sure-ios-use-fianl-config-2.png",
    alt: "Surge 导入最终配置示例第 2 步"
  },
  {
    src: "/imgs/surge/ios/sure-ios-use-final-config-3.png",
    alt: "Surge 导入最终配置示例第 3 步"
  },
  {
    src: "/imgs/surge/ios/sure-ios-use-final-config-4.png",
    alt: "Surge 导入最终配置示例第 4 步"
  }
];

export function SurgeFinalConfigHelpDialog() {
  return (
    <MobileImageGuideDialog
      title="导入最终配置"
      images={finalConfigImages}
      ariaLabel="查看导入最终配置示例"
    />
  );
}
