import type { ReactNode } from "react";

interface CFCardWrapProps {
  children: ReactNode;
  className?: string;
}

export const CFCardWrap = ({ children, className }: CFCardWrapProps) => {
  return <div className={className}>{children}</div>;
};
