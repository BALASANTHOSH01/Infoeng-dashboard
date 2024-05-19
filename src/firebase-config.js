// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBf0cIsu6OR_khQv6xFtFSbBzS3xHYTpW8",
  authDomain: "info-eng-feedback.firebaseapp.com",
  projectId: "info-eng-feedback",
  storageBucket: "info-eng-feedback.appspot.com",
  messagingSenderId: "429314713953",
  appId: "1:429314713953:web:16013b05bc0b6ba0117d20",
  measurementId: "G-TLZBY4QWSH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export{auth,db};