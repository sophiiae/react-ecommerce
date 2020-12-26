import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Homepage, ShopPage, SignInAndSignUp } from './pages/index';
import { Header } from './components/index';

import './App.css';
import './scss/styles.scss';

function App() {
	return (
		<div>
			<Header />
			<Switch>
				<Route exact path='/' component={Homepage} />
				<Route path='/shop' component={ShopPage} />
				<Route path='/signin' component={SignInAndSignUp} />
			</Switch>
		</div>
	)
}

export default App;
