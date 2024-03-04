import { Button, styled } from '@mui/material';
import { purple } from '@mui/material/colors';
import React from 'react'


const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  }));
function CustomButton({}) {
  return (
    <ColorButton variant='outlined'>custom</ColorButton>
  )
}

export default CustomButton