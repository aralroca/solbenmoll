import useTranslation from 'next-translate/useTranslation'
import React, { useState, useEffect } from 'react'

import FormField from './FormField'
import calcPrice from '../../helpers/calcPrice'
import useSubscription from '../../helpers/useSubscription'
import { defaults } from '../../constants/products'

const voidFn = (v) => { }

function SubsForm({
  defaultValues = defaults,
  onFinish = voidFn,
  onCancel = voidFn,
  isEditing = false,
  isWeekEditing = false,
}) {
  const { t } = useTranslation('common')
  const { calendar } = useSubscription()
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
    .filter((b) => b?.count)
    .map((b) => b?.time)
  const times = Array.from(new Set(baskets))
  const disabled = !isWeekEditing && parseInt(price, 10) === 0

  function submit(e) {
    e.preventDefault()
    let state = {
      ceba,
      fruita,
      gran,
      mitjana,
      ous,
      petita,
    }
    onFinish(state)
  }

  useEffect(updateExtraWhenChangeBasket, [times.join('')])
  function updateExtraWhenChangeBasket() {
    const noTimes = times.length === 0
    if (noTimes || (ceba.time && !times.some((t) => ceba.time % t === 0))) {
      setCeba((c) => ({ count: noTimes ? 0 : c.count, time: 0 }))
    }
    if (noTimes || (ous.time && !times.some((t) => ous.time % t === 0))) {
      setOus((o) => ({ count: noTimes ? 0 : o.count, time: 0 }))
    }
    if (noTimes || (fruita.time && !times.some((t) => fruita.time % t === 0))) {
      setFruita((f) => ({ count: noTimes ? 0 : f?.count, time: 0 }))
    }
  }

  function getFields(start, end, isExtra) {
    return Object.keys(state)
      .slice(start, end)
      .map((key) => (
        <FormField
          id={key}
          isEditing={isWeekEditing}
          isExtra={isExtra}
          key={key}
          setters={setters}
          state={state}
          times={times}
        />
      ))
  }

  return (
    <form onSubmit={submit} className="subscription-form">
      <div>
        <h2>{t`baskets`}</h2>
        {getFields(0, 3, false)}
      </div>
      <div>
        <h2>{t`extras`}</h2>
        {getFields(3, 6, true)}
      </div>
      <div className="submit">
        <span className="price">{price} €</span>
        <button disabled={disabled} className="button">
          {t`save`}
        </button>
        {isEditing && (
          <button
            style={{ marginTop: 15 }}
            type="button"
            onClick={onCancel}
            className="button default"
          >
            {t`cancel`}
          </button>
        )}
      </div>
    </form>
  )
}

export default SubsForm
