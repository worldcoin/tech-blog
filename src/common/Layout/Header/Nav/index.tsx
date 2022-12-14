import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import clsx from "clsx";
import { generateDecoratedLinkClassName } from "common/helpers";
import { Link } from "common/Link";
import { SubscribeForm } from "common/SubscribeForm";
import { MenuItem } from "common/types";
import { forwardRef, memo, useEffect } from "react";
import { NavItem } from "./NavItem";

export const Nav = memo(
  forwardRef<
    HTMLDivElement,
    {
      className?: string;
      isShown: boolean;
      closeMenu: () => void;
      menuItems: Array<MenuItem>;
    }
  >(function Nav(props, ref) {
    const classList = [
      "overflow-hidden",
      "overscroll-none",
      "lg:overscroll-auto",
      "lg:overflow-auto",
      "w-screen",
    ];

    // NOTE Adds necessary classnames to body when mobile nav is active/inactive
    useEffect(() => {
      if (props.isShown) {
        document.body.classList.add(...classList);
        disableBodyScroll(document.body);
        return;
      }

      if (
        document.body.classList.contains("overflow-hidden") &&
        document.body.classList.contains("overscroll-none") &&
        document.body.classList.contains("lg:overscroll-auto") &&
        document.body.classList.contains("lg:overscroll-auto")
      ) {
        document.body.classList.remove(...classList);
        enableBodyScroll(document.body);
      }
    });

    // Translate added to prevent bug with height of nested fixed elements
    return (
      <div
        className={clsx(
          "fixed lg:static inset-0 h-screen lg:h-auto bg-000000 translate-x-0 transition-all duration-300",
          {
            "visible bg-000000/50 lg:bg-000000/0": props.isShown,
            "invisible lg:visible bg-000000/0": !props.isShown,
          },
          props.className
        )}
      >
        <div
          ref={ref}
          className={clsx(
            "fixed z-20 right-0 grid content-between w-full sm:w-auto h-full bg-ffffff text-010101 md:text-ffffff",
            "sm:p-7.5 px-3.5 sm:pl-12 pt-36 sm:pt-40 pb-10 transition-transform/opacity duration-300",
            "lg:static lg:h-auto lg:p-0 lg:bg-transparent",
            { "translate-x-full lg:translate-x-0": !props.isShown }
          )}
        >
          <div className="grid gap-x-7.5 gap-y-3.5 lg:grid-flow-col justify-items-start">
            {props.menuItems.map((item: MenuItem, index: number) => (
              <NavItem
                key={`menuItem-${index}`}
                href={item.url}
                onClick={props.closeMenu}
                target={item.target}
              >
                {item.title}
              </NavItem>
            ))}
          </div>

          <SubscribeForm className="lg:hidden w-full" isStaticArrow />
        </div>
      </div>
    );
  })
);
