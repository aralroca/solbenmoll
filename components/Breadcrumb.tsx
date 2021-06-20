import Link from 'next/link'
import Head from 'next/head'
import { Fragment } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'

import styles from './Breadcrumb.module.scss'

function Breadcrumb({ currentPageName, links, hide = false }) {
  const { defaultLocale } = useRouter()
  const { t, lang } = useTranslation('common')
  const prefix = lang === defaultLocale ? '' : '/' + lang

  if (!currentPageName || hide) return null

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: links.map(({ href, name, as }, index) => {
      let path = as || href
      if (path === '/') path = ''

      return {
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@id': `https://solbenmoll.com${prefix}${path}`,
          name: t(name),
        },
      }
    }),
  }

  return (
    <div className={'breadcrumb ' + styles.breadcrumbWrapper}>
      <Head>
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          key="breadcrumb-ld+json"
          type="application/ld+json"
        />
      </Head>
      <div className={styles.breadcrumb}>
        {links.map(({ href, name, as }) => (
          <Fragment key={href}>
            <Link href={href} as={as}>
              <a>{t(name)}</a>
            </Link>
            /
          </Fragment>
        ))}
        <span className={styles.currentPage}>{currentPageName}</span>
      </div>
    </div>
  )
}

export default Breadcrumb
