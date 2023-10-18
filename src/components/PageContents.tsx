import { MarkdownSection } from './MarkdownSection'
import Button from './Button'
import { useState } from 'react';

export const PageContents = () => {
  const linkedinURL = 'https://www.linkedin.com/in/luka-zoric';
  const [view, setView] = useState('home');

  return (
    <div>
        {view == 'home' && <MarkdownSection markdownFileName='introduction.txt'  centralise={false}/>}
        {view == 'career' && <MarkdownSection markdownFileName='intro_page_content.txt' centralise={false}/>}
    </div>
  )
}
