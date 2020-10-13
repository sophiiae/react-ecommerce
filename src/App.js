import React from 'react';
import { Route } from 'react-router-dom';
import { Homepage } from './pages/homepage';

import './App.css';
import './scss/styles.scss';

const HatsPage = () => (
	<div>
		<h1>HATS PAGE</h1>
	</div>
)

function App() {
	return (
		<div>
			<Route exact path='/' component={Homepage} />
			<Route path='/hats' component={HatsPage} />
		</div>
	)
}

export default App;
