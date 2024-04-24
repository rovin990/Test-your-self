import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';


const logoCss={
    width:'30px',
    height:'30px',
    border: '1px dashed red',
    borderRadius: '100%',
}
export default function Navbar() {
  const[isLoggedIn,setIsLoggedIn] = useState(false);

  useEffect(()=>{
    let auth = sessionStorage.getItem("auth");

    if(auth){
        setIsLoggedIn(true)
    }
    else{
      setIsLoggedIn(false)
    }
  },[])
  return (
      <AppBar color='info' >
        <Toolbar>
        <img src={ process.env.PUBLIC_URL +'/images/logo.png'} alt='logo.png' style={logoCss}/>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
            ExamSphere
          </Typography>

         { !isLoggedIn && <Link href="/signup" underline="none" color="inherit">SignUp</Link> }
         { !isLoggedIn && <Link href="/signin" underline="none" color="inherit" className='mx-2'>SignIn</Link> }
         { isLoggedIn && <Link href="/logout" underline="none" color="inherit">Logout</Link> }
         { isLoggedIn && <Link href="profile" underline="none" color="inherit" className='mx-2'>profile</Link> }
        </Toolbar>
      </AppBar>
  );
}