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
    >
      <span className="yy-mark__moon" />
      <span className="yy-mark__wall">
        <span />
        <span />
        <span />
      </span>
    </span>
  );
}
