import Career from './pages/Career';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import HappinessAlgorithm from './pages/HappinessAlgorithm';
import KnowledgeBase from './pages/home/knowledge_base/KnowledgeBase';
import KnowledgeBaseResource from './pages/home/knowledge_base/KnowledgeBaseResource';

export interface KnowledgeBaseRoute {
  title: string,
  name: string,
  date: string,
}

const knowledgeBaseRoutes: KnowledgeBaseRoute[] = [
  {
    title: '💭 Placebo Effect of Positive Thinking',
    name: 'why_be_positive',
    date: '15 November 2023 at 7:20PM'
  },
  {
    title: '📚 Books And Resources',
    name: 'books_and_resources',
    date: '25 October 2023 at 11:30PM'
  }
];

export const PageContents = () => {
  const KNOWLEDGE_BASE_PATH = "/knowledge-base";
  const currentRoute = "/";

  return (
    <div className='page-contents'>
        <Router>
        <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/career" element={<Career backPage={currentRoute}/>} />
              <Route path={KNOWLEDGE_BASE_PATH} element={<KnowledgeBase backPage={currentRoute} knowledgeBaseRoutes={knowledgeBaseRoutes}/>} />

              {knowledgeBaseRoutes.map((knowledgeBaseRoute) => (
                <Route 
                  key={knowledgeBaseRoute.name}
                  path={`${KNOWLEDGE_BASE_PATH}/${knowledgeBaseRoute.name}`} 
                  element={
                    <KnowledgeBaseResource 
                      backPage={KNOWLEDGE_BASE_PATH}
                      markdownFileName={`${knowledgeBaseRoute.name}.txt`}
                      date={knowledgeBaseRoute.date}
                    />
                  }
                />
              ))}
          </Routes>
      </Router>
    </div>
  )
}
