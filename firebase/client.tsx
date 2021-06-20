import React, { createContext, useContext, useEffect, useState } from 'react'
import firebase from 'firebase/app'
import { defaults } from '../constants/products'

import 'firebase/auth'
import 'firebase/firestore'

if (firebase.apps.length === 0) {
  firebase.initializeApp({
    apiKey: 'AIzaSyDTlge-CL0WSx3oAsX4zAJnewa-D8x7ZLY',
    authDomain: 'solbenmoll.firebaseapp.com',
    projectId: 'solbenmoll',
    storageBucket: 'solbenmoll.appspot.com',
    messagingSenderId: '897611188151',
    appId: '1:897611188151:web:531f7c748cfdf28fadca32',
    measurementId: 'G-GTQ98CBV7B',
  })
}

const admins = new Set([
  'jM0K3ixkxEPShMgNlC3ekR14Fsq2',
  'm9EzZBSR9MaRVzG8Ib6sQzX6mLw1',
])

const db = firebase.firestore()

function onAuthStateChanged(onChange) {
  return firebase.auth().onAuthStateChanged((user) => {
    onChange(user || null)
  })
}

export function register({ displayName, email, password }) {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((u) => u.user.updateProfile({ displayName }))
}

export function changeDisplayName(displayName, subscription) {
  const user = firebase.auth().currentUser
  return user.updateProfile({ displayName }).then(() => {
    setSubscription(subscription)
  })
}

export function login({ email, password }) {
  return firebase.auth().signInWithEmailAndPassword(email, password)
}

export function reauthenticate(currentPassword) {
  const user = firebase.auth().currentUser
  const cred = firebase.auth.EmailAuthProvider.credential(
    user.email,
    currentPassword
  )
  return user.reauthenticateWithCredential(cred)
}

export function changePassword(currentPassword, newPassword) {
  return reauthenticate(currentPassword).then(() =>
    firebase.auth().currentUser.updatePassword(newPassword)
  )
}

export function changeEmail(currentPassword, newEmail, subscription) {
  return reauthenticate(currentPassword)
    .then(() => firebase.auth().currentUser.updateEmail(newEmail))
    .then(() => setSubscription(subscription))
}

export function deleteAccount(currentPassword) {
  const user = firebase.auth().currentUser
  return reauthenticate(currentPassword)
    .then(() => db.collection('user_subscriptions').doc(user.uid).delete())
    .then(() => user.delete())
}

export function recoverPassword(email) {
  return firebase.auth().sendPasswordResetEmail(email)
}

export function sendEmail({ to, subject, body }) {
  db.collection('mail').add({
    to,
    message: {
      subject,
      html: body,
    },
  })
}

export function getSubscription() {
  return db
    .collection('user_subscriptions')
    .doc(firebase.auth().currentUser.uid)
    .get()
    .then((doc) => doc.data())
}

export function deleteSubscription(subscription) {
  return db
    .collection('user_subscriptions')
    .doc(firebase.auth().currentUser.uid)
    .set({ ...subscription, ...defaults })
}

export function changeApplicationStatus(id, subscription, status = 'accepted') {
  return db
    .collection('user_subscriptions')
    .doc(id)
    .update({
      ...subscription,
      estatPuntRecollida: status,
      updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
    })
}

export function setSubscription(subscription) {
  const user = firebase.auth().currentUser
  const docRef = db.collection('user_subscriptions').doc(user.uid)

  return docRef.get().then((doc) => {
    const subs = {
      ...subscription,
      email: user.email,
      displayName: user.displayName,
      updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
    }

    if (doc.exists) return docRef.update(subs)

    return docRef.set({
      createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      ...subs,
    })
  })
}

export async function getAllSubscriptions() {
  const snapshot = await db.collection('user_subscriptions').get()
  return snapshot.docs
    .map((doc) => ({ ...doc.data(), id: doc.id }))
    .filter((doc) => !admins.has(doc.id))
}

const AuthCtx = createContext({
  user: undefined,
  isAdmin: false,
  logout: () => {},
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState()
  const isAdmin = admins.has((user as any)?.uid || '')

  async function logout() {
    await firebase.auth().signOut()
    setUser(null)
  }

  useEffect(() => {
    onAuthStateChanged(setUser)
  }, [])

  return (
    <AuthCtx.Provider value={{ user, isAdmin, logout }}>
      {children}
    </AuthCtx.Provider>
  )
}

export function useAuth() {
  return useContext(AuthCtx)
}
