import React, { useCallback, useState } from 'react'
import dynamic from 'next/dynamic'

import ModalBody from './partials/Body'
import ModalHeader from './partials/Header'

const noop = () => {}

const ModalContent = dynamic(
  () =>
    import(/* webpackChunkName: "modal-tooltip" */ './partials/ModalContent'),
  { ssr: false }
)

const defaults = {
  className: '',
  closeClickOutside: false,
  contentClass: '',
  isControlled: false,
  isFullScreen: false,
  keyCodesToClose: [27],
  onClose: noop,
  onOpen: noop,
}

export default function Modal({
  clickableContent = undefined,
  defaultOpen = false,
  ...resOfProps
}) {
  const props = { ...defaults, ...resOfProps }
  const { isControlled, onClose, onOpen } = props
  const [isOpen, setIsOpen] = useState(defaultOpen)

  /**
   * Open or close modal
   */
  const openOrClose = useCallback(() => {
    setIsOpen(!isOpen)
    if (isOpen) onClose()
    else onOpen()
  }, [isOpen, onClose, onOpen])

  const isOutsideContent = typeof clickableContent === 'function'

  const outSideContent = isOutsideContent
    ? clickableContent(openOrClose, isOpen)
    : null

  const displayContent = isOpen || (isControlled && defaultOpen)

  return (
    <>
      {outSideContent}
      {displayContent && (
        <ModalContent {...props} isOpen={isOpen} openOrClose={openOrClose} />
      )}
    </>
  )
}

Modal.Header = ModalHeader
Modal.Body = ModalBody
