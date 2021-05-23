import useTranslation from 'next-translate/useTranslation'
import Router, { useRouter } from 'next/router'

import Breadcrumb from '../components/Breadcrumb'
import SignupForm from '../components/SignupForm'
import Spinner from '../components/Spinner'
import { useAuth } from '../firebase/client'

function Register() {
  const { query } = useRouter()
  const { t } = useTranslation('common')
  const { user } = useAuth()
  const title = t`signup`

  if (user) {
    Router.push('/compte')
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
      {query.new ? <SignupForm /> : <p className="center">Pròximament...</p>}
    </div>
  )
}

export default Register
