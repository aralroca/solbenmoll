import useTranslation from 'next-translate/useTranslation'
import React, { useState } from 'react'

import PickUpPointsMap from './PickUpPointsMap'
import pickUpPoints from '../constants/pickpoints'
import useSubscription from '../helpers/useSubscription'
import { setSubscription } from '../firebase/client'

const initialStatus = { error: '', loading: false, success: false }
const margin = { marginTop: 10 }
const voidFn = () => {}

export default function PickUpForm({ onBeforeSubmit = voidFn }) {
  const [status, setStatus] = useState(initialStatus)
  const { t } = useTranslation('common')
  const { calendar = {}, hasSubscription, setCalendar } = useSubscription()
  const [point, setPoint] = useState(() =>
    pickUpPoints.find((p) => p.id === calendar.puntRecollida)
  )

  function onSubmit(e) {
    e.preventDefault()
    if (hasSubscription && !window.confirm(t`pickup-point-confirm`)) return
    onBeforeSubmit()
    const [puntRecollidaAnotacions = ''] = Array.prototype.slice
      .call(e.target)
      .filter((f) => f.name === 'anotations')
      .map((f) => f.value)
    const puntRecollida = point.id
    const estatPuntRecollida = 'pending'
    const subscription = {
      ...calendar,
      puntRecollida,
      puntRecollidaAnotacions,
      estatPuntRecollida,
    }
    setStatus((s) => ({ ...s, loading: true }))
    setCalendar(subscription)
    setSubscription(subscription)
      .then(() => setStatus({ ...initialStatus, success: true }))
      .catch((e) =>
        setStatus({ error: `error.${e.code}`, loading: false, success: false })
      )
  }

  return (
    <>
      <p>{t`pickup-point-info`}</p>
      <form
        style={{ marginTop: 20 }}
        className="form pickuppoint-form"
        onSubmit={onSubmit}
      >
        <label>{t`pickup-point`}:</label>
        <select
          required
          value={point?.id}
          onChange={(e) =>
            setPoint(pickUpPoints.find((p) => p.id === e.target.value))
          }
        >
          {!point && <option key="empty">-</option>}
          {pickUpPoints.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <PickUpPointsMap point={point} onChangePoint={setPoint} />

        <button
          style={{ marginTop: 15 }}
          disabled={status.loading}
          className="button"
        >
          {status.loading ? t`saving` : t`request`}
        </button>

        {status.error && (
          <div style={margin} className="errorMsg">
            {t(status.error)}
          </div>
        )}
        {status.success && (
          <div style={margin} className="successMsg">
            {t`saved`}
          </div>
        )}
      </form>
    </>
  )
}
