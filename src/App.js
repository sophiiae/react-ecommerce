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
		auth.onAuthStateChanged(async userAuth => {
			// store user information if user has signedn in
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth);

				userRef.on('value', (snapshot) => {
					console.log(snapshot);
					setstate({
						currentUser: {
							id: snapshot.key, 
							...snapshot.val()
						}
					});
				})
			}

			setstate({ currentUser: userAuth });
		})
	}, []);

	// useEffect(() => {
	// 	console.log(state);
	// }, [state]);

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
