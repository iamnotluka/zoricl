import { useEffect, useState } from "react";
import "./App.css";
import { PageContents } from "./components/PageContents";
import "font-awesome/css/font-awesome.min.css";
import "react-toggle/style.css";
import ProgressBar from "./components/ProgressBar";

const App = () => {
	return (
		<div className="chat-gpt-told-me-to-make-this-to-centralize-div">
			<div className="chatgpt-how-do-centralize-div">
				<ProgressBar />
				<PageContents />
			</div>
		</div>
	);
};

export default App;
