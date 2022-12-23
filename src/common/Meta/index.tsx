import getConfig from "next/config";
import Head from "next/head";
import { Fragment, memo, ReactNode } from "react";
const { publicRuntimeConfig } = getConfig();
const websiteUrl = publicRuntimeConfig.NEXT_PUBLIC_APP_URL;

const isValidUrl = (url: string) => {
  try {
    new URL(url);
  } catch (_error) {
    return false;
  }

  return true;
};

export const Meta = memo(function Meta(props: {
  children?: ReactNode;
  description?: string | null;
  title?: string | null;
  imageUrl?: string;
}) {
  return (
    <Head>
      {props.title && (
        <Fragment>
          <title>{props.title}</title>
          <meta
            property="og:title"
            name="title"
            content={props.title}
            key="og:title"
          />
          <meta
            name="twitter:title"
            content={props.title}
            key="twitter:title"
          />
        </Fragment>
      )}

      {props.description && (
        <Fragment>
          <meta
            name="twitter:description"
            content={props.description}
            key="twitter:description"
          />
          <meta
            property="og:description"
            name="description"
            content={props.description}
            key="og:description"
          />
          <meta
            name="description"
            content={props.description}
            key="description"
          />
        </Fragment>
      )}

      {props.imageUrl && (
        <Fragment>
          <meta
            property="og:image"
            name="image"
            content={`${
              (isValidUrl(props.imageUrl) ? "" : websiteUrl) + props.imageUrl
            }`}
            key="og:image"
          />

          <meta
            name="twitter:image"
            content={`${
              (isValidUrl(props.imageUrl) ? "" : websiteUrl) + props.imageUrl
            }`}
            key="twitter:image"
          />
        </Fragment>
      )}

      <meta name="twitter:card" content="summary" />

      {props.children}
    </Head>
  );
});
