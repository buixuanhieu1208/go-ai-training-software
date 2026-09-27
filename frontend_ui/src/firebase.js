// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDtxpCCZ-D-al75kD74dxTPii474abn3Jw",
  authDomain: "go-ai-project.firebaseapp.com",
  projectId: "go-ai-project",
  storageBucket: "go-ai-project.firebasestorage.app",
  messagingSenderId: "409067465738",
  appId: "1:409067465738:web:dafb26c95f73c338a083f3",
  measurementId: "G-8KP0BZSRTZ",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);