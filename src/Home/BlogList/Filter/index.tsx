import clsx from "clsx";
import { Icon } from "common/Icon";
import { BlogListFilter, BlogListFilterValues } from "Home/BlogList";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useOnClickOutside, useToggle } from "usehooks-ts";
import { FilterItem } from "./FilterItem";

export const Filter = memo(function Filter(props: {
  categories: BlogListFilter["category"];
  onChange: (arg: BlogListFilterValues) => void;
}) {
  const [selectedCategory, setSelectedCategory] =
    useState<BlogListFilterValues["category"]>();
  const ref = useRef(null);
  const [isOn, toggle, setIsOn] = useToggle();
  useOnClickOutside(ref, () => setIsOn(false));

  // dispatch on change filter
  useEffect(() => {
    props.onChange({ category: selectedCategory });
  }, [props, selectedCategory]);

  const handleSelectCategory = useCallback(
    (value: BlogListFilterValues["category"]) => {
      setSelectedCategory(value);
      setIsOn(false);
    },
    [setIsOn]
  );

  return (
    <div className="relative" ref={ref}>
      <FilterItem
        active
        onClick={toggle}
        className="flex items-center justify-between md:justify-center bg-29343f text-ffffff md:hidden"
      >
        {selectedCategory || "All categories"}

        <Icon
          name="triangle"
          className={clsx("w-3 h-3 md:hidden transition-transform", {
            "rotate-0": !isOn,
            "rotate-180": isOn,
          })}
        />
      </FilterItem>

      <ul
        className={clsx(
          "grid absolute gap-y-0.5  top-full w-full left-0 bg-29343f md:bg-transparent transition-all overflow-hidden",
          "md:relative md:gap-y-2",
          {
            "max-h-0 md:max-h-screen-y": !isOn,
            "max-h-screen-y": isOn,
          }
        )}
      >
        <FilterItem
          onClick={handleSelectCategory}
          active={typeof selectedCategory !== "string"}
          className={clsx({
            "hidden md:block": typeof selectedCategory !== "string",
            block: typeof selectedCategory === "string",
          })}
        >
          All categories
        </FilterItem>

        {props.categories.map((category, index) => (
          <li key={index}>
            <FilterItem
              value={category?.value}
              onClick={handleSelectCategory}
              active={selectedCategory === category.value}
            >
              {category.title}
            </FilterItem>
          </li>
        ))}
      </ul>
    </div>
  );
});
