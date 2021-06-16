import { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import Router from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

import Anchor, { AnchorWrapper } from '../components/Anchor'
import Breadcrumb from '../components/Breadcrumb'
import Center from '../components/Center'
import ExceptionsForm from '../components/ExceptionsForm'
import PickUpForm from '../components/PickUpForm'
import PickUpPointStatus from '../components/PickUpPointStatus'
import Spinner from '../components/Spinner'
import getExceptionsStr from '../helpers/getExceptionsStr'
import getPickUpPointName from '../helpers/getPickUpPointName'
import useSubscription from '../helpers/useSubscription'
import aboutImg from '../public/assets/qui-som.png'
import {
  changePassword,
  changeEmail,
  deleteAccount,
  changeDisplayName,
} from '../firebase/client'

const initialStatus = { error: '', loading: false, success: false }

export default function Account() {
  const { t, lang } = useTranslation('common')
  const {
    user,
    isAdmin,
    calendar = {},
    loadingSubscription,
    logout,
  } = useSubscription()
  const [changePasswordStatus, setChangePasswordStatus] =
    useState(initialStatus)
  const [changeEmailStatus, setChangeEmailStatus] = useState(initialStatus)
  const [changeDisplayNameStatus, setChangeDisplayNameStatus] =
    useState(initialStatus)
  const [deleteAccountStatus, setDeleteAccountStatus] = useState(initialStatus)
  const title = t`account`
  const margin = { marginTop: 10 }
  const exceptionsStr = getExceptionsStr(calendar.excepcions || [], lang)
  const displayName = calendar?.displayName || user?.displayName
  const email = calendar?.email || user?.email

  console.log({ calendar })

  function reset() {
    setChangePasswordStatus(initialStatus)
    setChangeEmailStatus(initialStatus)
    setDeleteAccountStatus(initialStatus)
  }

  if (user === null) {
    Router.push('/inici-sessio')
    return <Spinner />
  }

  if (typeof user === 'undefined' || loadingSubscription) {
    return <Spinner />
  }

  return (
    <div className="content">
      <Breadcrumb
        currentPageName={title}
        links={[
          {
            href: '/',
            name: 'home',
          },
        ]}
      />
      <h1 className="center underline">{title}</h1>

      <PickUpPointStatus />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          fontSize: 14,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ maxWidth: 320 }}>
          <p>
            <b>{t`pickup-point`}:</b>
            {` ${getPickUpPointName(calendar)}`}
          </p>
          <p>
            <b>{t`exceptions`}:</b>
            {` ${exceptionsStr}`}
          </p>
          <p>
            <b>{t`display-name`}:</b>
            {` ${displayName || '-'}`}
          </p>
          <p>
            <b>{t`email`}:</b>
            {` ${email}`}
          </p>
        </div>
        <div>
          {isAdmin && (
            <p style={{ color: 'red' }}>
              <Link href="/admin">
                <a>{t`admin`}</a>
              </Link>
            </p>
          )}
          <p>
            <a href="#pickup-point">{t`pickup-point-edit`}</a>
          </p>
          <p>
            <a href="#exceptions">{t`exceptions-change`}</a>
          </p>
          <p>
            <a href="#change-display-name">{t`change-display-name`}</a>
          </p>
          <p>
            <a href="#change-email">{t`change-email`}</a>
          </p>
          <p>
            <a href="#change-password">{t`change-password`}</a>
          </p>
          <p>
            <a href="#logout">{t`logout`}</a>
          </p>
          <p>
            <a href="#delete-account">{t`delete-account`}</a>
          </p>
        </div>
      </div>

      {/* PICK UP POINT */}
      <AnchorWrapper>
        <Anchor top={-80} id="pickup-point" />
        <h2 className="underline">{t`pickup-point`}</h2>
        <PickUpForm onBeforeSubmit={reset} />
      </AnchorWrapper>

      {/* EXCEPTIONS */}
      <AnchorWrapper>
        <Anchor top={-80} id="exceptions" />
        <h2 className="underline">{t`exceptions`}</h2>
        <ExceptionsForm onBeforeSubmit={reset} />
      </AnchorWrapper>

      {/* CHANGE DISPLAY NAME */}
      <AnchorWrapper>
        <Anchor top={-80} id="change-display-name" />
        <h2 className="underline">{t`change-display-name`}</h2>
      </AnchorWrapper>
      <form
        className="form"
        onSubmit={onChangeDisplayName(
          setChangeDisplayNameStatus,
          calendar,
          reset
        )}
      >
        <label>{t`display-name`}:</label>
        <input type="text" defaultValue={displayName} />
        <button disabled={changeDisplayNameStatus.loading} className="button">
          {changeDisplayNameStatus.loading ? t`saving` : t`save`}
        </button>
        {changeDisplayNameStatus.error && (
          <div style={margin} className="errorMsg">
            {t(changeDisplayNameStatus.error)}
          </div>
        )}
        {changeDisplayNameStatus.success && (
          <div style={margin} className="successMsg">
            {t`saved`}
          </div>
        )}
      </form>

      {/* CHANGE EMAIL */}
      <AnchorWrapper>
        <Anchor top={-80} id="change-email" />
        <h2 className="underline">{t`change-email`}</h2>
      </AnchorWrapper>
      <form
        className="form"
        onSubmit={onChangeEmail(setChangeEmailStatus, calendar, reset)}
      >
        <label>{t`email`}:</label>
        <input type="email" defaultValue={user.email} />
        <label>{t`current-password`}:</label>
        <input autoComplete="off" minLength={6} required type="password" />
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
      <AnchorWrapper>
        <Anchor top={-80} id="change-password" />
        <h2 className="underline">{t`change-password`}</h2>
      </AnchorWrapper>
      <form
        className="form"
        onSubmit={onChangePassword(setChangePasswordStatus, reset)}
      >
        <label>{t`current-password`}:</label>
        <input autoComplete="off" minLength={6} required type="password" />
        <label>{t`new-password`}:</label>
        <input autoComplete="off" minLength={6} required type="password" />
        <label>{t`repeat-password`}:</label>
        <input autoComplete="off" minLength={6} required type="password" />
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
      <AnchorWrapper>
        <Anchor top={-80} id="logout" />
        <h2 className="underline">{t`logout`}</h2>
      </AnchorWrapper>
      <div className="form">
        <button
          className="button default"
          type="button"
          onClick={logout}
          style={margin}
        >{t`logout`}</button>
      </div>

      {/* DELETE ACCOUNT */}
      <AnchorWrapper>
        <Anchor top={-80} id="delete-account" />
        <h2 className="underline">{t`delete-account`}</h2>
      </AnchorWrapper>
      <p>{t`delete-account-description`}</p>
      <form
        className="form"
        onSubmit={onDeleteAccount(setDeleteAccountStatus, reset, t)}
      >
        <label>{t`current-password`}:</label>
        <input autoComplete="off" minLength={6} required type="password" />
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
      <Center
        style={{ marginTop: 60, padding: 30, borderTop: '1px solid #99b67e66' }}
      >
        <Image
          layout="fixed"
          loading="lazy"
          placeholder="blur"
          src={aboutImg}
          alt="Sòl Ben Moll"
          width={250}
          height={169}
        />
      </Center>
    </div>
  )
}

function onChangePassword(setStatus, reset) {
  return (e) => {
    e.preventDefault()
    reset()
    setStatus((s) => ({ ...s, loading: true }))

    const [currentPassword, newPassword, repeatPassword] = Array.prototype.slice
      .call(e.target)
      .map((f) => f.value)

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

function onChangeEmail(setStatus, subscription, reset) {
  return async (e) => {
    e.preventDefault()
    reset()
    setStatus((s) => ({ ...s, loading: true }))

    const [email, currentPassword] = Array.prototype.slice
      .call(e.target)
      .map((f) => f.value)

    changeEmail(currentPassword, email, subscription)
      .then(() => setStatus({ ...initialStatus, success: true }))
      .catch((e) =>
        setStatus({ error: `error.${e.code}`, loading: false, success: false })
      )
  }
}

function onChangeDisplayName(setStatus, subscription, reset) {
  return async (e) => {
    e.preventDefault()
    reset()
    setStatus((s) => ({ ...s, loading: true }))

    const [displayName] = Array.prototype.slice
      .call(e.target)
      .map((f) => f.value)

    changeDisplayName(displayName, subscription)
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
