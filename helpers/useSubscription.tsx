import React, { createContext, useContext, useEffect, useState } from 'react'
import { getSubscription, useAuth } from '../firebase/client'

const defaults = {
  calendar: undefined,
  isAdmin: false,
  logout: () => {},
  hasSubscription: false,
  loadingSubscription: true,
  setCalendar: undefined,
  user: undefined,
}

const Ctx = createContext(defaults)

export default function useSubscription() {
  return useContext(Ctx)
}

export function SubscriptionProvider({ children }) {
  const { user, isAdmin, logout } = useAuth()
  const [loadingSubscription, setLoadingSubscription] = useState(
    defaults.loadingSubscription
  )
  const [calendar, setCalendar] = useState(defaults.calendar)
  const hasSubscription = Object.values(calendar || {}).some(
    (s: any) => s.count > 0
  )

  useEffect(loadSubscription, [user])
  function loadSubscription() {
    if (!user || calendar) return
    getSubscription().then((sub) => {
      setCalendar(sub)
      setLoadingSubscription(false)
    })
  }

  return (
    <Ctx.Provider
      value={{
        user,
        isAdmin,
        logout,
        calendar,
        loadingSubscription,
        setCalendar,
        hasSubscription,
      }}
    >
      {children}
    </Ctx.Provider>
  )
}
