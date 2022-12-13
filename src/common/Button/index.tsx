import clsx from "clsx";
import { ComponentPropsWithoutRef, ElementType, memo } from "react";

interface ButtonInterface<C extends ElementType = "button"> {
  variant?: "contained" | "outlined" | "default";
  color?: "primary" | "success" | "danger" | "default";
  size?: "md" | "lg";
  fullWidth?: boolean;
  maxWidth?: "xs";
  loading?: boolean;
  disabled?: boolean;
  component?: C;
}

export const Button = memo(function Button<C extends ElementType = "button">(
  props: ButtonInterface<C> & ComponentPropsWithoutRef<C>
) {
  const {
    className,
    variant = "default",
    color = "default",
    size = "lg",
    fullWidth,
    maxWidth,
    loading,
    disabled,
    component: Component = "button",
    ...otherProps
  } = props;

  return (
    <Component
      disabled={props.disabled}
      className={clsx(
        "grid grid-flow-col justify-center items-center select-none font-sora leading-4 cursor-pointer hover:opacity-80",
        { "opacity-30 pointer-events-none": disabled || loading },
        { "h-14 uppercase font-semibold text-16": size === "lg" },
        { "h-10 text-14": size === "md" },
        { "w-full max-w-none": fullWidth },
        { "max-w-xs": maxWidth === "xs" },
        { "rounded-xl": variant === "contained" },
        { "rounded-xl border": variant === "outlined" },
        {
          "px-7":
            (variant === "contained" || variant === "outlined") &&
            size === "lg",
        },
        {
          "px-4":
            (variant === "contained" || variant === "outlined") &&
            size === "md",
        },
        {
          "bg-4940e0 text-ffffff":
            variant === "contained" && color === "primary",
        },
        {
          "border-4940e0 text-4940e0":
            variant === "outlined" && color === "primary",
        },
        {
          "bg-00c313 text-ffffff":
            variant === "contained" && color === "success",
        },
        { "px-0": variant === "default" },
        {
          "border-ff5a76 text-ff5a76":
            (variant === "default" || variant === "outlined") &&
            color === "danger",
        },
        {
          "bg-ff5a76 text-ffffff":
            variant === "contained" && color === "danger",
        },
        className
      )}
      {...otherProps}
    />
  );
});
