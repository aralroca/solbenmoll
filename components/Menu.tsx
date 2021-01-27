import Link from 'next/link'
import { useEffect, useRef } from 'react'

function Menu({ onClose }) {
  const initTouch = { x: undefined, y: undefined }
  const lastTouch = useRef(initTouch)

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
      <Link href="/que-fem">
        <a>
          <div>QUÈ FEM?</div>
        </a>
      </Link>
      <div>CISTELLES</div>
      <div>OUS I EXTRA FRUITA</div>
      <Link href="/punts-recollida">
        <a>
          <div>PUNTS DE RECOLLIDA</div>
        </a>
      </Link>
      <Link href="/inici-sessio">
        <a>
          <div>INICIA SESSIÓ</div>
        </a>
      </Link>
      <Link href="/contacte">
        <a>
          <div>CONTACTE</div>
        </a>
      </Link>
    </div>
  )
}

export default Menu
