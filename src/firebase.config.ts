import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: 'AIzaSyCgVeNjLEDnfnFkuAgFJZAsmJpK0_-wIPM',
  authDomain: 'ai-chat-745be.firebaseapp.com',
  projectId: 'ai-chat-745be',
  storageBucket: 'ai-chat-745be.appspot.com',
  messagingSenderId: '760197227900',
  appId: '1:760197227900:web:84188957feb8a4115e30f9',
  measurementId: 'G-D6D6EKEK3K',
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
