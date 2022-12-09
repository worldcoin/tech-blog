import clsx from "clsx";
import { layout } from "common/styles";
import dayjs from "dayjs";
import getConfig from "next/config";
import { memo } from "react";
import { Link } from "./Link";
const { publicRuntimeConfig } = getConfig();
const estimatedYear = 2021;
const currentYear = Number(dayjs().format("YYYY"));

export const Footer = memo(function Footer(props: {
  className?: string;
  footerBorder?: boolean;
}) {
  return (
    <footer
      className={clsx(
        layout.paddingHorizontal,
        props.className,
        "grid gap-y-1 grid-cols-1fr/auto lg:grid-cols-auto/1fr/auto content-end text-14",
        "pt-8 pb-5 lg:pb-10",
        { "mt-12 lg:mt-40 border-t border-e8e8ea": props.footerBorder }
      )}
    >
      <div
        className={clsx(
          "col-span-2 lg:col-span-1 place-content-between justify-start items-center leading-5 text-8c8c92",
          "lg:col-start-3 lg:row-start-3 lg:self-end grid gap-3 lg:gap-x-4 grid-flow-col lg:justify-end"
        )}
      >
        <span>
          © {estimatedYear}
          {currentYear > estimatedYear && `-${currentYear}`} Tools for Humanity
          Corporation
        </span>

        <div className="w-0.5 h-0.5 bg-8c8c92 rounded-full" />

        <Link href="https://worldcoin.org/privacy-statement" target="_blank">
          Privacy
        </Link>

        <div className="w-0.5 h-0.5 bg-8c8c92 rounded-full" />

        <Link href="https://discord.gg/worldcoin" target="_blank">
          Discord
        </Link>

        <div className="w-0.5 h-0.5 bg-8c8c92 rounded-full" />

        <Link href="https://developer.worldcoin.org" target="_blank">
          Developer Portal
        </Link>
      </div>
    </footer>
  );
});
