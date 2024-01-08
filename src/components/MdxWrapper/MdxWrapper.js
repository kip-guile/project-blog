import React from 'react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import dynamic from 'next/dynamic'
import CodeSnippet from '../CodeSnippet'

const DivisionGroupsDemo = dynamic(() => import('../DivisionGroupsDemo'))

function MdxWrapper({ content }) {
  return (
    <MDXRemote
      source={content}
      components={{
        pre: CodeSnippet,
        DivisionGroupsDemo: DivisionGroupsDemo,
      }}
    />
  )
}

export default MdxWrapper
