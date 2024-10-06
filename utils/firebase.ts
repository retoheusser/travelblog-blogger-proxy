// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getMessaging } from 'firebase/messaging'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const { public: { firebase: { vapidKey, ...firebaseConfig } } } = useRuntimeConfig()

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const firebaseAnalytics = getAnalytics(app)
export const firebaseMessaging = getMessaging(app)
