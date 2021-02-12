import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { ReactComponent as Logo } from '../assets/crown.svg';
import { auth } from '../firebase/firebase.utils';
import { CartDropdown } from './index';
import CartIcon from './cart-icon';

const HeaderComponent = ({ currentUser, hidden }) => (
	<div className="header">
		<Link className='logo-container' to="/">
			<Logo className='logo' />
		</Link>
		<div className="options">
			<Link className="option" to="/shop">
				SHOP
			</Link>
			<Link className="option" to="/contact">
				CONTACT
			</Link>
			{
				currentUser ?
				<div className='option' onClick={() => auth.signOut()}>
					SIGN OUT
				</div>
				:
				<Link className='option' to='/signin'> SIGN IN </Link>
			}
			<CartIcon />
		</div>
		{
			hidden ? null : <CartDropdown />
		}
	</div>
)

const mapStateToProps = ({user: { currentUser}, cart: {hidden}}) => ({
	currentUser,
	hidden
})

export const Header = connect(mapStateToProps)(HeaderComponent);
