import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

import './layout.scss'

function Layout({ children }) {
  return (
    <div className="layout">
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

function MyApp({ Component, pageProps }) {
  const { locale, defaultLocale, asPath } = useRouter()
  const path = asPath === '/' ? '' : asPath
  const prefix = locale === defaultLocale ? '' : '/' + locale

  useSW()
  usePersistLocaleCookie()

  return (
    <>
      <Head>
        <title>Sòl Ben Moll</title>
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
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
