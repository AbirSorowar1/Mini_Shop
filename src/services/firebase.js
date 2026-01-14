

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';
import { getDatabase, ref, push, set, onValue, get, remove } from 'firebase/database';

// Firebase Configuration - TUMR ACTUAL CONFIG DIYE REPLACE KORO
const firebaseConfig = {
    apiKey: "AIzaSyBNvE2IOVswXw6dnyBglFnXKwDpsV8-COk",
    authDomain: "app-27394.firebaseapp.com",
    databaseURL: "https://app-27394-default-rtdb.firebaseio.com",
    projectId: "app-27394",
    storageBucket: "app-27394.firebasestorage.app",
    messagingSenderId: "795477360106",
    appId: "1:795477360106:web:bb9fe4ca8fb39fb80c8693",
    measurementId: "G-LHZSY7WLBD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const googleProvider = new GoogleAuthProvider();

// Auth Functions
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const signOut = () => firebaseSignOut(auth);

// Database Functions
export const dbRef = (path) => ref(database, path);
export const dbSet = (refPath, data) => set(ref(database, refPath), data);
export const dbGet = (refPath) => get(ref(database, refPath));
export const dbPush = (refPath, data) => push(ref(database, refPath), data);
export const dbRemove = (refPath) => remove(ref(database, refPath));
export const dbOnValue = (refPath, callback) => onValue(ref(database, refPath), callback);