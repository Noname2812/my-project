import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBafGCq0ng7sT-RyTQ_zc6UCTI49GkGm4c",
  authDomain: "pet-project-28-12.firebaseapp.com",
  projectId: "pet-project-28-12",
  storageBucket: "pet-project-28-12.appspot.com",
  messagingSenderId: "951005032959",
  appId: "1:951005032959:web:aa6ed13622b5b36774f7ca",
  measurementId: "G-H6KHP2WXRQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);

export const userRef = collection(firebaseDB, "user");
export const recipeListRef = collection(firebaseDB, "recipeList");
