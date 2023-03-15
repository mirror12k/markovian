import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeSwitch from "../components/theme-switch";
import { random_pages, get_munged_page_text, make_markov_chain, generate_sentence } from "../util/markov";



const Home = () => {
	const [loading, setloading] = useState(false);
	const [content, setcontent] = useState(undefined);

	const loadcontent = async () => {
		setloading(true);
		var pages = await random_pages();
		var chain = {};
		make_markov_chain(await get_munged_page_text(pages[0]), chain);
		make_markov_chain(await get_munged_page_text(pages[1]), chain);
		make_markov_chain(await get_munged_page_text(pages[2]), chain);
		make_markov_chain(await get_munged_page_text(pages[3]), chain);
		make_markov_chain(await get_munged_page_text(pages[4]), chain);

		setloading(false);
		setcontent([1,2,3,].map(i => generate_sentence(chain)).join(' '));
	};

	return (loading ? <div><h1>Loading...</h1></div> :
		<div>
			{/*<ThemeSwitch />*/}
			{content
				? <div>
					<h2 className="fade-in-text">{content.split(' ').map((t, i) => <span key={t + i} style={{animationDelay: '' +(i / 10)+'s'}}>{t} </span>)}</h2>
					<div className="text-center">
						<button className="btn btn-primary" onClick={loadcontent}><h1>Generate again!</h1></button>
					</div>
				</div>



				: <div className="text-center">
					<button className="btn btn-primary" onClick={loadcontent}><h1>Click me!</h1></button>
				</div>}
		</div>
	);
}
export default Home


