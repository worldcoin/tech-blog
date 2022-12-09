import clsx from "clsx";
import { Icon, IconType } from "common/Icon";
import { memo } from "react";

export const SocialLink = memo(function SocialLink(props: {
  className?: string;
  icon: IconType;
  href: string;
}) {
  return (
    <a
      href={props.href}
      target="_blank"
      className={clsx(
        "flex w-5 h-5 transition-all",
        { "text-010101 hover:opacity-60": !props.className },
        props.className
      )}
      rel="noreferrer"
    >
      <Icon className="w-full h-full" name={props.icon} />
    </a>
  );
});
