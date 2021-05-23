import React, { createContext, useContext, useEffect, useState } from 'react'
import firebase from 'firebase'
import getWeeks from '../helpers/getWeeks'

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

const db = firebase.firestore()

function onAuthStateChanged(onChange) {
  return firebase.auth().onAuthStateChanged((user) => {
    onChange(user || null)
  })
}

export function register({ email, password }) {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
}

export function login({ email, password }) {
  return firebase.auth().signInWithEmailAndPassword(email, password)
}

export function logout() {
  return firebase.auth().signOut()
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

export function changeEmail(currentPassword, newEmail) {
  return reauthenticate(currentPassword).then(() =>
    firebase.auth().currentUser.updateEmail(newEmail)
  )
}

export function deleteAccount(currentPassword) {
  return reauthenticate(currentPassword).then(() =>
    firebase.auth().currentUser.delete()
  )
}

export function getSubscription() {
  const user = firebase.auth().currentUser
  const docRef = db.collection('user_subscriptions').doc(user.uid)
  const subscription = docRef.get().then((doc) => doc.data())
  const exceptions = docRef
    .collection('exceptions')
    .where('end', '>=', new Date())
    .get()
    .then((col) =>
      col.docs.reduce((t, doc) => {
        t[doc.id] = doc.data()
        return t
      }, {})
    )

  return Promise.all([subscription, exceptions])
}

export function deleteSubscription() {
  const user = firebase.auth().currentUser
  const docRef = db.collection('user_subscriptions').doc(user.uid)
  const excRef = docRef.collection('exceptions')
  const deleteSubs = docRef.delete()
  const deleteExc = excRef.onSnapshot((snapshot) => {
    snapshot.docs.forEach((doc) => {
      excRef.doc(doc.id).delete()
    })
  })

  return Promise.all([deleteSubs, deleteExc])
}

export function setException(weekId, exception) {
  const end = new Date(parseInt(weekId.split('-')[1]))
  const user = firebase.auth().currentUser
  return db
    .collection('user_subscriptions')
    .doc(user.uid)
    .collection('exceptions')
    .doc(weekId)
    .set({ ...exception, end })
}

export function setSubscription(subscription) {
  const user = firebase.auth().currentUser
  const docRef = db.collection('user_subscriptions').doc(user.uid)

  return docRef.get().then((doc) => {
    if (doc.exists) {
      return docRef.update(subscription)
    }
    return docRef.set({
      createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      ...subscription,
    })
  })
}

const AuthCtx = createContext({ user: undefined })

export function AuthProvider({ children }) {
  const [user, setUser] = useState()
  useEffect(() => {
    onAuthStateChanged(setUser)
  }, [])
  return <AuthCtx.Provider value={{ user }}>{children}</AuthCtx.Provider>
}

export function useAuth() {
  return useContext(AuthCtx)
}
