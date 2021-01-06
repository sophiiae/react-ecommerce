import React from 'react'

export const CustomButton = ({ children, isGoogleSignIn, ...otherProps }) => (
	<button className={`${isGoogleSignIn ? 'google-sign-in' : ''} custom-button`} {...otherProps}>
		{children}
	</button>
)
