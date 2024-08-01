import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBHmzpZPJOI2S1-He_6-B_IWvNMNaQrcRo",
  authDomain: "committee-b8b56.firebaseapp.com",
  projectId: "committee-b8b56",
  storageBucket: "committee-b8b56.appspot.com",
  messagingSenderId: "369095488390",
  appId: "1:369095488390:web:73f15645a304149aa73207",
  measurementId: "G-134RM7NWJQ",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
