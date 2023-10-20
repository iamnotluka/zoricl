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
      <DateSignature date="19 October 2023 at 11:23am"/>
      <MarkdownSection markdownFileName='knowledge_base_intro.txt'/>
    </div>
  )
}

export default KnowledgeBase;