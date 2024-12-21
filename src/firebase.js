import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDT27UiBC64guIEZfyFj2Vl2hXlEE_7S9M",
    authDomain: "thaidress-686cf.firebaseapp.com",
    projectId: "thaidress-686cf",
    storageBucket: "thaidress-686cf.firebasestorage.app",
    messagingSenderId: "103967304798",
    appId: "1:103967304798:web:2da1e158df18b0581658cf"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);