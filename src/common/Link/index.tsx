import clsx from "clsx";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { useRouter } from "next/router";
import { memo, useMemo } from "react";

type AnchorAndNextLinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof NextLinkProps
> &
  NextLinkProps & {
    children?: React.ReactNode;
  } & React.RefAttributes<HTMLAnchorElement>;

export type LinkProps = AnchorAndNextLinkProps & {
  activeClassName?: string;
  inactiveClassName?: string;
};

export const Link = memo(function Link(props: LinkProps) {
  const router = useRouter();
  const hasClassName =
    props.className || props.activeClassName || props.inactiveClassName;

  const linkClassName = useMemo(() => {
    if (!hasClassName) {
      return "";
    }

    return clsx(
      props.className,
      {
        [props.activeClassName as string]:
          props.activeClassName && router && router.pathname === props.href,
      },
      {
        [props.inactiveClassName as string]:
          props.inactiveClassName && router && router.pathname !== props.href,
      }
    );
  }, [
    hasClassName,
    props.activeClassName,
    props.className,
    props.href,
    props.inactiveClassName,
    router,
  ]);

  return (
    <NextLink {...props} className={linkClassName}>
      {props.children}
    </NextLink>
  );
});
