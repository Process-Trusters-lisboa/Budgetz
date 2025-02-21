// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBunyAmCJ5oDkIzmzgVhLLRVpG588eRWu8",
  authDomain: "budgetz-7b9d9.firebaseapp.com",
  databaseURL:
    "https://budgetz-7b9d9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "budgetz-7b9d9",
  storageBucket: "budgetz-7b9d9.firebasestorage.app",
  messagingSenderId: "259266866174",
  appId: "1:259266866174:web:2207e1d412a257669f6eaf",
  measurementId: "G-5KC6NBCGWT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export { firestore };
