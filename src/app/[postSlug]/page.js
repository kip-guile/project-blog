import React from 'react'

import BlogHero from '@/components/BlogHero'
import MdxWrapper from '@/components/MdxWrapper'

import { loadBlogPost } from '@/helpers/file-helpers'

import styles from './postSlug.module.css'
import { BLOG_TITLE } from '@/constants'

export const generateMetadata = React.cache(async ({ params }) => {
  const { frontmatter } = await loadBlogPost(params.postSlug)
  return {
    title: `${frontmatter?.title} • ${BLOG_TITLE}`,
    description: frontmatter?.abstract,
  }
})

async function BlogPost({ params }) {
  const { frontmatter, content } = await loadBlogPost(params.postSlug)

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter?.title}
        publishedOn={frontmatter?.publishedOn}
      />

      <div className={styles.page}>
        <MdxWrapper content={content} />
      </div>
    </article>
  )
}

export default BlogPost
