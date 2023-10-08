import './App.css';
import ProgressBar from './components/ProgressBar';
import { PageContents } from './components/PageContents';

const App = () => {
  return (
    <div className="chat-gpt-told-me-to-make-this-to-centralize-div">
      <div className="chatgpt-how-do-centralize-div">
        <ProgressBar/>
        <PageContents/>
      </div>
    </div>
  );
}

export default App;
