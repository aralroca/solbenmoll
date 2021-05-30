import React from 'react'

export default function Center({ style = {}, children, ...props }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}
