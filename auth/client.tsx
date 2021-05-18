import React, { createContext, useContext, useEffect, useState } from 'react'
import firebase from 'firebase'

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

function onAuthStateChanged(onChange) {
  return firebase.auth().onAuthStateChanged((user) => {
    onChange(user)
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
