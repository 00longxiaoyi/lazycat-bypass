import type { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
  className?: string;
};

export function PageContainer({ children, className = "" }: PageContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-3 sm:px-4 ${className}`.trim()}>
      {children}
    </div>
  );
}
