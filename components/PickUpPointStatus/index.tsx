import React from 'react'
import Alert from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'

import useSubscription from '../../helpers/useSubscription'

export default function PickUpPointStatus() {
  const { t } = useTranslation('common')
  const { hasSubscription, calendar = {} } = useSubscription()
  const suffix = hasSubscription ? 'with' : 'without'
  const message = calendar.estatPuntRecollida
    ? t(`subscription-status.${calendar.estatPuntRecollida}-${suffix}`)
    : t`subscription-status.initial`

  let severity = 'warning'
  if (calendar.estatPuntRecollida === 'accepted') severity = 'success'
  else if (calendar.estatPuntRecollida === 'rejected') severity = 'error'
  else if (calendar.estatPuntRecollida === 'pending') severity = 'info'

  return (
    <Alert severity={severity as any} style={{ margin: '15px 0' }}>
      <AlertTitle>
        <b>{t`subscription-status.title`}</b>: {message}
      </AlertTitle>
      <div style={{ width: '100%', textAlign: 'right' }}>
        {calendar.estatPuntRecollida === 'accepted' ? (
          <Link href="/subscripcio">
            <a>{t`subscription-status.link`}</a>
          </Link>
        ) : (
          <Link href="/compte#pickup-point">
            <a>{t`subscription-status.link-initial`}</a>
          </Link>
        )}
      </div>
    </Alert>
  )
}
