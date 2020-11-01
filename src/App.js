import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Homepage } from './pages/homepage';
import { ShopPage } from './pages/shop';
import { Header } from './components/header';

import './App.css';
import './scss/styles.scss';

function App() {
	return (
		<div>
			<Header />
			<Switch>
				<Route exact path='/' component={Homepage} />
				<Route path='/shop' component={ShopPage} />
			</Switch>
		</div>
	)
}

export default App;
