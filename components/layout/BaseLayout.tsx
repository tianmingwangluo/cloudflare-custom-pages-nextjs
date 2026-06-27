import type { JSX, ReactNode } from "react";

interface BaseLayoutProps {
  children: ReactNode;
}

export const BaseLayout = ({ children }: BaseLayoutProps): JSX.Element => {
  return (
    <div className="min-h-screen w-full bg-[#f7f8f5] text-zinc-950 antialiased dark:bg-[#0d0f0c] dark:text-zinc-50">
      {children}
    </div>
  );
};

export default BaseLayout;
