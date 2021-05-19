import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'

import { login } from '../auth/client'

function LoginForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { t } = useTranslation('common')
  const margin = { margin: 10 }

  function onSubmit(e) {
    e.preventDefault()
    const [email, password] = Array.prototype.slice
      .call(e.target)
      .map((f) => f.value)
    setLoading(true)
    setError('')
    login({ email, password }).catch(() => {
      setError('error.login')
      setLoading(false)
    })
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <label>{t`email`}:</label>
      <input required type="email" />
      <label>{t`password`}:</label>
      <input minLength={6} required type="password" />
      <button disabled={loading} className="button">{t`enter`}</button>
      <div className="center" style={margin}>
        <Link href="/registre">
          <a>{t`signup`}</a>
        </Link>
      </div>
      {error && (
        <div style={margin} className="errorMsg">
          {t(error)}
        </div>
      )}
    </form>
  )
}

export default LoginForm
