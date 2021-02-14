import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { HomePage, SignInAndSignUpPage } from './pages/index';
import { Header } from './components/index';
import CheckoutPage from './pages/checkout';
import ShopPage from './pages/shop';
import './App.css';
import './scss/styles.scss';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

function App(props) {
	const { setCurrentUser } = props;

	useEffect(() => {
		auth.onAuthStateChanged(async userAuth => {
			// store user information if user has signedn in
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth);

				userRef.onSnapshot('value', (snapshot) => {
					setCurrentUser({
						id: snapshot.id, 
						...snapshot.data()
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
				<Route exact path='/checkout' component={CheckoutPage} />
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

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
	setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
