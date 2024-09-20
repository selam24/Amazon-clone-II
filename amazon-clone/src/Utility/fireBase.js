// Import the functions you need from the SDKs you need
import  firebase  from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// used for authentication
import {getAuth} from 'firebase/auth'
import 'firebase/compat/firestore'
import "firebase/compat/auth";




// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUHpvXxw5zBOdj247W7lt52MVDDGIVgCI",
  authDomain: "clone-ii-fa077.firebaseapp.com",
  projectId: "clone-ii-fa077",
  storageBucket: "clone-ii-fa077.appspot.com",
  messagingSenderId: "660746978520",
  appId: "1:660746978520:web:b38833241b3bfa781303ad",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// every authentication used auth
export const auth = getAuth(app)
// for database
export const db = app.firestore()

