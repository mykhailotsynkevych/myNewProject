import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyChtyT0UDfqJL91Mz8lTRluLEcZCeTYZ_o",
  authDomain: "mynewproject-edb75.firebaseapp.com",
  projectId: "mynewproject-edb75",
  storageBucket: "mynewproject-edb75.appspot.com",
  messagingSenderId: "549052410982",
  appId: "1:549052410982:web:84a1f5aaa9e3056080d1a7",
  measurementId: "G-XSY69LV90P"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const storage = getStorage(app);