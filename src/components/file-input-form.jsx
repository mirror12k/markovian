import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";



const ThemeSwitch = (props) => {
	const [url, seturl] = useState('example_cards/japanese-adjectives-1.txt');
	const [selectedoption, setselectedoption] = useState('');
	// const [loading, setloading] = useState(false);

	const available_urls = [
		['', 'None'],
		['example_cards/japanese-adjectives-1.txt', 'Japanese Adjectives #1: 赤い/強い/明るい'],
		['example_cards/japanese-adjectives-2.txt', 'Japanese Adjectives #2: 短い/鋭い/可愛い'],
		['example_cards/japanese-vocab-1.txt', 'Japanese Vocab #1: 眼鏡/別に/知る'],
		['example_cards/japanese-vocab-2.txt', 'Japanese Vocab #2: 会話/間違い/文'],
	];

	const doloadbyurl = () => {
		console.log("fetching:", url);
		props.setloading(true);
		fetch(url).then(r => r.text()).then(props.onload);
	};

	const readFileAsync = file => new Promise((resolve, reject) => {
		let reader = new FileReader();
		reader.onload = () => {
			resolve(reader.result);
		};
		reader.onerror = reject;
		reader.readAsText(file);
	});

	const dragHover = e => {
		e.stopPropagation();
		e.preventDefault();

		if (e.type === 'dragover') {
			e.target.className = 'drop-area over';
		} else {
			e.target.className = 'drop-area';
		}
	}

	const onDrop = e => {
		e.stopPropagation();
		e.preventDefault();
		props.setloading(true);
		Promise.all([...e.dataTransfer.files].map(file => readFileAsync(file))).then(data => {
			props.setloading(false);
			// console.log('data:', data);
			props.onload(data[0]);
		});
	}

	return <div>
		{ selectedoption === '' ?
			<div className="container">
				<h1 className="text-center">Select a list of cards:</h1>
				<div className="row">
					<div className="col-md-4">
						<button className="btn btn-primary select-button text-dark" style={{ 'background-color': '#ABDAFC' }} onClick={e => setselectedoption('preset')}>Preset Cards</button>
					</div>
					<div className="col-md-4">
						<button className="btn btn-primary select-button text-dark" style={{ 'background-color': '#ACACDE' }} onClick={e => setselectedoption('file')}>Custom Cards File</button>
					</div>
					<div className="col-md-4">
						<button className="btn btn-primary select-button text-dark" style={{ 'background-color': '#C490D1' }} onClick={e => setselectedoption('url')}>Custom Cards URL</button>
					</div>
				</div>
			</div>
		:
			<div className="container">
				<div className="row">
					<div className="col-md-2"></div>
					<div className="col-md-8">
						{ selectedoption === 'preset' ?
							<div>
								<div className="p-2">
									<h3 className="text-center">Select a preset list of cards to study:</h3>
									<select className="form-control"
											value={url}
											onChange={ e => seturl(e.target.value) }>
										{available_urls.map(opt =>
											<option key={opt[0]} value={opt[0]}>{opt[1]}</option>
										)}
									</select>
								</div>
								<div className="ml-2 d-inline"><button className="btn btn-primary" onClick={doloadbyurl}>Load</button></div>
								<div className="ml-2 d-inline"><button className="btn btn-secondary" onClick={e => setselectedoption('')}>Back</button></div>
							</div>
						: '' }
						{ selectedoption === 'file' ?
							<div>
								<div className="p-2">
									<h3 className="text-center">Drag and drop a file here to load the cards list</h3>
									<div className="drop-area bg-primary"
											onDrop={onDrop}
											onDragOver={dragHover}
											onDragLeave={dragHover}></div>
								</div>
								<div className="ml-2 d-inline"><button className="btn btn-secondary" onClick={e => setselectedoption('')}>Back</button></div>
							</div>
						: '' }
						{ selectedoption === 'url' ?
							<div>
								<div className="p-2">
									<h3 className="text-center">Enter a url (e.g. a github raw url) to load it:</h3>
									<input className="form-control" value={url} onChange={e => seturl(event.target.value)} />
								</div>
								<div className="ml-2 d-inline"><button className="btn btn-primary" onClick={doloadbyurl}>Load</button></div>
								<div className="ml-2 d-inline"><button className="btn btn-secondary" onClick={e => setselectedoption('')}>Back</button></div>
							</div>
						: '' }
					</div>
					<div className="col-md-2"></div>
				</div>
			</div>
		}
	</div>;
}
export default ThemeSwitch


