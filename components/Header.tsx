import { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

import BarsIcon from './Icons/Bars'
import BasketIcon from './Icons/Basket'
import Image from 'next/image'
import LoginIcon from './Icons/Login'
import PhoneIcon from './Icons/Phone'
import solbenmoll from '../public/solbenmoll.svg'
import useTranslation from 'next-translate/useTranslation'
import { useAuth } from '../firebase/client'

const Menu = dynamic(() => import('./Menu'), { ssr: false })

function Header() {
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
          <Link href="/subscripcio">
            <a title={t`my-baskets`}>
              <BasketIcon width={iconSize} height={iconSize} />
            </a>
          </Link>
          <Link href="/compte">
            <a title={t('account')}>
              <LoginIcon width={iconSize} height={iconSize} />
            </a>
          </Link>
        </nav>
      </header>
    </>
  )
}

export default Header
