import { MobileImageGuideDialog, type MobileGuideImage } from "../../MobileImageGuideDialog";

const moduleConfigImages: MobileGuideImage[] = [
  {
    src: "/imgs/surge/ios/sure-ios-use-module-config-1.png",
    alt: "Surge 添加模块示例第 1 步"
  },
  {
    src: "/imgs/surge/ios/sure-ios-use-module-config-2.png",
    alt: "Surge 添加模块示例第 2 步"
  },
  {
    src: "/imgs/surge/ios/sure-ios-use-module-config-3.png",
    alt: "Surge 添加模块示例第 3 步"
  },
  {
    src: "/imgs/surge/ios/sure-ios-use-module-config-4.png",
    alt: "Surge 添加模块示例第 4 步"
  }
];

export function SurgeModuleConfigHelpDialog() {
  return (
    <MobileImageGuideDialog
      title="添加模块"
      images={moduleConfigImages}
      ariaLabel="查看添加模块示例"
    />
  );
}
