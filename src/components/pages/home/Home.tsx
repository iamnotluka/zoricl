import DateSignature from "../../DateSignature";
import { Link } from "react-router-dom";
import { Header } from "../../Header";

export default function Home() {
	return (
		<div>
			<Header previousPage="none" />
			<DateSignature date="18 October 2023 at 8:36pm" />
			<h4>Luka Zoric</h4>
			<p>Hi there, I'm Luka! 👋</p>
			<p>
				I build systems, do sales and marketing, read a whole bunch, think hard and maintain a sub 45 resting heart
				rate.
			</p>
			{/* <img src="/profile_image.jpg" alt="Profile Image" /> */}
			<p>
				I've been a software engineer for about 5 years now, spending most of my time working at Amazon's grocery and
				compliance sectors.
			</p>
			<p>
				I am currently contracting out my hours part time while learning about business and building my own products.
			</p>
			<p>
				Add me on{" "}
				<a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/luka-zoric/">
					LinkedIn
				</a>{" "}
				or{" "}
				<a target="_blank" rel="noreferrer" href="https://www.instagram.com/zoricl_/">
					Instagram
				</a>{" "}
				to connect, or send an email to <a href="mailto:luka@zoricl.io">luka@zoricl.io.</a>
			</p>
			<p>
				I am also on{" "}
				<a target="_blank" rel="noreferrer" href="https://x.com/zoric_luka_">
					X
				</a>
				.
			</p>
			<h4>💻 Projects</h4>
			<p>
				Feel free to check out my{" "}
				<a target="_blank" rel="noreferrer" href="https://github.com/iamnotluka">
					GitHub
				</a>{" "}
				, but majority of my code is private...
			</p>
			<h5>InterviewGuru.io</h5>
			<p className="subsection-date-li">Launch Date: 31st July 2025</p>
			<p>Basically Leetcode with AI + mock interviews.</p>
			Link:{" "}
			<a href="https://www.interviewguru.io" rel="noreferrer" target="_blank">
				www.interviewguru.io
			</a>
			<h5>MVMNT MTHD</h5>
			<p className="subsection-date-li">Launch Date: 31st July 2025</p>
			<p>We sell fitness programs for people who want to take their training to the next level.</p>
			Link:{" "}
			<a href="https://www.mvmntmthd.com" rel="noreferrer" target="_blank">
				www.mvmntmthd.com
			</a>
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
