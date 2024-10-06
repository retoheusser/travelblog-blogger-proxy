import { initializeApp } from 'firebase-admin/app'
import { getMessaging } from 'firebase-admin/messaging'

// This only work in a cloud function on Google as the configuration is fully automated.
// It does not work in local development
export const firebaseApp = initializeApp()
export const firebaseMessaging = getMessaging()
