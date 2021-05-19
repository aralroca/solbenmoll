import { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import Router from 'next/router'

import Breadcrumb from '../components/Breadcrumb'
import Spinner from '../components/Spinner'
import {
  logout,
  useAuth,
  changePassword,
  changeEmail,
  deleteAccount,
} from '../auth/client'

const initialStatus = { error: '', loading: false, success: false }

export default function Account() {
  const { t } = useTranslation('common')
  const { user } = useAuth()
  const [changePasswordStatus, setChangePasswordStatus] = useState(
    initialStatus
  )
  const [changeEmailStatus, setChangeEmailStatus] = useState(initialStatus)
  const [deleteAccountStatus, setDeleteAccountStatus] = useState(initialStatus)
  const title = t`account`
  const margin = { marginTop: 10 }

  function reset() {
    setChangePasswordStatus(initialStatus)
    setChangeEmailStatus(initialStatus)
    setDeleteAccountStatus(initialStatus)
  }

  if (user === null) {
    Router.push('/inici-sessio')
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
        ]}
      />
      <h1 className="center">{title}</h1>

      {/* CHANGE EMAIL */}
      <h2 className="underline">{t`change-email`}</h2>
      <form
        className="form"
        onSubmit={onChangeEmail(setChangeEmailStatus, reset)}
      >
        <label>{t`email`}:</label>
        <input type="email" defaultValue={user.email} />
        <label>{t`current-password`}:</label>
        <input minLength={6} required type="password" />
        <button disabled={changeEmailStatus.loading} className="button">
          {changeEmailStatus.loading ? t`saving` : t`save`}
        </button>
        {changeEmailStatus.error && (
          <div style={margin} className="errorMsg">
            {t(changeEmailStatus.error)}
          </div>
        )}
        {changeEmailStatus.success && (
          <div style={margin} className="successMsg">
            {t`saved`}
          </div>
        )}
      </form>

      {/* CHANGE PASSWORD */}
      <h2 className="underline">{t`change-password`}</h2>
      <form
        className="form"
        onSubmit={onChangePassword(setChangePasswordStatus, reset)}
      >
        <label>{t`current-password`}:</label>
        <input minLength={6} required type="password" />
        <label>{t`new-password`}:</label>
        <input minLength={6} required type="password" />
        <label>{t`repeat-password`}:</label>
        <input minLength={6} required type="password" />
        <button disabled={changePasswordStatus.loading} className="button">
          {changePasswordStatus.loading ? t`saving` : t`save`}
        </button>
        {changePasswordStatus.error && (
          <div style={margin} className="errorMsg">
            {t(changePasswordStatus.error)}
          </div>
        )}
        {changePasswordStatus.success && (
          <div style={margin} className="successMsg">
            {t`saved`}
          </div>
        )}
      </form>

      {/* LOGOUT */}
      <h2 className="underline">{t`logout`}</h2>
      <div className="form">
        <button
          className="button default"
          type="button"
          onClick={logout}
          style={margin}
        >{t`logout`}</button>
      </div>

      {/* DELETE ACCOUNT */}
      <h2 className="underline">{t`delete-account`}</h2>
      <form
        className="form"
        onSubmit={onDeleteAccount(setDeleteAccountStatus, reset, t)}
      >
        <label>{t`current-password`}:</label>
        <input minLength={6} required type="password" />
        <button
          disabled={deleteAccountStatus.loading}
          className="button default"
        >
          {t`delete-account-details`}
        </button>
        {deleteAccountStatus.error && (
          <div style={margin} className="errorMsg">
            {t(deleteAccountStatus.error)}
          </div>
        )}
        {deleteAccountStatus.success && (
          <div style={margin} className="successMsg">
            {t`saved`}
          </div>
        )}
      </form>
    </div>
  )
}

function onChangePassword(setStatus, reset) {
  return (e) => {
    e.preventDefault()
    reset()
    setStatus((s) => ({ ...s, loading: true }))

    const [
      currentPassword,
      newPassword,
      repeatPassword,
    ] = Array.prototype.slice.call(e.target).map((f) => f.value)

    if (newPassword !== repeatPassword) {
      return setStatus({
        error: 'error.repeat-password',
        loading: false,
        success: false,
      })
    }

    if (currentPassword === newPassword) {
      return setStatus({
        error: 'error.same-password',
        loading: false,
        success: false,
      })
    }

    changePassword(currentPassword, newPassword)
      .then(() => setStatus({ ...initialStatus, success: true }))
      .catch((e) =>
        setStatus({ error: `error.${e.code}`, loading: false, success: false })
      )
  }
}

function onChangeEmail(setStatus, reset) {
  return async (e) => {
    e.preventDefault()
    reset()
    setStatus((s) => ({ ...s, loading: true }))

    const [email, currentPassword] = Array.prototype.slice
      .call(e.target)
      .map((f) => f.value)

    changeEmail(currentPassword, email)
      .then(() => setStatus({ ...initialStatus, success: true }))
      .catch((e) =>
        setStatus({ error: `error.${e.code}`, loading: false, success: false })
      )
  }
}

function onDeleteAccount(setStatus, reset, t) {
  return (e) => {
    e.preventDefault()

    const [currentPassword] = Array.prototype.slice
      .call(e.target)
      .map((f) => f.value)

    if (window.confirm(t`delete-account-confirm`)) {
      reset()
      setStatus((s) => ({ ...s, loading: true }))
      deleteAccount(currentPassword)
        .then(() => setStatus({ ...initialStatus, success: true }))
        .catch((e) =>
          setStatus({
            error: `error.${e.code}`,
            loading: false,
            success: false,
          })
        )
    }
  }
}
