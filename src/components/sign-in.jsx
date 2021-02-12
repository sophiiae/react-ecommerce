import React, { useState } from 'react';
import { FormInput, CustomButton } from './index';

// firebase
import { auth, signInWithGoogle } from '../../src/firebase/firebase.utils';

export const SignIn = () => {
	const [state, setstate] = useState({
		email: '',
		password: ''
	});

	const handleSubmit = async event => {
		event.preventDefault();

		const { email, password } = state; 
		try {
			await auth.signInWithEmailAndPassword(email, password);
			setstate({ email: '', password: '' });
		} catch (error) {
			console.log(error);
		}
	}

	const handleChange = event => {
		const { value, name } = event.target;
		setstate({ ...state, [name]: value });
	}

	return (
		<div className="sign-in">
			<h2>I already have an account</h2>
			<span>Sign in with your email and password</span>

			<form onSubmit={handleSubmit}>
				<FormInput
					type="email" 
					name="email"
					value={state.email}
					handleChange={handleChange}
					label="email"
					required/>

				<FormInput
					type="password"
					name="password"
					label="password"
					value={state.password}
					handleChange={handleChange}
					required/>
				
				<div className="buttons">
					<CustomButton type="submit"> Sign in </CustomButton>
					<CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn>
						Sign in with Google
					</CustomButton>
				</div>
			</form>
		</div>
	)
}
