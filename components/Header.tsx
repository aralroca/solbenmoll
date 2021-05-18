import Link from 'next/link'
import dynamic from 'next/dynamic'

import BarsIcon from './Icons/Bars'
import BasketIcon from './Icons/Basket'
import Image from 'next/image'
import LoginIcon from './Icons/Login'
import PhoneIcon from './Icons/Phone'
import useTranslation from 'next-translate/useTranslation'
import { useAuth } from '../auth/client'
import { useCtx } from '../pages/_app'
import { useState } from 'react'

const Menu = dynamic(() => import('./Menu'), { ssr: false })

function Header() {
  const ctx = useCtx()
  const { user } = useAuth()
  const iconSize = 18
  const [menuOpen, setMenuOpen] = useState(false)
  const { t } = useTranslation('common')

  return (
    <>
      {menuOpen && <Menu onClose={() => setMenuOpen(false)} />}
      <header className="header">
        <div className="menu-and-logo">
          <BarsIcon
            onClick={() => setMenuOpen(true)}
            title={t`menu`}
            className="bar-icon"
            width={30}
            height={30}
          />
          <Link href="/">
            <a className="logo" title={t`brand`}>
              <Image
                alt={t`brand`}
                src="/solbenmoll.svg"
                layout="fixed"
                width={95}
                loading="eager"
                priority
                height={48.79}
              />
            </a>
          </Link>
        </div>
        <nav className="icons">
          <Link href="/contacte">
            <a title={t`contact-title`}>
              <PhoneIcon width={iconSize} height={iconSize} />
            </a>
          </Link>
          {ctx.new && (
            <>
              <Link href={user ? '/compte' : '/inici-sessio'}>
                <a title={t(user ? 'account' : 'login')}>
                  <LoginIcon width={iconSize} height={iconSize} />
                </a>
              </Link>
              <Link href="/subscripcio">
                <a title={t`my-baskets`}>
                  <BasketIcon width={iconSize} height={iconSize} />
                </a>
              </Link>
            </>
          )}
        </nav>
      </header>
    </>
  )
}

export default Header
