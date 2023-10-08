import React from 'react'
import { MarkdownSection } from './MarkdownSection'
import Button from './Button'

export const PageContents = () => {
  const linkedinURL = 'https://www.linkedin.com/in/luka-zoric';

  return (
    <div>
        <MarkdownSection markdownFileName='introduction.txt' cenralise={false}/>
        <Button url={linkedinURL} label='Add me on LinkedIn'></Button>
        <MarkdownSection markdownFileName='intro_page_content.txt' cenralise={false}/>
    </div>
  )
}
