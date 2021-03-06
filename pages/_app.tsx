import useTranslation from 'next-translate/useTranslation'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import Footer from '../components/Footer'
import Header from '../components/Header'
import { AuthProvider, useAuth } from '../firebase/client'
import { SubscriptionProvider } from '../helpers/useSubscription'

import './layout.scss'

function Layout({ children, className = '' }) {
  return (
    <div className={`layout ${className}`}>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

function useSW() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js').then(
          (registration) => {
            console.log(
              'Service Worker registration successful with scope: ',
              registration.scope
            )
          },
          (err) => {
            console.log('Service Worker registration failed: ', err)
          }
        )
      })
    }
  }, [])
}

function usePersistLocaleCookie() {
  const { locale, defaultLocale } = useRouter()

  useEffect(persistLocaleCookie, [locale, defaultLocale])
  function persistLocaleCookie() {
    const date = new Date()
    const expireMs = 100 * 365 * 24 * 60 * 60 * 1000 // 100 days
    date.setTime(date.getTime() + expireMs)
    document.cookie = `NEXT_LOCALE=${locale};expires=${date.toUTCString()};path=/`
  }
}

function AppWithAuth(props) {
  return (
    <AuthProvider>
      <AppContent {...props} />
    </AuthProvider>
  )
}

function AppContent({ Component, pageProps }) {
  const { t } = useTranslation('common')
  const { user } = useAuth()
  const { locale, defaultLocale, asPath } = useRouter()
  const path = asPath === '/' ? '' : asPath
  const prefix = locale === defaultLocale ? '' : '/' + locale

  useSW()
  usePersistLocaleCookie()

  return (
    <SubscriptionProvider key={user?.uid || ''}>
      <Head>
        <title>Sòl Ben Moll</title>
        <meta name="description" content={t`home-content.section-1.content`} />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="alternate"
          href={`https://solbenmoll.com${path}`}
          hrefLang="ca"
        />
        <link
          rel="alternate"
          href={`http://solbenmoll.com/es${path}`}
          hrefLang="es"
        />
        <link rel="canonical" href={`https://solbenmoll.com${prefix}${path}`} />
      </Head>
      <Layout className={path.includes('admin') ? 'admin' : ''}>
        <Component {...pageProps} />
      </Layout>
    </SubscriptionProvider>
  )
}

export default AppWithAuth
