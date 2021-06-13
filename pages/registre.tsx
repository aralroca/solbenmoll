import useTranslation from 'next-translate/useTranslation'
import Router, { useRouter } from 'next/router'
import { useRef } from 'react'

import Breadcrumb from '../components/Breadcrumb'
import ExceptionsForm from '../components/ExceptionsForm'
import PickUpForm from '../components/PickUpForm'
import SignupForm from '../components/SignupForm'
import Spinner from '../components/Spinner'
import useSubscription from '../helpers/useSubscription'

function Register() {
  const { query } = useRouter()
  const signupProcess = useRef(false)
  const { t } = useTranslation('common')
  const { user, calendar = {} } = useSubscription()
  const title = t`signup`

  if (user && !signupProcess.current) {
    Router.push('/compte')
    return <Spinner />
  }

  if (typeof user === 'undefined') {
    return <Spinner />
  }

  signupProcess.current = true

  // SIGNUP
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
      {(() => {
        // PICK UP POINT
        if (user && !calendar.puntRecollida) {
          return <PickUpForm />
        }

        // EXCEPTIONS
        if (user && calendar.puntRecollida) {
          return <ExceptionsForm />
        }

        // SIGNUP
        return (
          <>
            <p className="center">{t`login-description`}</p>
            {query.new ? (
              <SignupForm />
            ) : (
              <p className="center">Pròximament...</p>
            )}
          </>
        )
      })()}
    </div>
  )
}

export default Register
