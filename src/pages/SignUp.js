import React, { useState } from 'react'

import TextField from '@mui/material/TextField';
import { Form } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


import UserService from '../services/UserService'
import Navbar from '../components/Navbar';
import Snackbar  from '@mui/material/Snackbar';
// import Navbar from '../components/Navbar';

const userserviceObj = new UserService();

const logoCss={
        width:'100px',
        height:'100px',
        border: '1px dashed red',
        borderRadius: '100%',
}
function SignUp() {
    const [userData,setUserData]=useState({});
    // const [errorData,setErrorDate]=useState({});
    const [open, setOpen] = useState(true);
    const [msg,setMsg]=useState("");



    const handleUserInput = (event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setUserData(pre=>{
            return {...pre,[name]:value}
        })
        // console.log({[event.target.name]:event.target.value})
    }

    const registerUser=()=>{
        userserviceObj.createUser(userData).then(response=>{
            if(response.status==201){
                console.log(response.data)
                setMsg("Register successfully")
                setOpen(true)
            }
            
        }).catch(reject=>{
            console.log(reject.response)
            setMsg(reject.response.data)
            setOpen(true)
        });
        
    }

    const clearUserDate =()=>{
        setUserData(prev=>(
            {
                username:"",
                fname:"",
                lname:"",
                password:"",
                email:"",
                mobile:""
            }
        ))
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
  return (
    <div className='container-fluid'>
        <Navbar />

    
        <div id="sign-up" className='container mauto'>

            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <div className='container '>

                    

                        <Collapse in={open}>
                            <Alert action={ <IconButton aria-label="close" color="inherit" size="small" onClick={() => { setOpen(false); }} >
                                            <CloseIcon fontSize="inherit" />
                                            </IconButton>
                                        }
                            sx={{ mb: 2 }}
                            >
                            {msg}
                            </Alert>
                        </Collapse>
                    </div>
                    <Card>
                        <CardContent>
                            <div className='container text-center'>
                                <img src={ process.env.PUBLIC_URL +'/images/kick1.jpg'} alt='logo.png' style={logoCss}/>
                            </div>
                            <h1 className='text-center'>SignUp</h1>
                            <Form >
                                <TextField fullWidth id="username" size="small" label="Username" variant="outlined" margin="dense" onChange={handleUserInput} name='username' value={userData.username}/> 
                                <TextField fullWidth id="password" size="small" label="Password" variant="outlined" margin="dense" onChange={handleUserInput} type='password' name='password' value={userData.password}/> 
                                <TextField fullWidth id="fname"    size="small" label="First Name" variant="outlined" margin="dense" onChange={handleUserInput} name='fname' value={userData.fname}/>
                                <TextField fullWidth id="lname"    size="small" label="Last Name" variant="outlined" margin="dense" onChange={handleUserInput} name='lname' value={userData.lname}/>                  
                                <TextField fullWidth id="email"    size="small" label="Email Address" variant="outlined" margin="dense" onChange={handleUserInput} name='email' value={userData.email} type='email'/>
                                <TextField fullWidth id="mobile"   size="small" label="Phone Number" variant="outlined" margin="dense" onChange={handleUserInput} name='mobile' value={userData.mobile} type='number'/>
                            </Form>

                            <div className='container text-center mt-1'>
                                <Button variant="contained" color='success' className='mx-1' onClick={registerUser}>SignUp</Button>
                                <Button variant="contained" color='secondary' onClick={clearUserDate}>Clear</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SignUp