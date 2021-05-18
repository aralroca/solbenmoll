import useTranslation from 'next-translate/useTranslation'
import Router from 'next/router'

import Breadcrumb from '../components/Breadcrumb'
import Spinner from '../components/Spinner'
import { logout, useAuth } from '../auth/client'

function Account() {
  const { t } = useTranslation('common')
  const { user } = useAuth()
  const title = t`account`

  if (user === null) {
    Router.push('/inici-sessio')
  }

  if (typeof user === 'undefined') {
    return <Spinner />
  }

  return (
    <div className="content">
      <Breadcrumb
        currentPageName={title}
        links={[
          {
            href: '/',
            name: 'common:home',
          },
        ]}
      />
      <h1 className="center">{title}</h1>
      <div className="center">
        <button
          type="button"
          onClick={logout}
          className="button"
        >{t`logout`}</button>
      </div>
    </div>
  )
}

export default Account
