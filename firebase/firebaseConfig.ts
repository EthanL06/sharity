// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjcFOSyidCzkHnXeQ2_rs45hnb4lrcDWM",
  authDomain: "shary-5cf87.firebaseapp.com",
  projectId: "shary-5cf87",
  storageBucket: "shary-5cf87.appspot.com",
  messagingSenderId: "781499421869",
  appId: "1:781499421869:web:ff05e4b552a8a2feeca224"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);