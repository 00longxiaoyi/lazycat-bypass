import { type ChangeEvent, type ReactNode } from "react";
import { StepCard } from "../shared/StepCard";

type PcSharedConfigGeneratorProps = {
  title: string;
  steps: string[];
  currentStep: number;
  sourceConfig: string;
  error: string;
  canGoNext: boolean;
  generatedConfig: string;
  fileInputAccept: string;
  inputPlaceholder: string;
  uploadLabel: string;
  downloadLabel: string;
  onSourceConfigChange: (value: string) => void;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
  onBack: () => void;
  onDownload: () => void;
  renderTopNotice: () => ReactNode;
  renderExtraTop?: () => ReactNode;
  renderExtraStep?: (step: number) => ReactNode;
};

export function PcSharedConfigGenerator({
  title,
  steps,
  currentStep,
  sourceConfig,
  error,
  canGoNext,
  generatedConfig,
  fileInputAccept,
  inputPlaceholder,
  uploadLabel,
  downloadLabel,
  onSourceConfigChange,
  onFileChange,
  onNext,
  onBack,
  onDownload,
  renderTopNotice,
  renderExtraTop,
  renderExtraStep
}: PcSharedConfigGeneratorProps) {
  return (
    <div className="space-y-6">
      {renderTopNotice()}
      {renderExtraTop?.()}
      <StepCard title={title} items={steps} currentIndex={currentStep} />

      {currentStep === 0 ? (
        <div className="card card-border bg-base-100 shadow-sm">
          <div className="card-body gap-4">
            <div className="flex items-center justify-between gap-4">
              <h2 className="card-title">{uploadLabel}</h2>
            </div>
            <input className="file-input file-input-bordered w-full" type="file" accept={fileInputAccept} onChange={onFileChange} />
            {error ? <div role="alert" className="alert alert-error text-sm">{error}</div> : null}
            <textarea className="textarea min-h-72 w-full font-mono text-xs leading-5" value={sourceConfig} onChange={(event) => onSourceConfigChange(event.target.value)} placeholder={inputPlaceholder} />
            <div className="card-actions justify-end">
              <button className="btn btn-primary btn-sm" type="button" disabled={!canGoNext} onClick={onNext}>
                下一步
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {renderExtraStep?.(currentStep)}

      {currentStep === 1 && generatedConfig ? (
        <div className="card card-border bg-base-100 shadow-sm">
          <div className="card-body gap-4">
            <div className="flex items-center justify-between gap-4">
              <h2 className="card-title">{downloadLabel}</h2>
              <button className="btn btn-primary btn-sm" type="button" onClick={onDownload}>
                下载新配置
              </button>
            </div>
            <textarea className="textarea min-h-96 w-full font-mono text-xs leading-5" readOnly value={generatedConfig} />
            <div className="card-actions justify-start">
              <button className="btn btn-ghost btn-sm" type="button" onClick={onBack}>
                上一步
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
