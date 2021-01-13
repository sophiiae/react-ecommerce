import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { Homepage, ShopPage, SignInAndSignUp } from './pages/index';
import { Header } from './components/index';
import './App.css';
import './scss/styles.scss';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';

function App(props) { 
	useEffect(() => {
		auth.onAuthStateChanged(async userAuth => {
			// store user information if user has signedn in
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth);

				userRef.on('value', (snapshot) => {
					props.setCurrentUser({
						id: snapshot.key, 
						...snapshot.val()
					});
				})
			}

			props.setCurrentUser(userAuth); // pass update value
		})
	}, [props]);

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

const mapDispatchToProps = dispatch => ({
	setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App);
