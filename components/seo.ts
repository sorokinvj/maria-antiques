import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

// @ts-expect-error TS(2307): Cannot find module 'next-seo.config' or its corres... Remove this comment to see the full error message
import { defaultUrl } from 'next-seo.config'

function SEO({
  image,
  ...props
}: any) {
  const router = useRouter()

  const SEO = {
    openGraph: {
      ...(image && {
        images: [
          {
            alt: props.title,
            ...image
          }
        ]
      }),
      url: defaultUrl + router.asPath,
      ...props
    },
    ...props
  }

  // @ts-expect-error TS(2362): The left-hand side of an arithmetic operation must... Remove this comment to see the full error message
  return <NextSeo {...SEO} />
}

export default SEO
