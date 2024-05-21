// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBUZ-lor2FJqPqGvg3wA6fB_MHqiP84fHE",
  authDomain: "clone-edb2c.firebaseapp.com",
  projectId: "clone-edb2c",
  storageBucket: "clone-edb2c.appspot.com",
  messagingSenderId: "282274818437",
  appId: "1:282274818437:web:e229523e11bd88b74ebcec",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { app, auth, db, provider };
