import Career from './pages/Career';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import HappinessAlgorithm from './pages/HappinessAlgorithm';
import KnowledgeBase from './pages/KnowledgeBase';

export const PageContents = () => {
  const currentRoute = "/";
  return (
    <div className='page-contents'>
        <Router>
        <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/career" element={<Career backPage={currentRoute}/>} />
              <Route path="/happiness-algorithm" element={<HappinessAlgorithm backPage={currentRoute}/>} />
              <Route path="/knowledge-base" element={<KnowledgeBase backPage={currentRoute}/>} />
          </Routes>
      </Router>
    </div>
  )
}
