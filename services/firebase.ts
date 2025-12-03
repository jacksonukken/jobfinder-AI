import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, type User } from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  addDoc, 
  collection, 
  serverTimestamp 
} from "firebase/firestore";
import { Job, UserProfile } from "../types";

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
const db = getFirestore(app);
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

// --- Firestore Operations ---

// Save or update user profile in 'users' collection
export const saveUser = async (user: User) => {
  try {
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      lastLogin: serverTimestamp(),
    }, { merge: true });
  } catch (error) {
    console.error("Error saving user:", error);
  }
};

// Save job details to 'jobs' collection (idempotent)
export const saveJob = async (job: Job) => {
  try {
    const jobRef = doc(db, "jobs", job.id);
    // Use merge: true so we don't overwrite if it exists, but update if changed
    await setDoc(jobRef, {
      ...job,
      savedAt: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.error("Error saving job:", error);
  }
};

// Create a new application document in 'applications' collection
export const createApplication = async (
  userId: string, 
  jobId: string, 
  profile: UserProfile, 
  coverLetter: string
) => {
  try {
    await addDoc(collection(db, "applications"), {
      userId,
      jobId,
      applicantName: profile.name,
      applicantEmail: profile.email,
      skills: profile.skills,
      experience: profile.experience,
      coverLetter,
      status: 'pending',
      appliedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error creating application:", error);
    throw error;
  }
};

export { app, analytics, auth, db };
