// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-blog-3e20e.firebaseapp.com",
    projectId: "mern-blog-3e20e",
    storageBucket: "mern-blog-3e20e.appspot.com",
    messagingSenderId: "999697896851",
    appId: "1:999697896851:web:bc453c09e672521d044466"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);