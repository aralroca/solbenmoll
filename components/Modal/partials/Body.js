import React from 'react'

export default function ModalBody({
  className = '',
  children = null,
  ...props
}) {
  return (
    <div className={`modal-body ${className}`} {...props}>
      {children}
    </div>
  )
}
