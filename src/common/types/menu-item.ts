import { LinkProps } from "common/Link";

export type MenuItem = {
  title: string;
  url: string;
  target?: LinkProps["target"];
};
