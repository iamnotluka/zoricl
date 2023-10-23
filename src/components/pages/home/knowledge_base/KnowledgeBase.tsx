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
      <h4>Software</h4>
        <ul>
          <li>
            <p><Link to='test-topic'>Data Structures & Algorithms</Link></p>
          </li>
        </ul>
      <h4>Random</h4>
        <ul>
          <li>
            <p><Link to='test-topic'>How to do propery investment in Australia.</Link></p>
          </li>
        </ul>
      <h4>Books & Resources</h4>
      <p>
        <Link to="test-topic">Test topic 1</Link>
      </p>
    </div>
  );
}

export default KnowledgeBase;