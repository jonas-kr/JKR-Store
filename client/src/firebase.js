import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD-nlXot_2duWUW8VwlIYb0d58GStLFC1U",
    authDomain: "ecommerce-v2-eb2fe.firebaseapp.com",
    projectId: "ecommerce-v2-eb2fe",
    storageBucket: "ecommerce-v2-eb2fe.appspot.com",
    messagingSenderId: "33561578209",
    appId: "1:33561578209:web:912fa757948421d01845a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

