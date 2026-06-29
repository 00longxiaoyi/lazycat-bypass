import { MobileImageGuideDialog, type MobileGuideImage } from "../../MobileImageGuideDialog";

const exportConfigImages: MobileGuideImage[] = [
  {
    src: "/imgs/surge/ios/sure-ios-export-orgin-config-1.png",
    alt: "Surge 导出现有配置示例第 1 步"
  },
  {
    src: "/imgs/surge/ios/sure-ios-export-orgin-config-2.png",
    alt: "Surge 导出现有配置示例第 2 步"
  },
  {
    src: "/imgs/surge/ios/sure-ios-export-orgin-config-3.png",
    alt: "Surge 导出现有配置示例第 3 步"
  }
];

const importNewConfigImages: MobileGuideImage[] = [
  {
    src: "/imgs/surge/ios/sure-ios-import-new-config-1.png",
    alt: "Surge 导入新配置示例第 1 步"
  },
  {
    src: "/imgs/surge/ios/sure-ios-import-new-config-2.png",
    alt: "Surge 导入新配置示例第 2 步"
  },
  {
    src: "/imgs/surge/ios/sure-ios-import-new-config-3.png",
    alt: "Surge 导入新配置示例第 3 步"
  },
  {
    src: "/imgs/surge/ios/sure-ios-import-new-config-4.png",
    alt: "Surge 导入新配置示例第 4 步"
  }
];

type SurgeConfigUploadHelpDialogProps = {
  step: "export" | "import";
};

export function SurgeConfigUploadHelpDialog({ step }: SurgeConfigUploadHelpDialogProps) {
  if (step === "export") {
    return (
      <MobileImageGuideDialog
        title="导出现有配置"
        images={exportConfigImages}
        ariaLabel="查看导出现有配置示例"
      />
    );
  }

  return (
    <MobileImageGuideDialog
      title="导入新配置"
      images={importNewConfigImages}
      ariaLabel="查看导入新配置示例"
    />
  );
}
