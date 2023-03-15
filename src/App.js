import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import About from "./pages/About";
// import Reservation from "./pages/Reservation";
// import Configuration from "./pages/Configuration";
// import Console from "./pages/Console";

const App = () => {
	return (
		<div className="app">
			<Home/>
			{/*<Routes>
				<Route path="/" element={ <Home/> } />
				<Route path="about" element={ <About/> } />
				<Route path="reservation" element={ <Reservation/> } />
				<Route path="configuration" element={ <Configuration/> } />
				<Route path="server_console" element={ <Console/> } />
			</Routes>*/}
		</div>
	)
}

export default App
