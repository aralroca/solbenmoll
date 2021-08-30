import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'

import logo from '../public/assets/logo-96.png'
import eu from '../public/assets/eu.jpeg'
import gen from '../public/assets/gen.jpeg'

const langNames = {
  es: 'Castellano',
  ca: 'Català',
}

function Footer() {
  const { locales } = useRouter()
  const { t, lang } = useTranslation('common')
  const brand = t`brand`

  return (
    <div className="footer">
      <div>
        <div>
          <Link href="/">
            <a className="logo" title={brand}>
              <Image
                alt={brand}
                placeholder="blur"
                src={logo}
                layout="fixed"
                width={60}
                loading="lazy"
                height={60}
              />
            </a>
          </Link>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          <Image
            src={gen}
            placeholder="blur"
            alt="Generalitat de Catalunya Departament d'Empresa i Treball"
            layout="fixed"
            width={211}
            loading="lazy"
            height={50}
          />
          <Image
            src={eu}
            placeholder="blur"
            alt="Iniciativa d'Ocupació Juvenil, Unió Europera, Fons social europeu "
            layout="fixed"
            width={144}
            loading="lazy"
            height={60}
          />
        </div>
        <div>
          <div className="links">
            <div style={{ padding: '0 10px' }}>
              © {brand} {new Date().getFullYear() + ' '}
            </div>
            <Link href="/">
              <a>{t`conditions`}</a>
            </Link>
            <Link href="/">
              <a>{t`privacy`}</a>
            </Link>
            <Link href="/">
              <a>{t`cookies`}</a>
            </Link>
            <select
              value={lang}
              style={{ margin: '0 5px' }}
              onChange={(e) =>
                Router.push(Router.pathname, Router.asPath, {
                  locale: e.target.value,
                }).then(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
              }
            >
              {locales.map((locale) => (
                <option key={locale} value={locale}>
                  {langNames[locale]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
