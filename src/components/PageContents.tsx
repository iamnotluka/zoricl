import Career from "./pages/Career";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import KnowledgeBase from "./pages/home/knowledge_base/KnowledgeBase";
import KnowledgeBaseResource from "./pages/home/knowledge_base/KnowledgeBaseResource";

const KNOWLEDGE_BASE_PATH = "/knowledge-base";
const SOFTWARE_RESOURCES_PATH = "/software-resources";

export interface KnowledgeBaseRoute {
	title: string;
	name: string;
	date: string;
}

const knowledgeBaseRoutes: KnowledgeBaseRoute[] = [
	{
		title: "Success Is Guaranteed, Time Is Not",
		name: "success_is_guaranteed",
		date: "16th July 2025",
	},
	{
		title: "The “Grass is Greener” Situation",
		name: "the_grass_is_greener",
		date: "20th November 2025 at 8:30PM",
	},
	{
		title: "How To Focus",
		name: "how_to_focus",
		date: "30 April 2024 at 4:01PM",
	},
	{
		title: "Placebo Effect of Positive Thinking",
		name: "why_be_positive",
		date: "15 November 2023 at 7:20PM",
	},
];

const softwareResources: KnowledgeBaseRoute[] = [
	{
		title: "DRAFT: Guide to answering a coding interview question",
		name: "answering_coding_questions",
		date: "26 December 2023 at 6:56PM",
	},
];

export const PageContents = () => {
	const currentRoute = "/";

	return (
		<div className="page-contents">
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/career" element={<Career backPage={currentRoute} />} />

					<Route
						path={KNOWLEDGE_BASE_PATH}
						element={
							<KnowledgeBase
								backPage={currentRoute}
								knowledgeBaseRoutes={knowledgeBaseRoutes}
								intro="knowledge_base_intro.txt"
								date="19 October 2023 at 11:23pm"
							/>
						}
					/>
					<Route
						path={SOFTWARE_RESOURCES_PATH}
						element={
							<KnowledgeBase
								backPage={currentRoute}
								knowledgeBaseRoutes={softwareResources}
								intro="software_resources.txt"
								date="26 December 2023 at 3:32pm"
							/>
						}
					/>
					{buildRoutesForKnowledgeBaseRoutes(SOFTWARE_RESOURCES_PATH, softwareResources)}
					{buildRoutesForKnowledgeBaseRoutes(KNOWLEDGE_BASE_PATH, knowledgeBaseRoutes)}
				</Routes>
			</Router>
		</div>
	);
};

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
