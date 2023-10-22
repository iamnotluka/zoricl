import React from 'react'
import { Header } from '../../../Header'

interface KnowledgeBaseResourceProps {
    previousPage: string;
}

const KnowledgeBaseResource: React.FC<KnowledgeBaseResourceProps> = ({ previousPage }) => {
  return (
    <div>
      <Header previousPage={previousPage}/>
    </div>
  )
}

export default KnowledgeBaseResource
