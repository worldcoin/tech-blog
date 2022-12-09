import clsx from "clsx";
import { fetchApi } from "common/helpers";
import { layout } from "common/styles";
import { ApiGetBlogPostsResponse, PageMeta } from "common/types";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { memo, useCallback, useMemo, useState } from "react";
import { Article } from "./Article";
import { Filter } from "./Filter";
dayjs.extend(localizedFormat);

export type BlogListFilter = {
  category: Array<{ title: string; value?: string }>;
};

export type BlogListFilterValues = {
  category: BlogListFilter["category"][number]["value"];
};

export const BlogList = memo(function BlogList(props: {
  categories: Array<string>;
  posts: Array<PageMeta>;
}) {
  const [posts, setPosts] = useState(props.posts);

  const filterCategories = useMemo(() => {
    return props.categories.map((category) => ({
      title: category,
      value: category,
    }));
  }, [props.categories]);

  const handleChangeFilter = useCallback(async (data: BlogListFilterValues) => {
    const newPosts = await fetchApi<ApiGetBlogPostsResponse>(
      "/get-blog-posts",
      { params: data }
    );
    setPosts(newPosts.posts);
  }, []);

  return (
    <section
      className={clsx(
        "relative overflow-clip pt-15 pb-64 flex flex-col lg:flex-row md:gap-32 2xl:gap-60",
        layout.paddingHorizontal
      )}
    >
      <aside className="md:min-w-[230px]">
        <Filter categories={filterCategories} onChange={handleChangeFilter} />
      </aside>

      <main>
        {posts.map((post, index) => (
          <Article post={post} key={index} />
        ))}
      </main>

      <div className="hidden bg-[url('/images/octagon-pattern.svg')] absolute bottom-[-270px] left-[-168px] w-[860px] h-[913px] bg-no-repeat z-0 pointer-events-none" />
      <div className="hidden md:block bg-[url('/images/octagon-pattern.svg')] absolute bottom-[-500px] right-[-200px] w-[860px] h-[913px] bg-no-repeat -scale-x-100 z-0 pointer-events-none" />
    </section>
  );
});
