import React from 'react'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import Trans from 'next-translate/Trans'

import useSubscription from '../../helpers/useSubscription'

export default function PickUpPointStatus() {
  const { t } = useTranslation('common')
  const { hasSubscription, calendar = {} } = useSubscription()
  const suffix = hasSubscription ? 'with' : 'without'
  const status = calendar.estatPuntRecollida
  const message = status
    ? `common:subscription-status.${status}-${suffix}`
    : 'common:subscription-status.initial'

  let severity = 'warning'
  if (status === 'accepted') severity = 'success'
  else if (status === 'rejected') severity = 'error'
  else if (status === 'pending') severity = 'info'

  return (
    <Alert severity={severity as any} style={{ margin: '15px 0' }}>
      <AlertTitle>
        <b>{t`subscription-status.title`}</b>:{' '}
        <Trans
          i18nKey={message}
          components={[
            <Link href="/subscripcio">
              <a />
            </Link>,
          ]}
        />
      </AlertTitle>
    </Alert>
  )
}
