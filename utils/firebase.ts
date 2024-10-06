// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getMessaging } from 'firebase/messaging'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAu-R4Z01V24_iztTjv4ZTXYcu388orQP0',
  authDomain: 'wendy-reto-travelblog.firebaseapp.com',
  projectId: 'wendy-reto-travelblog',
  storageBucket: 'wendy-reto-travelblog.appspot.com',
  messagingSenderId: '1038170436258',
  appId: '1:1038170436258:web:58e644b6e5d21d66f2ddfb',
  measurementId: 'G-GJYCJ2SBH0',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const firebaseAnalytics = getAnalytics(app)
export const firebaseMessaging = getMessaging(app)
