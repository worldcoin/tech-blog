import slugify from "@sindresorhus/slugify";
import { TOC } from "common/types";
import parse from "node-html-parser";
import { createElement, Fragment, ReactNode } from "react";
import { renderToString } from "react-dom/server";

export const collectHeadings = (reactNode: ReactNode): TOC => {
  const html = parse(
    // eslint-disable-next-line react/no-children-prop
    renderToString(createElement(Fragment, { children: reactNode }))
  );

  let result: TOC = [];

  html.querySelectorAll("h2,h3").map((el) => {
    const title = el.textContent;
    const id = slugify(title);

    if (!id) {
      return;
    }

    if (el.tagName === "H2") {
      result.push({
        id,
        title,
        children: [],
      });
    }

    if (el.tagName === "H3") {
      result[result.length - 1]?.children?.push({
        id,
        title,
      });
    }
  });

  return result;
};
