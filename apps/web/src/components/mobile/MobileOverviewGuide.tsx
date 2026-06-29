import { MobileImageGuideDialog, type MobileGuideImage } from "./MobileImageGuideDialog";

const overviewImages: MobileGuideImage[] = [
  { src: "/imgs/overview/overview-iphone-set-proxy-1.png", alt: "使用前必看步骤 1" },
  { src: "/imgs/overview/overview-iphone-set-proxy-2.png", alt: "使用前必看步骤 2" }
];

export function MobileOverviewGuide() {
  return (
    <div className="mb-3">
      <div className="card card-border bg-base-100 shadow-sm">
        <div className="card-body p-4">
          <MobileImageGuideDialog
            title="使用前必看"
            ariaLabel="查看使用前必看说明"
            buttonLabel="使用前必看"
            images={overviewImages}
          />
        </div>
      </div>
    </div>
  );
}
