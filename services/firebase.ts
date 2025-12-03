import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, type User } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCB-_4eSRBjO4IRzuN7wv929HJDX02Q2Kw",
  authDomain: "jobfinder-1d6f7.firebaseapp.com",
  projectId: "jobfinder-1d6f7",
  storageBucket: "jobfinder-1d6f7.firebasestorage.app",
  messagingSenderId: "1034447514998",
  appId: "1:1034447514998:web:7c9df6a325c1a8b59ede57",
  measurementId: "G-B7CMY5ZN12"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<User> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};

export const logout = () => signOut(auth);

export { app, analytics, auth };