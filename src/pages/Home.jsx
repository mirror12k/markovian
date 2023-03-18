import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeSwitch from "../components/theme-switch";
import { random_pages, get_munged_page_text, make_markov_chain, generate_sentence } from "../util/markov";



const Home = () => {
	const [loading, setloading] = useState(false);
	const [content, setcontent] = useState(undefined);
	const chainref = useRef({});

	const loadcontent = async () => {
		setloading(true);
		// var pages = await random_pages();
		var chain = {};
		// make_markov_chain(await get_munged_page_text('Division Street School'), chain);
		for (var i = 0; i < 1;) {
			var pages = await random_pages();
			if (pages.length > 0)
			for (var p = 0; p < pages.length; p++) {
				console.log("loaded page...");
				make_markov_chain(await get_munged_page_text(pages[p]), chainref.current);
				i++;
			}
		}
		// make_markov_chain(await get_munged_page_text(pages[1]), chain);
		// make_markov_chain(await get_munged_page_text(pages[2]), chain);
		// make_markov_chain(await get_munged_page_text(pages[3]), chain);
		// make_markov_chain(await get_munged_page_text(pages[4]), chain);
		// console.log(chainref.current);

		setloading(false);
		var text = [1,].map(i => generate_sentence(chainref.current)).join(' ');
		setcontent(text.length > 1500 ? text.substring(0, 1500) + '...' : text);
	};

	const content_words = content?.split(' ');

	return (loading ? <div><h1>Dreaming...</h1></div> :
		<div>
			{/*<ThemeSwitch />*/}
			{content
				? <div className="p-4">
					<h2 className="fade-in-text text-justify">{content_words.map((t, i) => <span key={t + i} style={{animationDelay: '' +(i / 10)+'s'}}>{t} </span>)}</h2>
					<div className="text-center">
						<button className="btn btn-primary fade-in-button" onClick={loadcontent} style={{animationDelay: '' +(content_words.length / 10)+'s'}}>
							<h1>Dream again?</h1>
						</button>
					</div>
				</div>



				: <div className="text-center">
					<button className="btn btn-primary" onClick={loadcontent}><h1>Dream?</h1></button>
				</div>}
		</div>
	);
}
export default Home


