import { clsx as cx } from "clsx";

interface YueYuanMarkProps {
  compact?: boolean;
  className?: string;
}

export function YueYuanMark({ compact, className }: YueYuanMarkProps) {
  return (
    <span
      className={cx("yy-mark", compact && "yy-mark--compact", className)}
      aria-hidden="true"
    />
  );
}
