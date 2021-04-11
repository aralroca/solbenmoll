import React from 'react'
import useTranslation from 'next-translate/useTranslation'

import ModalContext from '../context'

function IconTimes({ className = '', ...props }) {
  return (
    <span {...props} className={`unicode-font ${className}`}>
      ╳
    </span>
  )
}

export default function ModalHeader({ children, allowClose = true }) {
  const { t } = useTranslation()
  const closeText = t`common:close`

  return (
    <ModalContext.Consumer>
      {({ close }) => (
        <>
          <h4 className="modal-header">
            {children}
            {allowClose && (
              <IconTimes
                title={closeText}
                onClick={close}
                role="button"
                tabIndex={0}
                className="close-icon"
              />
            )}
          </h4>
        </>
      )}
    </ModalContext.Consumer>
  )
}
