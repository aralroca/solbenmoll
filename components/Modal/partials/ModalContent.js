import React, { useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'

import ModalContext from '../context'

function useOnBodyKeyUp({ action, keyCodes = [], when = true }) {
  useEffect(() => {
    function onKeyUp(e) {
      const code = e.keyCode || e.key

      if (keyCodes.includes(code) && when) {
        action(code, e)
      }
    }

    document.body.addEventListener('keyup', onKeyUp)

    return () => document.body.removeEventListener('keyup', onKeyUp)
  }, [when, action, keyCodes])
}

export default function ModalContent({
  openOrClose,
  isOpen,
  children,
  onClose,
  isFullScreen,
  className,
  contentClass,
  closeClickOutside,
  keyCodesToClose,
  isControlled,
  onOpen,
  size = '', // ['medium', 'large', 'xlarge', 'auto']
  ...props
}) {
  /**
   * Click outside to close the modal
   */
  const onClickOutside = useCallback(
    (e) => {
      const classList = Array.prototype.slice.call(e.target.classList)
      if (closeClickOutside && classList.includes('modal')) {
        openOrClose()
        onClose()
      }
    },
    [closeClickOutside, onClose, openOrClose]
  )

  // Add .modal-open class to <body /> in order to disable scroll
  useEffect(() => {
    const nameOfClass = 'modal-open'
    const method = isOpen ? 'add' : 'remove'

    document.body.classList[method](nameOfClass)

    return () => document.body.classList.remove(nameOfClass)
  }, [isOpen])

  // Close on press keyCodes (ex: ESCAPE or ENTER)
  useOnBodyKeyUp({
    action: openOrClose,
    keyCodes: keyCodesToClose,
    when: isOpen,
  })

  const screenClass = isFullScreen ? 'fullscreen' : ''

  return createPortal(
    <div
      className={`modal ${className}`}
      onClick={onClickOutside}
      role="presentation"
      {...props}
    >
      <div className={`modal-content ${size} ${contentClass} ${screenClass}`}>
        <ModalContext.Provider value={{ close: openOrClose }}>
          {typeof children === 'function' ? children(openOrClose) : children}
        </ModalContext.Provider>
      </div>
    </div>,
    document.body
  )
}
