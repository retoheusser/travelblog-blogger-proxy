importScripts("https://www.gstatic.com/firebasejs/10.14.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.14.0/firebase-messaging-compat.js");

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
const app = firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()

// messaging.onBackgroundMessage(function(payload) {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   // Customize notification here
//   const notificationTitle = 'Background Message Title';
//   const notificationOptions = {
//     body: 'Background Message body.',
//     icon: '/firebase-logo.png'
//   };

//   self.registration.showNotification(notificationTitle,
//     notificationOptions);
// });