import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey || "AIzaSyBsDJR_MJZoo4rACclMeJ8cvSGJ4o6_ISQ",
  authDomain: import.meta.env.VITE_authDomain || "alpaago-53f97.firebaseapp.com",
  projectId: import.meta.env.VITE_projectId || "alpaago-53f97",
  storageBucket: import.meta.env.VITE_storageBucket || "alpaago-53f97.appspot.com",
  messagingSenderId: import.meta.env.VITE_messagingSenderId  || "553225623504",
  appId: import.meta.env.VITE_appId || "1:553225623504:web:5477af98ebaea658798bd5"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);