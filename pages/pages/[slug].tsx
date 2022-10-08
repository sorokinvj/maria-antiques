import getAllTextPages from '@/lib/get-all-textpages'
import { getPageData } from '@/lib/get-page-data'
import getTextPageBySlug from '@/lib/get-text-page-slug'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/future/image'
import React from 'react'
import { TextPage } from 'types'
import textPageStyles from '../../styles/textPage.module.css'

function Page({ textPageData }: { textPageData: TextPage }) {
  return (
    <React.Fragment>
      <div className="pr-2 pl-2">
        {textPageData.page.heroImage && (
          <Image
            width={textPageData.page.heroImage.width}
            height={textPageData.page.heroImage.height}
            alt={textPageData.title}
            src={textPageData.page.heroImage.url}
            className="mt-4 sm:h-auto md:h-112 md:mb-8 object-cover w-full"
          />
        )}
        <div className="flex justify-center">
          <div
            className={textPageStyles.body}
            dangerouslySetInnerHTML={{ __html: textPageData.page.content.html }}
          />
        </div>
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
