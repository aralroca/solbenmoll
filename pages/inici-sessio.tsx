import useTranslation from 'next-translate/useTranslation'
import Router from 'next/router'

import Breadcrumb from '../components/Breadcrumb'
import LoginForm from '../components/LoginForm'
import Spinner from '../components/Spinner'
import { useAuth } from '../firebase/client'

function Login() {
  const { t } = useTranslation('common')
  const { user } = useAuth()
  const title = t`login`

  if (user) {
    Router.push('/subscripcio')
    return <Spinner />
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
      <p className="center">{t`login-description`}</p>
      <LoginForm />
    </div>
  )
}

export default Login
