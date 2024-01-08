import React from 'react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import dynamic from 'next/dynamic'
import CodeSnippet from '../CodeSnippet'
import CircularColorsDemo from '../CircularColorsDemo'

const DivisionGroupsDemo = dynamic(() => import('../DivisionGroupsDemo'))

function MdxWrapper({ content }) {
  return (
    <MDXRemote
      source={content}
      components={{
        pre: CodeSnippet,
        CircularColorsDemo,
        DivisionGroupsDemo,
      }}
    />
  )
}

export default MdxWrapper
