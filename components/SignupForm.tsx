import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'

import { register } from '../firebase/client'

function SignupForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { t } = useTranslation('common')
  const margin = { margin: 10 }

  function onSubmit(e) {
    e.preventDefault()
    const [email, password, repeatPassword] = Array.prototype.slice
      .call(e.target)
      .map((f) => f.value)

    if (password !== repeatPassword) {
      return setError('error.repeat-password')
    } else {
      setError('')
    }
    setLoading(true)
    register({ email, password }).catch(() => {
      setError('error.register')
      setLoading(false)
    })
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <label>{t`email`}:</label>
      <input required type="email" />
      <label>{t`password`}:</label>
      <input minLength={6} required type="password" />
      <label>{t`repeat-password`}:</label>
      <input minLength={6} required type="password" />
      <button disabled={loading} className="button">{t`enter`}</button>
      <div className="center" style={margin}>
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
  )
}

export default SignupForm
