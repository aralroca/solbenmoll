import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { useCtx } from '../pages/_app'

function Menu({ onClose }) {
  const ctx = useCtx()
  const initTouch = { x: undefined, y: undefined }
  const lastTouch = useRef(initTouch)
  const { t } = useTranslation('common')

  useEffect(registerClickEvent, [])
  function registerClickEvent() {
    window.addEventListener('click', clickMenu)
    return () => window.removeEventListener('click', clickMenu)
  }

  function clickMenu(e) {
    const classList = Array.prototype.slice.call(e.target.classList)

    if (classList.includes('sidebar-menu')) return
    onClose()
  }

  function onTouchStart(e) {
    const { pageX, pageY } = e.touches[0] || {}
    lastTouch.current = { x: pageX, y: pageY }
  }

  function onTouchEnd(e) {
    const { pageX, pageY } = e.changedTouches[0] || {}
    const { x, y } = lastTouch.current
    const hDiff = Math.abs(x - pageX)
    const horizontalSwipe = hDiff > Math.abs(y - pageY) && hDiff > 50

    if (!horizontalSwipe || pageX >= x) return

    onClose()
    lastTouch.current = initTouch
  }

  return (
    <div
      className="sidebar-menu"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <Link href={`/?displayText=${Date.now()}`} as="/">
        <a>
          <div>{t`info`.toUpperCase()}</div>
        </a>
      </Link>
      {ctx.new && (
        <Link href="/subscripcio">
          <a>
            <div>{t`my-baskets`.toUpperCase()}</div>
          </a>
        </Link>
      )}

      {ctx.new && (
        <Link href="/inici-sessio">
          <a>
            <div>{t`login`.toUpperCase()}</div>
          </a>
        </Link>
      )}
      <Link href="/contacte">
        <a>
          <div>{t`contact`.toUpperCase()}</div>
        </a>
      </Link>
    </div>
  )
}

export default Menu
