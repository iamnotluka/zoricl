import React from 'react'
import { Header } from '../Header';
import { MarkdownSection } from '../MarkdownSection';
import DateSignature from '../DateSignature';

interface KnowledgeBaseProps {
    backPage: string;
}

const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({backPage}) => {
  return (
    <div>
      <Header previousPage={backPage}/>
      <DateSignature date="18 October 2023 at 10:15am"/>
      <MarkdownSection markdownFileName='knowledge_base_intro.txt'/>
    </div>
  )
}

export default KnowledgeBase;