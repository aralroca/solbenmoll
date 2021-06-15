import React, { createContext, useContext, useEffect, useState } from 'react'
import { getSubscription, useAuth } from '../firebase/client'

const defaults = {
  calendar: undefined,
  isAdmin: false,
  exceptions: {},
  logout: () => {},
  hasSubscription: false,
  loadingSubscription: true,
  setCalendar: undefined,
  setExceptions: undefined,
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
  const [exceptions, setExceptions] = useState(defaults.exceptions)
  const hasSubscription = Object.values(calendar || {}).some(
    (s: any) => s.count > 0
  )

  useEffect(loadSubscription, [user])
  function loadSubscription() {
    if (!user || calendar) return
    getSubscription().then(([sub, exc]) => {
      setCalendar(sub)
      setExceptions(exc)
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
        exceptions,
        setCalendar,
        setExceptions,
        hasSubscription,
      }}
    >
      {children}
    </Ctx.Provider>
  )
}
