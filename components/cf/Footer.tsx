import { memo } from "react";

interface InfoItemProps {
  label: string;
  value: string;
}

const InfoItem = memo(({ label, value }: InfoItemProps) => (
  <span className="inline-flex min-w-0 items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
    <span className="shrink-0 text-zinc-400 dark:text-zinc-500">{label}</span>
    <span className="min-w-0 truncate font-mono text-zinc-600 dark:text-zinc-300">
      {value}
    </span>
  </span>
));

InfoItem.displayName = "InfoItem";

const Separator = memo(() => (
  <span className="hidden h-3 w-px bg-zinc-200 sm:inline-flex dark:bg-zinc-800" />
));

Separator.displayName = "Separator";

export const Footer = memo(() => {
  return (
    <footer className="rounded-lg border border-zinc-200 bg-white/70 px-4 py-3 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/60">
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3">
        <InfoItem label="地区" value="::GEO::" />
        <Separator />
        <InfoItem label="IP" value="::CLIENT_IP::" />
        <Separator />
        <InfoItem label="Ray ID" value="::RAY_ID::" />
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
export default Footer;
