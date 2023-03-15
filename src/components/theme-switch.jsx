import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";



const ThemeSwitch = (props) => {
	const [theme, settheme] = useState(localStorage.getItem('color-theme') ?? 'dark-theme');

	const dosettheme = to => {
		localStorage.setItem('color-theme', to);
		settheme(to);
	}

	useEffect(() => {
		document.body.className = theme;
	}, [theme]);

	return <button className="btn btn-secondary"
			onClick={e => dosettheme(theme === 'light-theme' ? 'dark-theme' : 'light-theme')}>
		{theme === 'light-theme' ? 'dark-theme' : 'light-theme'}
	</button>;
}
export default ThemeSwitch


