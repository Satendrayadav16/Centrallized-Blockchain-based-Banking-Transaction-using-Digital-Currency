// src/firebase.js
import { initializeApp } from 'firebase/app'
import {getAuth} from 'firebase/auth'
import { getDatabase } from "firebase/database"



const firebaseConfig = {
    apiKey: "AIzaSyAo9ZHRrm8VDECFTRHFzLf3o400NqgUUEs",
    authDomain: "login-authentication-a46be.firebaseapp.com",
    databaseURL: "https://login-authentication-a46be-default-rtdb.firebaseio.com",
    projectId: "login-authentication-a46be",
    storageBucket: "login-authentication-a46be.appspot.com",
    messagingSenderId: "212436792433",
    appId: "1:212436792433:web:3ab0c76a57a294466297d0",
  };

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export {auth}
export const database = getDatabase(app);