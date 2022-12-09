import clsx from "clsx";
import { TOC as TOCType } from "common/types/index";
import {
  Fragment,
  memo,
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { TOCItem as Item } from "./TOCItem";

export const TOC = memo(function TOC(props: {
  toc: TOCType;
  contentRef?: MutableRefObject<HTMLElement | null>;
}) {
  const navRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState(props.toc[0]?.id);

  const allIds = useMemo(
    () =>
      props.toc.reduce<Array<string>>(
        (result, item) => [
          ...result,
          item.id,
          ...(item.children?.map((child) => child.id) || []),
        ],
        []
      ),
    [props.toc]
  );

  // Intersection observer current heading
  useEffect(() => {
    const contentEl = props.contentRef?.current;

    if (!contentEl) {
      return;
    }

    const headingEls = Array.from(contentEl.querySelectorAll("h2,h3"));

    const ioCallback: IntersectionObserverCallback = (entries) => {
      entries.map((entry) => {
        if (entry.isIntersecting) {
          setActiveId((prevId) =>
            allIds.includes(entry.target.id) ? entry.target.id : prevId
          );
        }
      });
    };

    const io = new IntersectionObserver(ioCallback, {
      rootMargin: "-68px 0px -50% 0px",
    });

    headingEls.map((headingEl) => io.observe(headingEl));

    return () => {
      headingEls.map((headingEl) => io.unobserve(headingEl));
      io.disconnect();
    };
  }, [allIds, props.contentRef]);

  // Tracker position
  useEffect(() => {
    const navEl = navRef.current;

    if (!navEl) {
      return;
    }

    const activeEl = navEl.querySelector(
      `[href="#${activeId}"]`
    ) as HTMLElement | null;
    const parentEl = activeEl?.parentElement;

    if (activeEl && parentEl) {
      const trackerStart = Math.min(
        Math.max(activeEl.parentElement.offsetTop - 4, 0),
        navEl.clientHeight
      );
      const trackerHeight = Math.min(
        Math.max(activeEl.offsetHeight + 4, 0),
        navEl.clientHeight - trackerStart
      );

      navEl.style.setProperty("--trackerPos", `${trackerStart}px`);
      navEl.style.setProperty("--trackerHeight", `${trackerHeight}px`);
    }
  }, [activeId]);

  if (props.toc.length <= 0) {
    return null;
  }

  return (
    <nav
      className={clsx(
        "relative whitespace-nowrap overflow-hidden",
        "before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-f1f2f2",
        "after:absolute after:bg-7068fa after:left-0 transition-all after:rounded-r-xl after:w-0.5 after:transition-all",
        "after:top-[var(--trackerPos)] after:h-[var(--trackerHeight,_16px)]"
      )}
      ref={navRef}
    >
      <ul className="relative grid gap-2 [&>li>ul]:pt-2">
        {props.toc.map((parent, parentIdx) => (
          <Fragment key={parentIdx}>
            <Item {...parent} active={parent.id === activeId} />

            {parent.children?.map((child, childIdx) => (
              <Item
                {...child}
                key={childIdx}
                active={child.id === activeId}
                className="pl-4"
              />
            ))}
          </Fragment>
        ))}
      </ul>
    </nav>
  );
});
