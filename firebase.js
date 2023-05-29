// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqoOkHLofw42ZXhGihU2eBmd9_0hK4zpM",
  authDomain: "safe-auth-a2ae0.firebaseapp.com",
  projectId: "safe-auth-a2ae0",
  storageBucket: "safe-auth-a2ae0.appspot.com",
  messagingSenderId: "614961257495",
  appId: "1:614961257495:web:23296f6f5c692ef9815052"
};

// Initialize Firebase
if(firebase.apps.length === 0) {
  let app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };