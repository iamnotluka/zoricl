import { MarkdownSection } from './MarkdownSection'
import { useState } from 'react';
import { Header } from './Header';
import Career from './pages/Career';

export const PageContents = () => {
  const [view, setView] = useState('home');

  const showView = (viewName: string) => {
    setView(viewName);
  };

  const homePage = 
  <div>
    <MarkdownSection markdownFileName='introduction.txt'  centralise={false}/>
    <h4>Career</h4>
    <p>I've done a couple of things in my life. Read my <a href="#" onClick={(e) => { e.preventDefault(); showView('career'); }}>career summary here</a>.</p>
  </div>

  return (
    <div>
    {view != 'home' && <Header/>}
    <div className='page-contents'>
        {/* Home page */}
        {view == 'home' && homePage}
        {/* Other Pages */}
        {view == 'career' && <Career/>}
    </div>
    </div>
  )
}
