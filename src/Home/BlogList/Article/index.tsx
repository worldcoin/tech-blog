import clsx from "clsx";
import { ArrowLink } from "common/ArrowLink";
import { renderReadTime } from "common/helpers";
import { PageMeta } from "common/types";
import dayjs from "dayjs";
import Image from "next/image";
import { memo } from "react";

export const Article = memo(function Article(props: { post: PageMeta }) {
  return (
    <article
      className="space-y-6 md:space-y-12 border-b border-010101/10 py-10 md:py-12"
      itemScope
      itemType="https://schema.org/BlogPosting"
    >
      <div className="space-y-2.5 md:space-y-5">
        {props.post.author && (
          <div
            className="flex gap-2 text-14 items-center"
            itemScope
            itemType="https://schema.org/Person"
          >
            {props.post.author.picture && (
              <Image
                src={props.post.author.picture}
                width={16}
                height={16}
                alt={props.post.author.name}
                itemProp="image"
                className="object-contain aspect-square rounded-full"
              />
            )}

            <span itemProp="name" className="leading-[100%]">
              {props.post.author.name}
            </span>
          </div>
        )}

        <div className="grid grid-cols-[1fr_auto] items-center grid-flow-row gap-y-3 md:gap-x-38">
          <h3
            itemProp="name"
            className={clsx("text-32 font-bold self-end", {
              "col-span-2": !props.post.poster,
            })}
          >
            {props.post.title}
          </h3>

          {props.post.poster && (
            <div className="w-20 md:w-32 aspect-square md:row-span-2">
              <Image
                src={props.post.poster}
                width={400}
                height={400}
                alt={props.post.title}
                className="w-full"
              />
            </div>
          )}

          <div
            itemProp="description"
            className={clsx(
              "text-18 text-626467 font-serif row-start-2 self-start",
              {
                "col-span-2 md:col-span-1": props.post.poster,
                "col-span-2": !props.post.poster,
              }
            )}
          >
            {props.post.description}
          </div>
        </div>
      </div>

      <div className="flex gap-4 items-center justify-between">
        <div className="text-626467 flex gap-2">
          <span itemProp="datePublished">
            {dayjs(props.post.date).format("MMMM DD, YYYY")}
          </span>
          &middot;
          <span className="lowercase">
            {renderReadTime(props.post.readTime, true)}
          </span>
        </div>

        <ArrowLink
          href={props.post.url}
          className="text-7068fa text-18 font-normal"
        >
          Learn more
        </ArrowLink>
      </div>
    </article>
  );
});
