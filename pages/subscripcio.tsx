import React, { Fragment, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import Router from 'next/router'

import Body from '../components/Modal/partials/Body'
import Breadcrumb from '../components/Breadcrumb'
import Calendar from '../components/Calendar'
import Header from '../components/Modal/partials/Header'
import Modal from '../components/Modal'
import PickUpPointStatus from '../components/PickUpPointStatus'
import Spinner from '../components/Spinner'
import SubsForm from '../components/SubscriptionForm'
import getDaySubscription from '../helpers/getDaySubscription'
import getWeeks from '../helpers/getWeeks'
import useSubscription from '../helpers/useSubscription'
import { CALENDAR_NUM_WEEKS } from '../constants/calendar'
import { Message } from '../components/Message'
import products, { defaults } from '../constants/products'
import { deleteSubscription, setSubscription } from '../firebase/client'

declare const window: any

const MAX_WEEKS_EXCEPTIONS = 20

const initialFeedback = {
  title: '',
  message: '',
  type: 'success',
}

export default function Subscription() {
  const { t, lang } = useTranslation('common')
  const { calendar, hasSubscription, loadingSubscription, setCalendar, user } =
    useSubscription()
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
    const weekExceptions = {}
    const weeks = getWeeks(lang)
    const defaultException = {}

    // Initialize default week exception
    Object.keys(products).forEach(k => {
      defaultException[k] = calendar[k] || defaults[k]
    })

    // Initialize week exceptions
    weeks.filter(w => !w.isEditable).forEach(w => {
      weekExceptions[w.id] = calendar.weekExceptions?.[w.id] || defaultException
    })

    const newCalendar = { ...calendar, ...sub, weekExceptions }
    const [firstWeek] = weeks.filter((w) => {
      const [, active] = getDaySubscription(
        sub,
        w.weekIndex
      )
      return w.isEditable && active
    })

    const msg = t('closed-order-details', { week: firstWeek.name })

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
    localStorage.setItem(
      'firstWeek',
      JSON.stringify({ ...firstWeek, created: Date.now() })
    )
    setTimeout(() => alert(msg), 100)
  }

  function onEditSubscription() {
    setEditSubscription(true)
  }

  function onDelete() {
    if (!window.confirm(t`delete-subscription-confirm`)) return
    setCalendar((c) => ({ ...c, ...defaults }))
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
    const newExceptions = {
      ...(calendar.weekExceptions || {}),
      [editing.week.id]: sub,
    }
    const weekExceptions = Object.keys(newExceptions)
      .sort()
      .reverse()
      .slice(0, MAX_WEEKS_EXCEPTIONS)
      .reduce((t, c) => {
        t[c] = newExceptions[c]
        return t
      }, {})
    const newSubs = { ...calendar, weekExceptions }
    setSubscription(newSubs)
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
    setCalendar(newSubs)
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

  function onMoveSubscription() {
    if (!window.confirm(t`move-subscription-description`)) return
    const displacement = ((calendar.displacement || 0) + 1) % CALENDAR_NUM_WEEKS
    const newSubs = { ...calendar, displacement }
    setSubscription(newSubs)
      .then(() => {
        setFeedback({
          title: t`feedback.title`,
          message: t`feedback.subscription-moved`,
          type: 'success',
        })
      })
      .catch(displayError)
    setCalendar(newSubs)
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
              <div style={{ textAlign: 'right', marginTop: 15, fontSize: 12 }}>
                <a
                  style={{ display: 'block' }}
                  onClick={onEditSubscription}
                  href="javascript:void(0)"
                >{t`common:edit-subscription`}</a>
              </div>
              <Calendar
                subscription={calendar}
                onClickSubscription={onClickSubscription}
              />
              <div style={{ textAlign: 'right', marginTop: 15, fontSize: 12 }}>
                <a
                  style={{ display: 'block' }}
                  onClick={onEditSubscription}
                  href="javascript:void(0)"
                >{t`common:edit-subscription`}</a>
                <a
                  style={{ display: 'block' }}
                  onClick={onMoveSubscription}
                  href="javascript:void(0)"
                >{t`common:move-subscription`}</a>
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
