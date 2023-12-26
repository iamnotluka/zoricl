import Career from './pages/Career';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import KnowledgeBase from './pages/home/knowledge_base/KnowledgeBase';
import KnowledgeBaseResource from './pages/home/knowledge_base/KnowledgeBaseResource';

const KNOWLEDGE_BASE_PATH = "/knowledge-base";
const BUILDING_START_UP_PATH = "/building-start-up";

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
  },
  {
    title: '🌱 Happiness Algorithm',
    name: 'happiness_algorithm',
    date: '18 October 2023 at 9:46PM'
  }
];

const buildingStartUpRoutes: KnowledgeBaseRoute[] = [
  {
    title: 'How To Provide Vaule as a Software Engineer?',
    name: 'building_kart_1',
    date: '26 December 2023 at 3:30PM'
  }
];

export const PageContents = () => {
  const currentRoute = "/";


  return (
    <div className='page-contents'>
        <Router>
        <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/career" element={<Career backPage={currentRoute}/>} />

              <Route 
                path={KNOWLEDGE_BASE_PATH} 
                element={<KnowledgeBase 
                  backPage={currentRoute} 
                  knowledgeBaseRoutes={knowledgeBaseRoutes} 
                  intro='knowledge_base_intro.txt' 
                  date='19 October 2023 at 11:23pm'/>} />
              <Route 
                path={BUILDING_START_UP_PATH} 
                element={<KnowledgeBase 
                  backPage={currentRoute} 
                  knowledgeBaseRoutes={buildingStartUpRoutes} 
                  intro='building_kart.txt' 
                  date='26 December 2023 at 3:32pm'/>} />
              {buildRoutesForKnowledgeBaseRoutes(BUILDING_START_UP_PATH, buildingStartUpRoutes)}
              {buildRoutesForKnowledgeBaseRoutes(KNOWLEDGE_BASE_PATH, knowledgeBaseRoutes)}
          </Routes>
      </Router>
    </div>
  )
}

const buildRoutesForKnowledgeBaseRoutes = (basePath: string, knowledgeBaseRoutes: KnowledgeBaseRoute[]) => {
  return knowledgeBaseRoutes.map((knowledgeBaseRoute) => (
    <Route 
      key={knowledgeBaseRoute.name}
      path={`${basePath}/${knowledgeBaseRoute.name}`} 
      element={
        <KnowledgeBaseResource 
          backPage={basePath}
          markdownFileName={`${knowledgeBaseRoute.name}.txt`}
          date={knowledgeBaseRoute.date}
        />
      }
    />
  ));
};
