import React from 'react'

import BlogSummaryCard from '@/components/BlogSummaryCard'

import { getBlogPostList } from '@/helpers/file-helpers'

import styles from './homepage.module.css'

export const metadata = {
  title: `Bits & Bytes`,
  description: 'A wonderful blog about JavaScript',
}

async function Home() {
  const posts = await getBlogPostList()

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>Latest Content:</h1>
      {posts?.map((post, index) => {
        const { slug, title, abstract, publishedOn } = post
        return (
          <BlogSummaryCard
            key={`blogpost-${index}`}
            slug={slug}
            title={title}
            abstract={abstract}
            publishedOn={publishedOn}
          />
        )
      })}
    </div>
  )
}

export default Home
