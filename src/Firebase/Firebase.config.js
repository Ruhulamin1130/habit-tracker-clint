// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAns_8QDv7kl_aP6ZOso7nAA-GTs_Mgxgs",
  authDomain: "habit-tacker-9a43a.firebaseapp.com",
  projectId: "habit-tacker-9a43a",
  storageBucket: "habit-tacker-9a43a.firebasestorage.app",
  messagingSenderId: "170485839295",
  appId: "1:170485839295:web:9701cccce1c61af4c85d0a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
