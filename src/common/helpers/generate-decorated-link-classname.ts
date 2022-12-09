import clsx from "clsx";

export const generateDecoratedLinkClassName = (params: {
  activeCondition: string;
  isActive?: boolean;
}) =>
  clsx(
    "relative before:transition-all before:duration-200 before:ease-out",
    "before:absolute before:bottom-0 before:h-px before:bg-current",
    params.isActive ? "before:w-full" : "before:w-0",
    params.activeCondition
  );
