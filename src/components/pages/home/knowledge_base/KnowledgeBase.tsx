import React from 'react'
import { Header } from '../../../Header';
import { MarkdownSection } from '../../../MarkdownSection';
import DateSignature from '../../../DateSignature';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import KnowledgeBaseResource from './KnowledgeBaseResource';
import { Link } from 'react-router-dom';

interface KnowledgeBaseProps {
    backPage: string;
}

const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({backPage}) => {
  return (
    <div>
      <Header previousPage={backPage}/>
      <DateSignature date="19 October 2023 at 11:23am"/>
      <MarkdownSection markdownFileName='knowledge_base_intro.txt'/>
        <ul>
          <li>
            <p><Link to='test-topic'>💻 Software</Link></p>
          </li>
          <li>
            <p><Link to='test-topic'>💰 Business</Link></p>
          </li>
        <li>
      <Link to="books-and-resources">📚 Books & Resources</Link>
      </li>
      </ul>
      <p>
      </p>
    </div>
  );
}

export default KnowledgeBase;