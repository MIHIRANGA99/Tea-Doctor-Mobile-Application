// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUoquFcNOYiU2CU76FuWIWNMiCMwdChSk",
  authDomain: "tea-doctor.firebaseapp.com",
  projectId: "tea-doctor",
  storageBucket: "tea-doctor.appspot.com",
  messagingSenderId: "512046641826",
  appId: "1:512046641826:web:1104ba38170ed7010eddfb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);