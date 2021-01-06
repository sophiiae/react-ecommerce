import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyD4HkgkMv8jnMINHtY-s6gwlpTi17Sz0Ro",
    authDomain: "ecommerce-db-da7fe.firebaseapp.com",
    projectId: "ecommerce-db-da7fe",
    storageBucket: "ecommerce-db-da7fe.appspot.com",
    messagingSenderId: "106787305405",
    appId: "1:106787305405:web:85b893b70825cd6fb1c4d4",
    measurementId: "G-T8HESVC03H"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
