import React, { useState, useEffect } from 'react'
import useTranslation from 'next-translate/useTranslation'

import Breadcrumb from '../components/Breadcrumb'
import Calendar from '../components/Calendar'
import Modal from '../components/Modal'
import Header from '../components/Modal/partials/Header'
import Body from '../components/Modal/partials/Body'

import calcPrice from '../helpers/calcPrice'

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
    setExceptions((o) => ({ ...o, [editing.week.name]: sub }))
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
          <h1 style={{ margin: 0 }}>Calendari</h1>
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

const defaults = {
  ous: { time: 0, count: 0 },
  ceba: { time: 0, count: 0 },
  fruita: { time: 0, count: 0 },
  petita: { time: 0, count: 0 },
  mitjana: { time: 0, count: 0 },
  gran: { time: 0, count: 0 },
}

const voidFn = (v) => { }

function SubsForm({
  defaultValues = defaults,
  onFinish = voidFn,
  onCancel = voidFn,
  isEditing = false,
}) {
  const { t } = useTranslation('my-baskets')
  const [petita, setPetita] = useState(defaultValues.petita)
  const [mitjana, setMitjana] = useState(defaultValues.mitjana)
  const [gran, setGran] = useState(defaultValues.gran)
  const [ous, setOus] = useState(defaultValues.ous)
  const [ceba, setCeba] = useState(defaultValues.ceba)
  const [fruita, setFruita] = useState(defaultValues.fruita)
  const state = { petita, mitjana, gran, ous, ceba, fruita }
  const setters = { setPetita, setMitjana, setGran, setOus, setCeba, setFruita }
  const price = calcPrice(state)
  const baskets = [petita, mitjana, gran]
    .filter((b) => b.count)
    .map((b) => b.time)
  const times = Array.from(new Set(baskets))

  function submit(e) {
    e.preventDefault()
    onFinish({
      ous,
      fruita,
      ceba,
      petita,
      mitjana,
      gran,
    })
  }

  useEffect(updateExtraWhenChangeBasket, [times.join('')])
  function updateExtraWhenChangeBasket() {
    const noTimes = times.length === 0
    if (noTimes || (ceba.time && !times.includes(ceba.time))) {
      setCeba((c) => ({ count: noTimes ? 0 : c.count, time: 0 }))
    }
    if (noTimes || (ous.time && !times.includes(ous.time))) {
      setOus((o) => ({ count: noTimes ? 0 : o.count, time: 0 }))
    }
    if (noTimes || (fruita.time && !times.includes(fruita.time))) {
      setFruita((f) => ({ count: noTimes ? 0 : f.count, time: 0 }))
    }
  }

  function getFields(start, end, isExtra) {
    return Object.keys(state)
      .slice(start, end)
      .map((key) => {
        const capitalized = key[0].toUpperCase() + key.slice(1, key.length)

        return (
          <React.Fragment key={key}>
            <label htmlFor={key}>{t(`product-${key}`)}:</label>
            <div style={{ marginBottom: 20 }}>
              <input
                type="number"
                min={0}
                id={key}
                required={!isEditing && state[key].times > 0}
                className={isEditing ? 'editing' : ''}
                disabled={isExtra && times.length === 0}
                max={100}
                value={state[key].count}
                onChange={(e) => {
                  const fn = setters[`set${capitalized}`]
                  const val = parseInt(e.target.value, 10) || 0
                  if (val === 0) return fn({ count: 0, time: 0 })
                  if (state[key].count === 0 && val !== 0)
                    return fn({ count: val, time: isExtra ? times[0] || 0 : 1 })
                  fn((p) => ({ ...p, count: val }))
                }}
              />
              {!isEditing && (
                <select
                  required={!isEditing && state[key].count > 0}
                  value={(state[key].time || '').toString()}
                  style={
                    state[key].time === 0
                      ? { fontStyle: 'italic', color: '#625a50' }
                      : {}
                  }
                  disabled={isExtra && times.length === 0}
                  onChange={(e) => {
                    const fn = setters[`set${capitalized}`]
                    const val = parseInt(e.target.value || '0', 10)
                    if (val === 0) return fn({ count: 0, time: 0 })
                    fn((p) => ({
                      count: p.count === 0 && val !== 0 ? 1 : p.count,
                      time: val,
                    }))
                  }}
                >
                  <option className="useless" value="">
                    {state[key].time === 0
                      ? 'Cada quan ho vol rebre?'
                      : 'No ho vull rebre'}
                  </option>
                  <option disabled={isExtra && !times.some(t => 1 % t === 0)} value="1">
                    Setmanal
                  </option>
                  <option disabled={isExtra && !times.some(t => 2 % t === 0)} value="2">
                    Cada dues setmanes
                  </option>
                  <option disabled={isExtra && !times.some(t => 3 % t === 0)} value="3">
                    Cada tres setmanes
                  </option>
                  <option disabled={isExtra && !times.some(t => 4 % t === 0)} value="4">
                    Cada quatre setmanes
                  </option>
                </select>
              )}
            </div>
          </React.Fragment>
        )
      })
  }

  return (
    <form onSubmit={submit} className="subscription-form">
      <div>
        <h2>Cistelles</h2>
        {getFields(0, 3, false)}
      </div>
      <div>
        <h2>Extres</h2>
        {getFields(3, 6, true)}
      </div>
      <div className="submit">
        <span className="price">{price} €</span>
        <button
          disabled={!isEditing && parseInt(price, 10) === 0}
          className="button"
        >
          Desar canvis
        </button>
        {isEditing && (
          <button
            style={{ marginTop: 15 }}
            type="button"
            onClick={onCancel}
            className="button default"
          >
            Res, ja estava bé
          </button>
        )}
      </div>
    </form>
  )
}

export default Subscription
