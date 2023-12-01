import React from 'react'
import { Header } from '../../../Header';
import { MarkdownSection } from '../../../MarkdownSection';
import DateSignature from '../../../DateSignature';
import { Link } from 'react-router-dom';
import { KnowledgeBaseRoute } from '../../../PageContents';

interface KnowledgeBaseProps {
    backPage: string;
    knowledgeBaseRoutes: KnowledgeBaseRoute[]
}

const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({backPage, knowledgeBaseRoutes}) => {
  return (
    <div>
      <Header previousPage={backPage}/>
      <DateSignature date="19 October 2023 at 11:23am"/>
      <MarkdownSection markdownFileName='knowledge_base_intro.txt'/>
      <ul>
        {knowledgeBaseRoutes.map((knowledgeBaseRoute) => (   
          <li>
            <p><Link to={knowledgeBaseRoute.name}>{knowledgeBaseRoute.title}</Link></p>
            <ul className='subsection-date-ul'>
              <li className='subsection-date-li'>{knowledgeBaseRoute.date}</li>
            </ul>
          </li>
        ))}
      </ul>
      <p>
      </p>
    </div>
  );
}

export default KnowledgeBase;