import { initializeApp } from "firebase/app";
import { getAuth  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "login-authentication-a46be.firebaseapp.com",
  databaseURL: "https://login-authentication-a46be-default-rtdb.firebaseio.com",
  projectId: "login-authentication-a46be",
  storageBucket: "login-authentication-a46be.appspot.com",
  messagingSenderId: "212436792433",
  appId: "1:212436792433:web:3ab0c76a57a294466297d0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// const sendPasswordReset = async (email) => {
//   try {
//     await sendPasswordResetEmail(auth, email);
//     alert("Password reset link sent!");
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };

// const logout = () => {
//   signOut(auth);
// };

export { auth, db };
