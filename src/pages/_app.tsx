import "assets/globals.css";
import { Layout } from "common/Layout";
import { Meta } from "common/Meta";
import { PageMeta, TOC } from "common/types";
import { usePostHog } from "hooks/use-posthog";
import { AppProps as NextAppProps } from "next/app";
import getConfig from "next/config";
import { Fragment, useEffect, useMemo } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import posthog from "posthog-js";
import { CookieBanner } from "common/CookieBanner/CookieBanner";

const SITE_NAME = "Tech blog • Worldcoin";
const { publicRuntimeConfig } = getConfig();

type AppProps =
  | {
      isBlog: false;
      meta: never;
      toc: never;
      relatedPosts: never;
    }
  | {
      isBlog: true;
      meta: PageMeta;
      toc: TOC;
      relatedPosts: Array<PageMeta>;
    };

export default function App(props: NextAppProps<AppProps>) {
  usePostHog();

  useEffect(() => {
    const apiKey = publicRuntimeConfig.NEXT_PUBLIC_POSTHOG_API_KEY;

    const persistence =
      window.localStorage.getItem("cookieBanner") === "rejected"
        ? "memory"
        : "localStorage+cookie";

    if (apiKey) {
      // Only capture basic analytics on visits, IP addresses are not stored
      posthog.init(apiKey, {
        autocapture: false,
        persistence,
      });
    }
  }, []);

  const metaProps = useMemo(() => {
    const { title, description, poster, socialImage } =
      props.pageProps.meta || {};

    return {
      title: `${title ? `${title} | ` : ""}${SITE_NAME}`,
      description,
      imageUrl: socialImage ?? poster ?? "/images/default-preview.png",
    };
  }, [props.pageProps.meta]);

  return (
    <Fragment>
      <Meta {...metaProps}>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#191919"
        />
        <link
          key="canonical"
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_APP_URL}${props.router.asPath}`}
        />
      </Meta>

      <Layout
        menuItems={[
          {
            title: "Docs",
            url: "https://id.worldcoin.org",
            target: "_blank",
          },
          {
            title: "GitHub",
            url: "https://github.com/worldcoin",
            target: "_blank",
          },
          {
            title: "Website",
            url: "https://worldcoin.org",
            target: "_blank",
          },

          {
            title: "Careers",
            url: "https://worldcoin.org/careers",
            target: "_blank",
          },
        ]}
      >
        <props.Component {...props.pageProps} />
      </Layout>

      <CookieBanner />
      <ToastContainer />
    </Fragment>
  );
}
