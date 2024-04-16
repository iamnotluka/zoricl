import { MarkdownSection } from "../../MarkdownSection";
import DateSignature from "../../DateSignature";
import { Link } from "react-router-dom";
import { Header } from "../../Header";

export default function Home() {
	return (
		<div>
			<Header previousPage="none" />
			<DateSignature date="18 October 2023 at 8:36pm" />
			<MarkdownSection markdownFileName="introduction.txt" />
			<p>
				If you're a recruiter or just interested what I did in past couple of years - read my{" "}
				<Link to="/career">career summary</Link>.
			</p>
			<h4>💻 Software Projects</h4>
			<p>
				Feel free to check out my <a href="https://github.com/iamnotluka">GitHub</a> and deep dive my code. Any feedback
				or question will be highly appreciated!
			</p>
			{/* <p>
				Check it out <Link to="/software-resources">here.</Link>
			</p>*/}
			<h4>💡 Blog </h4>
			<p>
				Other useful stuff. Through to blogs <Link to="/knowledge-base">here.</Link> 📖
			</p>
			<hr></hr>
			<p className="subsection-date-li">
				The views and opinions expressed on this website are solely my own and do not reflect those of any of my current
				or previous employers. All content and opinions are provided for informational purposes only and are not
				intended to represent the stance of any company or organization I am affiliated with.
			</p>
		</div>
	);
}
