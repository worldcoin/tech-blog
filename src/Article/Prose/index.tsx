import clsx from "clsx";
import { ElementType, ReactNode } from "react";

export function Prose({
  as: Component = "div",
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Component
      className={clsx(
        //global
        className,
        "text-18 md:text-20 leading-[1.6] font-serif",
        "prose prose-slate max-w-none",
        // paragraph
        "prose-p:text-353535",
        // headings
        "prose-headings:font-sans prose-headings:font-semibold prose-headings:scroll-pt-32",
        "prose-h2:text-24",
        "prose-h3:text-18",
        // pre
        "prose-pre:rounded-2xl prose-pre:p-6",
        // images
        "prose-img:my-5 prose-img:mx-auto",
        // code
        "prose-code:before:content-none prose-code:after:content-none",
        // strong
        "prose-strong:text-6f7a85"
      )}
    >
      {children}
    </Component>
  );
}
