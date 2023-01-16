// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getFirestore,collection,getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJVFw_3f2hqL6GJaTCwcv0qhGYE9Pm5z0",
  authDomain: "users-6bcc7.firebaseapp.com",
  projectId: "users-6bcc7",
  storageBucket: "users-6bcc7.appspot.com",
  messagingSenderId: "1016921929574",
  appId: "1:1016921929574:web:ddea892cb15a0923bbbaa7"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

