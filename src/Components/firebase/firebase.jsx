// Correct way to import Firestore in Firebase v9+ (modular SDK)
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  
import { getAuth, onAuthStateChanged } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyDUyxXrF5fbMIqzIRjVgTffmZ_fBBSv9-w",
  authDomain: "media-ecf35.firebaseapp.com",
  projectId: "media-ecf35",
  storageBucket: "media-ecf35.appspot.com",
  messagingSenderId: "286741332379",
  appId: "1:286741332379:web:da8a7051d10a59b100213e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, onAuthStateChanged };