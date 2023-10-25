import Career from './pages/Career';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import HappinessAlgorithm from './pages/HappinessAlgorithm';
import KnowledgeBase from './pages/home/knowledge_base/KnowledgeBase';
import KnowledgeBaseResource from './pages/home/knowledge_base/KnowledgeBaseResource';

interface KnowledgeBaseRoute {
  link: string,
  markdownFileName: string,
  date: string,
}

const knowledgeBaseRoutes: KnowledgeBaseRoute[] = [
  {
    link: '/test-topic',
    markdownFileName: 'test_topic.txt',
    date: '23 October 2023 at 9:35PM'
  },
  {
    link: '/books-and-resources',
    markdownFileName: 'books_and_resources.txt',
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
              <Route path={KNOWLEDGE_BASE_PATH} element={<KnowledgeBase backPage={currentRoute}/>} />

              {knowledgeBaseRoutes.map((knowledgeBaseRoute) => (
                <Route 
                  key={knowledgeBaseRoute.link} // Added a key prop for React's list rendering
                  path={`${KNOWLEDGE_BASE_PATH}${knowledgeBaseRoute.link}`} 
                  element={
                    <KnowledgeBaseResource 
                      backPage={KNOWLEDGE_BASE_PATH}
                      markdownFileName={knowledgeBaseRoute.markdownFileName}
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
