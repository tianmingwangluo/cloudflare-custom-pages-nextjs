import type { ReactNode } from "react";
import Footer from "../cf/Footer";
import { BaseLayout } from "./BaseLayout";

interface CFLayoutProps {
  children: ReactNode;
}

export const CFLayout = ({ children }: CFLayoutProps) => {
  return (
    <BaseLayout>
      <div className="flex min-h-screen flex-col px-4 py-5 sm:px-6 sm:py-8 lg:px-10">
        <main className="flex flex-1 items-center">
          <div className="mx-auto w-full">{children}</div>
        </main>

        <div className="mx-auto mt-5 w-full max-w-5xl">
          <Footer />
        </div>
      </div>
    </BaseLayout>
  );
};

export default CFLayout;
