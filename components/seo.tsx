import { NextSeo } from "next-seo";
import { defaultUrl } from "next-seo.config";
import { useRouter } from "next/router";
import React from "react";
import { Image } from "types";

interface Props {
  title: string;
  image?: Image;
}

export const SEO: React.FC<Props> = ({ image, ...props }) => {
  const router = useRouter();

  const SEO = {
    openGraph: {
      ...(image && {
        images: [
          {
            ...image,
            alt: props.title,
          },
        ],
      }),
      url: defaultUrl + router.asPath,
      ...props,
    },
    ...props,
  };

  return <NextSeo {...SEO} />;
};
