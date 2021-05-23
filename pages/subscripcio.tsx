import React, { useEffect, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import Router from 'next/router'

import Body from '../components/Modal/partials/Body'
import Breadcrumb from '../components/Breadcrumb'
import Calendar from '../components/Calendar'
import Header from '../components/Modal/partials/Header'
import Modal from '../components/Modal'
import Spinner from '../components/Spinner'
import SubsForm from '../components/SubscriptionForm'
import {
  deleteSubscription,
  getSubscription,
  setException,
  setSubscription,
  useAuth,
} from '../firebase/client'

export default function Subscription() {
  const { t } = useTranslation('common')
  const { user } = useAuth()
  const [loadingSubscription, setLoadingSubscription] = useState(true)
  const [calendar, setCalendar] = useState(undefined)
  const [key, setKey] = useState(Date.now())
  const [exceptions, setExceptions] = useState({})
  const [editing, setEditing] = useState(undefined)

  function onAdd(sub) {
    setSubscription(sub)
    setCalendar(sub)
    setKey(Date.now())
    window.scroll({ top: 0 })
  }

  function onDelete() {
    if (!window.confirm(t`delete-subscription-confirm`)) return
    setCalendar(undefined)
    setExceptions({})
    deleteSubscription()
    window.scroll({ top: 0 })
  }

  function onEdit(sub) {
    const newExceptions = { ...exceptions, [editing.week.id]: sub }
    setException(editing.week.id, sub)
    setExceptions(newExceptions)
    onCancelEdit()
  }

  function onClickSubscription(sub) {
    setKey(Date.now())
    setEditing(sub)
  }

  function onCancelEdit() {
    setKey(Date.now())
    setEditing(undefined)
  }

  useEffect(loadSubscription, [user])
  function loadSubscription() {
    if (!user || calendar) return
    getSubscription().then(([sub, exc]) => {
      setCalendar(sub)
      setExceptions(exc)
      setLoadingSubscription(false)
    })
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
        currentPageName={t`subscription`}
        links={[
          {
            href: '/',
            name: 'home',
          },
        ]}
      />
      <Modal
        defaultOpen={editing}
        key={editing}
        isFullScreen={false}
        size="large"
      >
        {() => (
          <>
            <Header>{editing.week.name}</Header>
            <Body>
              <SubsForm
                isEditing
                onCancel={onCancelEdit}
                defaultValues={editing}
                key={'editing' + key}
                onFinish={onEdit}
              />
            </Body>
          </>
        )}
      </Modal>

      {calendar ? (
        <>
          <h1 style={{ margin: 0 }}>{t`calendar`}</h1>
          <Calendar
            exceptions={exceptions}
            subscription={calendar}
            onClickSubscription={onClickSubscription}
          />
          <div style={{ textAlign: 'right', marginTop: 15, fontSize: 12 }}>
            <a
              onClick={onDelete}
              href="javascript:void(0)"
            >{t`common:delete-subscription`}</a>
          </div>
        </>
      ) : (
        <>
          <h1 style={{ margin: 0 }}>{t`common:subscription`}</h1>
          <SubsForm key={key} onFinish={onAdd} />
        </>
      )}
    </div>
  )
}
