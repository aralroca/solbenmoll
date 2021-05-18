import React from 'react'

import styles from './Spinner.module.scss'

export default function Spinner({ className = '', message = '', ...props }) {
  return (
    <div className={`${styles.spinner} ${className}`} {...props}>
      <div className={styles['lds-ripple']}>
        <div />
        <div />
      </div>
      {message && <p>{message}</p>}
    </div>
  )
}
