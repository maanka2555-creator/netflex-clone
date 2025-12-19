import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAvTTke5dgZzf9FMBFQnSyLNpUJVFOYueI",
  authDomain: "netflix-clone-ab0d8.firebaseapp.com",
  projectId: "netflix-clone-ab0d8",
  storageBucket: "netflix-clone-ab0d8.firebasestorage.app",
  messagingSenderId: "94000619102",
  appId: "1:94000619102:web:b35105a5a0222e2ad05ecf",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const login = async (email, password)=>{
  try {
   await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}


const logout  = ()=>{
  signOut(auth);
}

export {db, auth, login, signup, logout}