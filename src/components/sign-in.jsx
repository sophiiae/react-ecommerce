import React, { useState } from 'react';
import { FormInput, CustomButton } from './index';

export const SignIn = () => {
	const [state, setstate] = useState({
		email: '',
		password: ''
	});

	const handleSubmit = event => {
		event.preventDefault();
		setstate({ email: '', password: '' });
	}

	const handleChange = event => {
		const { value, name } = event.target;
		setstate({ [name]: value });
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

				<CustomButton type="submit"> Sign in </CustomButton>
			</form>
		</div>
	)
}
