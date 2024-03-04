import { Alert, Button, Collapse, Dialog, DialogActions, DialogContent, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import React, { useEffect, useState } from 'react'

function Model({color,responseMsg,isOpen,handleDialog}) {
    const [open,setOpen] =useState()

    useEffect(()=>{
        setOpen(isOpen)
    },[isOpen])
  return (
    <div className='container '>
                <Collapse in={open}>
                    <Alert color={color} action={ <IconButton aria-label="close" color="inherit" size="small" onClick={() => { handleDialog() }} >
                                    <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }
                    sx={{ mb: 2 }}
                    >
                    {responseMsg}
                    </Alert>
                </Collapse>
    </div>
  )
}

export default Model