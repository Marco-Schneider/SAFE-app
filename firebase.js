// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3R6VHtVesWQY_ca3WnaP4dBWoPGpCo7U",
  authDomain: "safe-auth-v2.firebaseapp.com",
  projectId: "safe-auth-v2",
  storageBucket: "safe-auth-v2.appspot.com",
  messagingSenderId: "1032481991995",
  appId: "1:1032481991995:web:3d9ffca3e41da17f99db1e"
};

// Initialize Firebase
if(firebase.apps.length === 0) {
  let app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
  let firestore = firestore();
}

const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore };