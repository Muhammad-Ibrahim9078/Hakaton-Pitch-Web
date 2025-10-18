import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyByJ2LOjyemPK_E0SoI5VNXx5XPqCYYHQg",
  authDomain: "hakaton-zh.firebaseapp.com",
  projectId: "hakaton-zh",
  storageBucket: "hakaton-zh.firebasestorage.app",
  messagingSenderId: "427005745845",
  appId: "1:427005745845:web:64921a73df3799e74dbcfc",
  measurementId: "G-TVRYK5Y1QD"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
