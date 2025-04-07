// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAm8ypiT5HPCX14a20Hz_G43upJHF6lCsQ",
  authDomain: "ratemystudyspace-78dcc.firebaseapp.com",
  projectId: "ratemystudyspace-78dcc",
  storageBucket: "ratemystudyspace-78dcc.firebasestorage.app",
  messagingSenderId: "881199707866",
  appId: "1:881199707866:web:075271ed966c862a1817e3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
