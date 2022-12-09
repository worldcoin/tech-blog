import clsx from "clsx";
import { generateDecoratedLinkClassName } from "common/helpers";
import { Link, LinkProps } from "common/Link";
import { useRouter } from "next/router";
import { memo, ReactNode } from "react";

export const NavItem = memo(function NavItem(props: {
  className?: string;
  href: string;
  children: ReactNode;
  target: LinkProps["target"];
  onClick?: () => void;
}) {
  const router = useRouter();
  const isActive = props.href === router.asPath;

  return (
    <Link
      className={clsx(
        "text-24 sm:text-18 select-none",
        props.className,
        generateDecoratedLinkClassName({
          activeCondition: "lg:hover:before:w-full",
          isActive,
        })
      )}
      href={props.href}
      onClick={props.onClick}
      target={props.target}
    >
      {props.children}
    </Link>
  );
});
