import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { HomePage, ShopPage, SignInAndSignUpPage } from './pages/index';
import { Header } from './components/index';
import './App.css';
import './scss/styles.scss';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';

function App(props) {
	const { setCurrentUser } = props;

	useEffect(() => {
		auth.onAuthStateChanged(async userAuth => {
			// store user information if user has signedn in
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth);

				userRef.on('value', (snapshot) => {
					setCurrentUser({
						id: snapshot.key, 
						...snapshot.val()
					});
				})
			}

			setCurrentUser(userAuth); // pass update value
		})
	}, [setCurrentUser]);

	return (
		<div>
			<Header />
			<Switch>
				<Route exact path='/' component={HomePage} />
				<Route path='/shop' component={ShopPage} />
				<Route
					exact
					path='/signin'
					render={() => 
						props.currentUser
						? (<Redirect to='/' />)
						: (<SignInAndSignUpPage />)}
				/>
			</Switch>
		</div>
	)
}

const mapStateToProps = ({ user }) => ({
	currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
	setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
