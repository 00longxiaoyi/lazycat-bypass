import { useEffect, useRef } from "react";

type SurgeExistingConfigNameInputProps = {
  value: string;
  onChange: (value: string) => void;
  onConfirm: () => void;
};

export function SurgeExistingConfigNameInput({ value, onChange, onConfirm }: SurgeExistingConfigNameInputProps) {
  const canConfirm = value.trim().length > 0;
  const scrollYRef = useRef(0);
  const originalStyleRef = useRef({
    bodyOverflow: "",
    bodyPosition: "",
    bodyTop: "",
    bodyWidth: "",
    htmlOverflow: "",
    htmlOverscrollBehavior: ""
  });

  useEffect(() => {
    scrollYRef.current = window.scrollY;
    originalStyleRef.current = {
      bodyOverflow: document.body.style.overflow,
      bodyPosition: document.body.style.position,
      bodyTop: document.body.style.top,
      bodyWidth: document.body.style.width,
      htmlOverflow: document.documentElement.style.overflow,
      htmlOverscrollBehavior: document.documentElement.style.overscrollBehavior
    };

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.width = "100%";
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.overscrollBehavior = "none";

    return () => {
      document.body.style.overflow = originalStyleRef.current.bodyOverflow;
      document.body.style.position = originalStyleRef.current.bodyPosition;
      document.body.style.top = originalStyleRef.current.bodyTop;
      document.body.style.width = originalStyleRef.current.bodyWidth;
      document.documentElement.style.overflow = originalStyleRef.current.htmlOverflow;
      document.documentElement.style.overscrollBehavior = originalStyleRef.current.htmlOverscrollBehavior;
      window.scrollTo(0, scrollYRef.current);
    };
  }, []);

  return (
    <div className="mx-auto flex min-h-72 w-full flex-col items-center justify-center gap-3 py-4">
      <div className="flex w-full gap-2">
        <input
          className="input input-bordered min-w-0 flex-1 text-base"
          type="text"
          placeholder="请输入现有Surge配置名称"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        <button className="btn btn-primary shrink-0 px-5" type="button" disabled={!canConfirm} onClick={onConfirm}>
          确认
        </button>
      </div>
      <div className="w-full overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-sm">
        <img
          className="block w-full object-contain"
          src="/imgs/surge/ios/sure-ios-get-use-config-name-1.png"
          alt="Surge 查看现有配置名称示例"
        />
      </div>
    </div>
  );
}
