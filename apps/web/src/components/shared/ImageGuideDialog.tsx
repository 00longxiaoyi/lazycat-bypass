import { useRef } from "react";

type ImageGuide = {
  src: string;
  alt: string;
};

type ImageGuideDialogProps = {
  id: string;
  buttonLabel: string;
  title: string;
  description?: string;
  images: ImageGuide[];
};

const imageFrameClass = "flex aspect-video w-full items-center justify-center overflow-hidden rounded-box border border-base-300 bg-base-200";
const imageClass = "max-h-full max-w-full object-contain";

export function ImageGuideDialog({ id, buttonLabel, title, description, images }: ImageGuideDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const hasCarousel = images.length > 1;

  return (
    <>
      <button className="btn btn-outline btn-sm" type="button" onClick={() => dialogRef.current?.showModal()}>{buttonLabel}</button>

      <dialog className="modal" ref={dialogRef}>
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="text-lg font-bold">{title}</h3>
          {description ? <p className="py-3 text-sm text-base-content/70">{description}</p> : null}

          {hasCarousel ? (
            <div className="carousel w-full">
              {images.map((image, index) => (
                <div className="carousel-item w-full" id={`${id}-${index + 1}`} key={image.src}>
                  <div className={imageFrameClass}>
                    <img className={imageClass} src={image.src} alt={image.alt} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={imageFrameClass}>
              <img className={imageClass} src={images[0]?.src} alt={images[0]?.alt ?? title} />
            </div>
          )}

          <div className="flex items-center justify-between gap-4 py-3">
            <div className="w-20" />
            <div className="flex justify-center gap-2">
              {hasCarousel ? images.map((image, index) => (
                <a className="btn btn-xs" href={`#${id}-${index + 1}`} key={image.src}>{index + 1}</a>
              )) : null}
            </div>
            <form method="dialog">
              <button className="btn" type="submit">关闭</button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button type="submit">关闭</button>
        </form>
      </dialog>
    </>
  );
}
