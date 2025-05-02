import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "windowshop-cd3d9.firebaseapp.com",
  projectId: "windowshop-cd3d9",
  storageBucket: "windowshop-cd3d9.appspot.com", 
  messagingSenderId: "984611327320",
  appId: "1:984611327320:web:4c3e8c87be505c277ea92d",
  measurementId: "G-C6XMSRS16X" 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);      // Firestore Database
export const storage = getStorage(app);   // Storage (for images)
export const auth = getAuth(app);         // Authentication