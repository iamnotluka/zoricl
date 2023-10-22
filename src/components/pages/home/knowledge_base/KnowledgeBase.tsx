import React from 'react'
import { Header } from '../../../Header';
import { MarkdownSection } from '../../../MarkdownSection';
import DateSignature from '../../../DateSignature';
import KnowledgeBaseSarchTree from './KnowledgeBaseSearchTree';

interface KnowledgeBaseProps {
    backPage: string;
}

const data: any = {
  "Technical Challenges": {
    "Project one": {},
    "Project two": {}
  },
  "Software Engineering": {
    "Topic one": {
      "resource": "MARKDOWN_resoource_topic_one.txt"
    },
    "Topic two": {}
  },
  "Books and Resources": {
    "resource": "books_and_resources.txt"
  }
};

const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({backPage}) => {
  return (
    <div>
      <Header previousPage={backPage}/>
      <DateSignature date="19 October 2023 at 11:23am"/>
      <MarkdownSection markdownFileName='knowledge_base_intro.txt'/>
      {/* <KnowledgeBaseSarchTree data={data}/> */}
    </div>
  )
}

export default KnowledgeBase;