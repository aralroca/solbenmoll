import React, { useState } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'

import Breadcrumb from '../components/Breadcrumb'
import Spinner from '../components/Spinner'
import { recoverPassword, useAuth } from '../firebase/client'

export default function RecoverPassword() {
  const { t } = useTranslation('common')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { user } = useAuth()
  const title = t`forgot`
  const margin = { margin: 10 }

  function onSubmit(e) {
    e.preventDefault()
    const [email] = Array.prototype.slice.call(e.target).map((f) => f.value)
    setLoading(true)
    setError('')
    recoverPassword(email)
      .then(() => {
        Router.push('/inici-sessio')
        alert(t('feedback.recover', { email }))
      })
      .catch(() => {
        setError('error.recover')
        setLoading(false)
      })
  }

  if (user) {
    Router.push('/subscripcio')
    return <Spinner />
  }

  if (typeof user === 'undefined') {
    return <Spinner />
  }

  return (
    <div className="content">
      <Breadcrumb
        currentPageName={title}
        links={[
          {
            href: '/',
            name: 'common:home',
          },
          {
            href: '/inici-sessio',
            name: 'common:login',
          },
        ]}
      />
      <h1 className="center">{title}</h1>
      <form className="form" onSubmit={onSubmit}>
        <label>{t`email`}:</label>
        <input required type="email" />
        <button disabled={loading} className="button">{t`recover`}</button>
        <div className="center" style={margin}>
          <Link href="/registre">
            <a>{t`signup`}</a>
          </Link>
          <Link href="/inici-sessio">
            <a>{t`login`}</a>
          </Link>
        </div>
        {error && (
          <div style={margin} className="errorMsg">
            {t(error)}
          </div>
        )}
      </form>
    </div>
  )
}
