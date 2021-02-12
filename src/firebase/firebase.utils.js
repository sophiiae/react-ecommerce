import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// copy config from web-app CDN
const config = {
    apiKey: "AIzaSyD4HkgkMv8jnMINHtY-s6gwlpTi17Sz0Ro",
    authDomain: "ecommerce-db-da7fe.firebaseapp.com",
    projectId: "ecommerce-db-da7fe",
    storageBucket: "ecommerce-db-da7fe.appspot.com",
    messagingSenderId: "106787305405",
    appId: "1:106787305405:web:85b893b70825cd6fb1c4d4",
    measurementId: "G-T8HESVC03H"
};

// initialize firebase
firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	// get snapshot with user id
	const userRef = firestore.doc(`users/${userAuth.uid}`);
	const snapShot = await userRef.get();

	// if user doesn't exist, create new user in the database
	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			})
		} catch (error) {
			console.log('error creating user', error.message);
		}
	}

	return userRef;
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
