import { ThemeSwitch } from "@/components/theme-switch";
import type { ColorScheme } from "@/config/home";
import { clsx as cx } from "clsx";
import type { ReactNode } from "react";

interface CFCardProps {
  title: string;
  subtitle?: ReactNode;
  message: string;
  icon: ReactNode;
  scheme?: ColorScheme;
  children?: ReactNode;
  footer?: ReactNode;
}

const schemeClasses: Record<
  ColorScheme,
  {
    badge: string;
    icon: string;
    ring: string;
  }
> = {
  danger: {
    badge: "text-red-700 dark:text-red-300",
    icon: "bg-red-50 text-red-700 ring-red-100 dark:bg-red-950/50 dark:text-red-300 dark:ring-red-900/60",
    ring: "from-red-500/10",
  },
  warning: {
    badge: "text-amber-800 dark:text-amber-300",
    icon: "bg-amber-50 text-amber-800 ring-amber-100 dark:bg-amber-950/50 dark:text-amber-300 dark:ring-amber-900/60",
    ring: "from-amber-500/10",
  },
  primary: {
    badge: "text-sky-800 dark:text-sky-300",
    icon: "bg-sky-50 text-sky-800 ring-sky-100 dark:bg-sky-950/50 dark:text-sky-300 dark:ring-sky-900/60",
    ring: "from-sky-500/10",
  },
};

export const CFCard = ({
  title,
  subtitle,
  message,
  icon,
  scheme = "primary",
  children,
  footer,
}: CFCardProps) => {
  const classes = schemeClasses[scheme];

  return (
    <section
      className={cx(
        "relative mx-auto w-full max-w-5xl overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-[0_28px_90px_-64px_rgba(24,24,27,0.8)] dark:border-zinc-800 dark:bg-zinc-950",
        "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-zinc-300 before:to-transparent dark:before:via-zinc-700",
      )}
    >
      <div
        className={cx(
          "absolute inset-x-0 top-0 h-32 bg-gradient-to-b to-transparent",
          classes.ring,
        )}
      />

      <div className="relative grid min-h-[520px] lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
          <div>
            <div className="mb-10 flex items-center justify-between gap-4">
              {subtitle && (
                <div
                  className={cx(
                    "min-w-0 text-xs font-medium",
                    classes.badge,
                  )}
                >
                  {subtitle}
                </div>
              )}
              <ThemeSwitch className="shrink-0" />
            </div>

            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <div
                className={cx(
                  "flex h-14 w-14 shrink-0 items-center justify-center rounded-lg ring-1",
                  classes.icon,
                )}
              >
                {icon}
              </div>

              <div className="min-w-0">
                <h1 className="text-2xl font-semibold leading-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
                  {title}
                </h1>
                {message && (
                  <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-300">
                    {message}
                  </p>
                )}
              </div>
            </div>

            {children && <div className="mt-10">{children}</div>}
          </div>
        </div>

        {footer && (
          <aside className="border-t border-zinc-200 bg-zinc-50/70 p-6 sm:p-8 lg:border-l lg:border-t-0 dark:border-zinc-800 dark:bg-zinc-900/40">
            {footer}
          </aside>
        )}
      </div>
    </section>
  );
};
