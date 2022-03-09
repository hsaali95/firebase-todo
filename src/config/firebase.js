// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAvPZN45xgSKGfYdlPWjykiFCThx_NRB3M",
    authDomain: "fir-todo-8cbf4.firebaseapp.com",
    projectId: "fir-todo-8cbf4",
    storageBucket: "fir-todo-8cbf4.appspot.com",
    messagingSenderId: "962187163581",
    appId: "1:962187163581:web:5b6c788405dc85b8ebc4d4",
    measurementId: "G-ZE6PT53VYL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export { db };