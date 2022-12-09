import clsx from "clsx";
import { generateDecoratedLinkClassName } from "common/helpers";
import { Link as CommonLink } from "common/Link";
import { memo, ReactNode } from "react";
const linkClassName = generateDecoratedLinkClassName({
  activeCondition: "lg:hover:before:w-full",
});

export const Link = memo(function Link(props: {
  children: ReactNode;
  className?: string;
  href: string;
  target?: string;
}) {
  return (
    <CommonLink
      href={props.href}
      className={clsx(linkClassName, props.className)}
      {...(props.target && { target: props.target })}
    >
      {props.children}
    </CommonLink>
  );
});
