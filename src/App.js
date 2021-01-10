import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Homepage, ShopPage, SignInAndSignUp } from './pages/index';
import { Header } from './components/index';

import './App.css';
import './scss/styles.scss';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

function App() {
	const [state, setstate] = useState({ currentUser: null });

	useEffect(() => {
		auth.onAuthStateChanged(async user => {
			createUserProfileDocument(user);
			setstate({ currentUser: user });
		})
	}, []);

	return (
		<div>
			<Header currentUser={state.currentUser} />
			<Switch>
				<Route exact path='/' component={Homepage} />
				<Route path='/shop' component={ShopPage} />
				<Route path='/signin' component={SignInAndSignUp} />
			</Switch>
		</div>
	)
}

export default App;
