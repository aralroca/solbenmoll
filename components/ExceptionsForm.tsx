import React, { useState } from 'react'
import Checkbox from '@mui/material/Checkbox'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import useTranslation from 'next-translate/useTranslation'
import Router from 'next/router'

import allExceptions from '../constants/exceptions'
import getExceptionsStr from '../helpers/getExceptionsStr'
import useSubscription from '../helpers/useSubscription'
import { setSubscription } from '../firebase/client'

const voidFn = () => { }
const MAX_EXCEPTIONS = 3
const initialStatus = {
  error: '',
  loading: false,
  success: false,
}

export default function ExceptionsForm({ onBeforeSubmit = voidFn }) {
  const { t, lang } = useTranslation('common')
  const [exceptionStatus, setExceptionStatus] = useState(initialStatus)
  const { calendar = {}, setCalendar } = useSubscription()
  const margin = { marginTop: 10 }
  const exceptionsStr = getExceptionsStr(calendar.excepcions || [], lang)

  return (
    <>
      <p className="center">{t`exceptions-txt`}</p>
      <form
        className="form"
        onSubmit={onChangeExceptions(
          calendar,
          setExceptionStatus,
          onBeforeSubmit
        )}
      >
        <Select
          multiple
          style={{ fontSize: 14, padding: '0 20px' }}
          value={calendar.excepcions || []}
          displayEmpty
          onChange={(e: any) => {
            const excepcions = e.target.value
            if (
              calendar.excepcions?.length < excepcions.length &&
              excepcions.length > MAX_EXCEPTIONS
            ) {
              return alert(t('max-exceptions', { count: MAX_EXCEPTIONS }))
            }
            setCalendar((c) => ({ ...c, excepcions }))
          }}
          renderValue={() => t`exceptions-change`}
        >
          {Object.entries(allExceptions).map(([id, name]) => (
            <MenuItem key={id} value={id}>
              <Checkbox checked={(calendar.excepcions || []).includes(id)} />
              <ListItemText primary={name[lang]} />
            </MenuItem>
          ))}
        </Select>
        <p>{exceptionsStr}</p>
        <button disabled={exceptionStatus.loading} className="button">
          {exceptionStatus.loading ? t`saving` : t`save`}
        </button>
        {exceptionStatus.error && (
          <div style={margin} className="errorMsg">
            {t(exceptionStatus.error)}
          </div>
        )}
        {exceptionStatus.success && (
          <div style={margin} className="successMsg">
            {t`saved`}
          </div>
        )}
      </form>
    </>
  )
}

function onChangeExceptions(subscription, setStatus, reset) {
  return (e) => {
    e.preventDefault()
    reset()
    setStatus((s) => ({ ...s, loading: true }))
    setSubscription(subscription)
      .then(() => {
        if (Router.pathname !== '/compte') {
          return Router.push('/compte')
        }
        setStatus({ ...initialStatus, success: true })
      })
      .catch((e) =>
        setStatus({ error: `error.${e.code}`, loading: false, success: false })
      )
  }
}
