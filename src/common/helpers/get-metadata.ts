import { calculateReadingTime } from "common/helpers";
import { PageMeta } from "common/types";
import dayjs from "dayjs";
import parse from "node-html-parser";
import { renderToString } from "react-dom/server";
import { BlogCategory } from "../../../types";

export class MetaCategoryError extends Error {}

/**
 * Parse metadata from ReactElement or html string
 * @param arg {ReactElement | string} React element or html string
 * @param metaTag {string} Sought-for html tag which contains metadata
 */

export function getMetadata(arg: string, url: string) {
  try {
    const meta: Partial<PageMeta> = { url };
    const pageString = typeof arg === "string" ? arg : renderToString(arg);
    const pageHtml = parse(pageString);
    const metaElement = pageHtml.querySelector("meta");

    if (!metaElement) {
      throw new Error("Cannot find meta element");
    }

    const titleElement = metaElement.querySelector(":scope > title");
    const authorElement = metaElement.querySelector(":scope > author");
    const descriptionElement = metaElement.querySelector(
      ":scope > description"
    );
    const dateElement = metaElement.querySelector(":scope > date");
    const posterElement = metaElement.querySelector(":scope > poster");
    const categoryElement = metaElement.querySelector(":scope > category");
    const readTimeElement = metaElement.querySelector(":scope > readtime");

    if (titleElement) {
      meta.title = titleElement?.textContent;
    } else {
      meta.title = pageHtml
        .querySelectorAll("h1,h2,h3,h4,h5,h6")
        .sort((a, b) => b.tagName.localeCompare(a.tagName))[0].textContent;
    }

    if (descriptionElement) {
      meta.description = descriptionElement?.textContent;
    }

    if (authorElement) {
      meta.author = {
        name: authorElement?.textContent,
        picture: authorElement.getAttribute("picture"),
      };
    }

    if (dateElement) {
      meta.date = dayjs(dateElement?.textContent).toString();
    }

    if (posterElement && posterElement.hasAttribute("src")) {
      meta.poster = posterElement.getAttribute("src");
    }

    if (categoryElement) {
      const categories = Object.values(BlogCategory) as Array<string>;
      const category = categoryElement.textContent;

      if (!categories.includes(category)) {
        throw new MetaCategoryError(
          `Blog post category should be in list "${categories.join(
            '", "'
          )}", but received "${category}"`
        );
      } else {
        meta.category = category as BlogCategory;
      }
    }

    if (readTimeElement) {
      meta.readTime = Number(readTimeElement.textContent);
    } else {
      // NOTE: remove meta tag for calculate read time
      metaElement.remove();
      meta.readTime = calculateReadingTime(pageHtml.textContent);
    }

    return meta;
  } catch (err) {
    if (err instanceof MetaCategoryError) {
      throw err;
    }
  }
}
