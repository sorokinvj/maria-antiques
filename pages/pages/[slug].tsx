import getAllTextPages from '@/lib/get-all-textpages'
import { getPageData } from '@/lib/get-page-data'
import getTextPageBySlug from '@/lib/get-text-page-slug'
import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { TextPage } from 'types'
import Image from 'next/image'

function Page({ textPageData }: { textPageData: TextPage }) {
  return (
    <React.Fragment>
      <div className="pl-4">
        {textPageData.page.heroImage && (
          <Image
            width={textPageData.page.heroImage.width}
            height={textPageData.page.heroImage.height}
            alt={textPageData.title}
            src={textPageData.page.heroImage.url}
          />
        )}

        <div
          className="md:w-3/4 sm:w-auto"
          dangerouslySetInnerHTML={{ __html: textPageData.page.content.html }}
        />
      </div>
    </React.Fragment>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getAllTextPages()
  const paths = pages.map((page: TextPage) => ({
    params: { slug: page.slug }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pageData = await getPageData()
  const textPageData = await getTextPageBySlug({ slug: params?.slug as string })

  return {
    props: {
      textPageData,
      ...pageData
    },
    revalidate: 1
  }
}

export default Page
