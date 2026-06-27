import { Icon } from "@/components/ui/icon";
import type { Section } from "@/config/home";
import { colorSchemes } from "@/config/home";
import { clsx as cx } from "clsx";
import { CardItem } from "./card-item";

interface CardSectionProps extends Section {}

export const CardSection = ({
  title,
  description,
  icon,
  color,
  pages,
}: CardSectionProps) => {
  const classes = colorSchemes[color];

  return (
    <section
      className={cx(
        "h-full rounded-lg border bg-white p-5 shadow-sm transition-colors dark:bg-zinc-950",
        classes.border,
      )}
    >
      <div className="mb-5 flex items-start gap-4">
        <div
          className={cx(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-md ring-1",
            classes.iconBg,
          )}
        >
          <Icon name={icon} className={cx("h-5 w-5", classes.iconText)} />
        </div>
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
            {title}
          </h2>
          <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            {description}
          </p>
        </div>
      </div>

      <div className="grid gap-2">
        {pages.map((page) => (
          <CardItem key={page.path} page={page} classes={classes} />
        ))}
      </div>
    </section>
  );
};
