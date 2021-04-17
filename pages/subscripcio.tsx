import React, { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'

import Body from '../components/Modal/partials/Body'
import Breadcrumb from '../components/Breadcrumb'
import Calendar from '../components/Calendar'
import Header from '../components/Modal/partials/Header'
import Modal from '../components/Modal'
import SubsForm from '../components/SubscriptionForm'

function Subscription() {
  const { t } = useTranslation('my-baskets')
  const [calendar, setCalendar] = useState(undefined)
  const [key, setKey] = useState(Date.now())
  const [exceptions, setExceptions] = useState({})
  const [editing, setEditing] = useState(undefined)

  function onAdd(sub) {
    setCalendar(sub)
    setKey(Date.now())
    window.scroll({ top: 0 })
  }

  function onEdit(sub) {
    setExceptions((o) => ({ ...o, [editing.week.id]: sub }))
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

  return (
    <div className="content">
      <Breadcrumb
        currentPageName={t`common:subscription`}
        links={[
          {
            href: '/',
            name: 'common:home',
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

export default Subscription
