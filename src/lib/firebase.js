// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_APP_ID,
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);
// const googleProvider = new GoogleAuthProvider();

// export { auth, googleProvider, app, db };
// lib/firebase.js
let app = null;
let auth = null;
let db = null;
let googleProvider = null;

if (typeof window !== "undefined") {
  // only import and initialize Firebase in the browser
  const { initializeApp, getApps, getApp } = require("firebase/app");
  const { getAuth, GoogleAuthProvider } = require("firebase/auth");
  const { getFirestore } = require("firebase/firestore");

  const firebaseConfig = {
    apiKey:   process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId:  process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId:      process.env.NEXT_PUBLIC_APP_ID,
  };

  // initialize (or reuse) the app
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  db   = getFirestore(app);
  googleProvider = new GoogleAuthProvider();
}

module.exports = { app, auth, db, googleProvider };
