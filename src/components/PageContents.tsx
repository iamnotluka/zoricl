import { Career } from './pages/Career';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

export const PageContents = () => {
  return (
    <div className='page-contents'>
        <Router>
        <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/career" element={<Career backPage="/"/>} />
          </Routes>
      </Router>
    </div>
  )
}
