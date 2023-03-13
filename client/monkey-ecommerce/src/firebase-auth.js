import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAgSCj_JQVTeof6PKrRmDzhudQcOqeXEVA",
	authDomain: "monkey-ecommerce.firebaseapp.com",
	projectId: "monkey-ecommerce",
	storageBucket: "monkey-ecommerce.appspot.com",
	messagingSenderId: "497497395938",
	appId: "1:497497395938:web:18f58f9b3bb769eda004bb"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const firebaseAuth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebaseAuth, googleAuthProvider };