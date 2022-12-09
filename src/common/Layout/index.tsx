import clsx from "clsx";
import { layout } from "common/styles";
import { SubscribeForm } from "common/SubscribeForm";
import { MenuItem } from "common/types";
import { memo, ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

export type LayoutProps = {
  children: ReactNode;
  footerBorder?: boolean;
  menuItems: Array<MenuItem>;
};

export const Layout = memo(function Layout(props: LayoutProps) {
  return (
    <div
      className={clsx(
        "grid grid-rows-auto/1fr/auto min-h-screen selection:text-ffffff selection:bg-4940e0 bg-ffffff text-010101"
      )}
    >
      <Header menuItems={props.menuItems} />
      {props.children}

      <section
        className={clsx(
          "flex flex-col md:flex-row gap-40 md:gap-40 justify-between md:items-center py-15 md:py-28",
          "bg-dde7ea text-010101",
          layout.paddingHorizontal
        )}
      >
        <p className="text-24 md:text-32 font-semibold">
          Stay up to date with <br className="md:hidden" /> all things crypto.
        </p>

        <SubscribeForm
          className="text-20"
          inputClassName="!text-20 md:min-w-54 xl:min-w-[428px]"
          placeholder="Enter email"
          underline="field"
          variant="cta"
        />
      </section>

      <Footer footerBorder={props.footerBorder} />
    </div>
  );
});
