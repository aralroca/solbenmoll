import React, { Fragment, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import Router from 'next/router'

import Body from '../components/Modal/partials/Body'
import Breadcrumb from '../components/Breadcrumb'
import Calendar from '../components/Calendar'
import Header from '../components/Modal/partials/Header'
import Modal from '../components/Modal'
import Spinner from '../components/Spinner'
import SubsForm from '../components/SubscriptionForm'
import { Message } from '../components/Message'
import { defaults } from '../constants/products'
import {
  deleteSubscription,
  setException,
  setSubscription,
} from '../firebase/client'
import useSubscription from '../helpers/useSubscription'
import PickUpPointStatus from '../components/PickUpPointStatus'

const initialFeedback = {
  title: '',
  message: '',
  type: 'success',
}

export default function Subscription() {
  const { t } = useTranslation('common')
  const {
    calendar,
    exceptions,
    hasSubscription,
    loadingSubscription,
    setCalendar,
    setExceptions,
    user,
  } = useSubscription()
  const [feedback, setFeedback] = useState(initialFeedback)
  const [editSubscription, setEditSubscription] = useState(false)
  const [key, setKey] = useState(Date.now())
  const [editing, setEditing] = useState(undefined)

  function displayError(e) {
    setFeedback({
      title: 'Error',
      message: e.message,
      type: 'error',
    })
  }

  function onSaveSubscription(sub) {
    const newCalendar = { ...calendar, ...sub }
    setSubscription(newCalendar)
      .then(() =>
        setFeedback({
          title: t`feedback.title`,
          message: t`feedback.subscription-saved`,
          type: 'success',
        })
      )
      .catch(displayError)
    setEditSubscription(false)
    setCalendar(newCalendar)
    setKey(Date.now())
    window.scroll({ top: 0 })
  }

  function onEditSubscription() {
    setEditSubscription(true)
  }

  function onDelete() {
    if (!window.confirm(t`delete-subscription-confirm`)) return
    setCalendar((c) => ({ ...c, ...defaults }))
    setExceptions({})
    setEditSubscription(false)
    deleteSubscription(calendar)
      .then(() =>
        setFeedback({
          title: t`feedback.title`,
          message: t`feedback.subscription-deleted`,
          type: 'success',
        })
      )
      .catch(displayError)
    window.scroll({ top: 0 })
  }

  function onEditWeek(sub) {
    const newExceptions = { ...exceptions, [editing.week.id]: sub }
    setException(editing.week.id, sub)
      .then(() => {
        setFeedback({
          title: t`feedback.title`,
          message: t('feedback.subscription-week-saved', {
            week: editing.week.name,
          }),
          type: 'success',
        })
      })
      .catch(displayError)
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

  if (user === null) {
    Router.push('/inici-sessio')
    return <Spinner />
  }

  if (typeof user === 'undefined' || loadingSubscription) {
    return <Spinner />
  }

  return (
    <div className="content">
      <Message
        title={feedback.title}
        type={feedback.type}
        onClose={() => setFeedback(initialFeedback)}
      >
        {feedback.message}
      </Message>
      <Breadcrumb
        currentPageName={t`subscription`}
        links={[
          {
            href: '/',
            name: 'home',
          },
          {
            href: '/compte',
            name: 'account',
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
                isWeekEditing
                onCancel={onCancelEdit}
                defaultValues={editing}
                key={'editing' + key}
                onFinish={onEditWeek}
              />
            </Body>
          </>
        )}
      </Modal>

      {(() => {
        if (calendar.estatPuntRecollida !== 'accepted') {
          return (
            <>
              <h1 className="center underline">{t`common:subscription`}</h1>
              <PickUpPointStatus />
              <SubsForm key="display-form" />
            </>
          )
        }

        if (hasSubscription && !editSubscription) {
          return (
            <>
              <h1 className="center underline">{t`calendar`}</h1>
              <Calendar
                exceptions={exceptions}
                subscription={calendar}
                onClickSubscription={onClickSubscription}
              />
              <div style={{ textAlign: 'right', marginTop: 15, fontSize: 12 }}>
                <a
                  onClick={onEditSubscription}
                  href="javascript:void(0)"
                >{t`common:edit-subscription`}</a>
              </div>
            </>
          )
        }

        return (
          <Fragment key={'' + editSubscription}>
            {editSubscription ? (
              <div
                className="underline"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  flexWrap: 'wrap',
                }}
              >
                <h1 style={{ margin: 0 }}>{t`common:subscription`}</h1>
                <a
                  style={{ fontSize: 12 }}
                  onClick={onDelete}
                  href="javascript:void(0)"
                >{t`common:delete-subscription`}</a>
              </div>
            ) : (
              <h1 className="center underline">{t`common:subscription`}</h1>
            )}
            <p>{t`subscription-description`}</p>
            <SubsForm
              onCancel={() => setEditSubscription(false)}
              isEditing={editSubscription}
              key={key}
              onFinish={onSaveSubscription}
              defaultValues={editSubscription ? calendar : undefined}
            />
          </Fragment>
        )
      })()}
    </div>
  )
}
