import React from 'react'
import Alert from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import CloseIcon from '@material-ui/icons/Close'

export function Message({ type, title, children, onClose }) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={!!children}
      autoHideDuration={6000}
      onClose={onClose}
    >
      <Alert
        style={{ margin: '10px 0' }}
        severity={type}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={onClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        <AlertTitle>{title}</AlertTitle>
        {children}
      </Alert>
    </Snackbar>
  )
}
