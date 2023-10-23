import React from 'react';
import { Header } from '../../../Header';
import { MarkdownSection } from '../../../MarkdownSection';
import DateSignature from '../../../DateSignature';

interface KnowledgeBaseResourceProps {
    backPage: string;
    markdownFileName: string;
    date: string;
}

const KnowledgeBaseResource: React.FC<KnowledgeBaseResourceProps> = ({ 
  backPage, 
  markdownFileName, 
  date 
}) => {
  return (
    <div>
      <Header previousPage={backPage} />
      <DateSignature date={date} />
      <MarkdownSection markdownFileName={markdownFileName} />
    </div>
  );
}

export default KnowledgeBaseResource;
