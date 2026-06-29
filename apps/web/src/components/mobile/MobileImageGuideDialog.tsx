import { useEffect, useRef, useState } from "react";

export type MobileGuideImage = {
  src: string;
  alt: string;
};

type MobileImageGuideDialogProps = {
  title: string;
  images: MobileGuideImage[];
  ariaLabel: string;
  buttonLabel?: string;
};

export function MobileImageGuideDialog({ title, images, ariaLabel, buttonLabel }: MobileImageGuideDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const hasPreviousImage = currentImageIndex > 0;
  const hasNextImage = currentImageIndex < images.length - 1;
  const scrollYRef = useRef(0);
  const originalBodyStyleRef = useRef({
    overflow: "",
    position: "",
    top: "",
    width: ""
  });

  function lockPageScroll() {
    scrollYRef.current = window.scrollY;
    originalBodyStyleRef.current = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width
    };
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.width = "100%";
  }

  function unlockPageScroll() {
    const originalBodyStyle = originalBodyStyleRef.current;
    document.body.style.overflow = originalBodyStyle.overflow;
    document.body.style.position = originalBodyStyle.position;
    document.body.style.top = originalBodyStyle.top;
    document.body.style.width = originalBodyStyle.width;
    window.scrollTo(0, scrollYRef.current);
  }

  function openDialog() {
    setCurrentImageIndex(0);
    dialogRef.current?.showModal();
    lockPageScroll();
  }

  function goPreviousImage() {
    if (!hasPreviousImage) return;
    setCurrentImageIndex((index) => Math.max(index - 1, 0));
  }

  function goNextImage() {
    if (!hasNextImage) return;
    setCurrentImageIndex((index) => Math.min(index + 1, images.length - 1));
  }

  useEffect(() => {
    return () => {
      if (dialogRef.current?.open) unlockPageScroll();
    };
  }, []);

  return (
    <>
      <button
        className={buttonLabel ? "btn btn-outline btn-sm" : "btn btn-ghost btn-circle btn-xs text-base-content/70"}
        type="button"
        aria-label={ariaLabel}
        onClick={openDialog}
      >
        {buttonLabel ?? "?"}
      </button>

      <dialog className="modal" ref={dialogRef} onClose={unlockPageScroll}>
        <div className="modal-box w-fit max-w-[86vw] p-3 sm:p-4">
          <div className="mb-3 flex items-center justify-end gap-2">
            <div className="mr-auto flex items-center gap-2">
              <span className="badge badge-outline badge-sm">{title}</span>
              <span className="text-sm font-medium tabular-nums text-base-content/60">
                {currentImageIndex + 1} / {images.length}
              </span>
            </div>
            <button className="btn btn-ghost btn-circle btn-sm disabled:pointer-events-none disabled:text-base-content/25 disabled:opacity-40" type="button" aria-label="上一页" disabled={!hasPreviousImage} onClick={goPreviousImage}>
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button className="btn btn-ghost btn-circle btn-sm disabled:pointer-events-none disabled:text-base-content/25 disabled:opacity-40" type="button" aria-label="下一页" disabled={!hasNextImage} onClick={goNextImage}>
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
            <form method="dialog">
              <button className="btn btn-ghost btn-circle btn-sm" type="submit" aria-label="关闭">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 6L6 18" />
                  <path d="M6 6l12 12" />
                </svg>
              </button>
            </form>
          </div>

          <div className="mx-auto overflow-hidden rounded-box border border-base-300 bg-base-200">
            <img
              className="block max-h-[82dvh] max-w-[82vw] object-contain"
              src={images[currentImageIndex]?.src}
              alt={images[currentImageIndex]?.alt ?? title}
            />
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button type="submit">关闭</button>
        </form>
      </dialog>
    </>
  );
}
