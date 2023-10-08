import React from 'react'
import { MarkdownSection } from './MarkdownSection'

export const PageContents = () => {
  return (
    <div>
        <MarkdownSection markdownFileName='introduction.txt' cenralise={false}/>
    </div>
  )
}
