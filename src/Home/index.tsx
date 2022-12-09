import { ArrowLink } from "common/ArrowLink";
import { Hero } from "common/Hero";
import {
  ApiGetBlogCategoriesResponse,
  ApiGetBlogPostsResponse,
} from "common/types";
import Image from "next/image";
import heroImage from "public/images/hero.svg";
import { Fragment, memo } from "react";
import { BlogList } from "./BlogList";

export type HomePageProps = {
  categories: ApiGetBlogCategoriesResponse["categories"];
  posts: ApiGetBlogPostsResponse["posts"];
};

export const Home = memo(function Home(props: HomePageProps) {
  return (
    <Fragment>
      <Hero
        className="pt-28 pb-36 md:py-40 2xl:pt-72 2xl:pb-40"
        contentClassName="gap-15 md:gap-9"
        image={
          <Image
            src={heroImage}
            alt=""
            className="absolute bottom-0 right-0 origin-bottom scale-[60%] md:scale-100 translate-x-1/4 md:translate-x-[15%] 2xl:translate-x-0"
          />
        }
      >
        <div className="md:w-min space-y-7.5 md:space-y-5">
          <h1 className="text-36 2xl:text-42 md:whitespace-nowrap font-bold xl:pr-13">
            The Worldcoin Tech Blog
          </h1>

          <h2 className="text-20 2xl:text-24 font-serif tracking-[-0.005em]">
            Completely free resource for blockchain technology and community
            services
          </h2>
        </div>

        {/* FIXME: take user to most recent article automatically */}
        <ArrowLink
          href="/blog/4844-testimonial"
          className="text-7068fa text-18 md:text-20"
        >
          Start reading
        </ArrowLink>
      </Hero>

      <BlogList categories={props.categories} posts={props.posts} />
    </Fragment>
  );
});
