import React from 'react'
import { Header } from '../../../Header';
import { MarkdownSection } from '../../../MarkdownSection';
import DateSignature from '../../../DateSignature';
import { Link } from 'react-router-dom';
import { KnowledgeBaseRoute } from '../../../PageContents';

interface KnowledgeBaseProps {
    backPage: string;
    knowledgeBaseRoutes: KnowledgeBaseRoute[];
    intro: string;
    date: string;
}

const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({backPage, knowledgeBaseRoutes, intro, date}) => {
  return (
    <div>
      <Header previousPage={backPage}/>
      <DateSignature date={date}/>
      <MarkdownSection markdownFileName={intro}/>
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