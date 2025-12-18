import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Toggle from "react-toggle";

interface HeaderProps {
	previousPage: string;
}

export const Header: React.FC<HeaderProps> = ({ previousPage }) => {
	const [darkMode, setDarkMode] = useState(() => {
		const savedTheme = localStorage.getItem("darkMode");
		return savedTheme === "true" ? true : false;
	});

	const handleToggle = () => {
		setDarkMode((prevDarkMode) => !prevDarkMode);
	};

	useEffect(() => {
		localStorage.setItem("darkMode", darkMode.toString());
		const theme = darkMode ? "dark" : "light";
		document.documentElement.setAttribute("data-theme", theme);
	}, [darkMode]);

	return (
		<div className="upper-header">
			<div className="header">
				{previousPage !== "none" && (
					<Link to={previousPage}>
						<p>
							<i className="fa fa-angle-left fa-2x"></i> Back
						</p>
					</Link>
				)}
				{previousPage === "none" && (
					<div className="disabled-back">
						<p>
							<i className="fa fa-angle-left fa-2x"></i> Back
						</p>
					</div>
				)}
				<div>
					<Toggle checked={darkMode} onChange={handleToggle} icons={false} aria-label="Dark mode toggle" />
				</div>
			</div>
		</div>
	);
};
