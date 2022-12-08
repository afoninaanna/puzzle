// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAzVmhTFrayosAzTY3ImdkIuyrhX86V2Po",
    authDomain: "puzzle-8a8e3.firebaseapp.com",
    projectId: "puzzle-8a8e3",
    storageBucket: "puzzle-8a8e3.appspot.com",
    messagingSenderId: "613998161873",
    appId: "1:613998161873:web:be525f7eaa901ac9887af0",
    measurementId: "G-P5613C75T4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);