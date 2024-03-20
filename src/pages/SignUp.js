import React, { useState } from 'react'

import TextField from '@mui/material/TextField';
import { Form } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


import UserService from '../services/UserService'
import Navbar from '../components/Navbar';

import Model from "../utility/Model"
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const userserviceObj = new UserService();

const logoCss={
        width:'100px',
        height:'100px',
        border: '1px dashed red',
        borderRadius: '100%',
}
function SignUp() {
    const [userData,setUserData]=useState({
        username:"",
        fname:"",
        lname:"",
        password:"",
        email:"",
        mobile:""
    });
    const [open, setOpen] = useState(false);
    const [msg,setMsg]=useState("");

    const [unErr,setUnErr]=useState(false)
    const [fnErr,setFnErr]=useState(false)
    const [lnErr,setLnErr]=useState(false)
    const [emlErr,setEmlErr]=useState(false)
    const [passErr,setPassErr]=useState(false)
    const [phoneErr,setPhoneErr]=useState(false)


    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    // const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     event.preventDefault();
    // };



    const handleUserInput = (event)=>{
        const name=event.target.name;
        const value=event.target.value;

        switch(name){
            case "username":{
                setUnErr(false)
                break;
            }
            case "lname":{
                setLnErr(false)
                break;
            }
            case "fname":{
                setFnErr(false)
                break;
            }
            case "password":{
                setPassErr(false)
                break;
            }
            case "mobile":{
                setPhoneErr(false)
                break;
            }
            case "email":{
                setEmlErr(false);
                break;
            }
            default :{
                console.log("default")
            }
        }
        setUserData(pre=>{
            return {...pre,[name]:value}
        })
    }

   function validatUserInfo(){
        const usernameRegEx=new RegExp("^[0-9A-Za-z]{6,10}$")
        const passwordRegEx=new RegExp("^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$");
        const nameRegEx=new RegExp("^[A-Za-z]{3,}$");
        const phoneRegEx=new RegExp("^[6-9]\d{9}$");
        const emailRegEx=new RegExp("^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$");

        let isFine = true;
        // if(userData===undefined || userData ==null)return;
        if(userData.username.trim()==='' || userData.username==null || !usernameRegEx.test(userData.username)){
            setUnErr(true)
            isFine=false
        }
        if(userData.password.trim()==='' || userData.password==null || !passwordRegEx.test(userData.password)){
            setPassErr(true)
            isFine=false
        }
        if(userData.email.trim()==='' || userData.email==null || !emailRegEx.test(userData.email)){
            setEmlErr(true)
            isFine=false
        }
        console.log("phoneRegEx.test(userData.mobile)",phoneRegEx.test(userData.mobile))
        if(userData.mobile.trim()==='' || userData.mobile==null || userData.mobile.length!==10){
            setPhoneErr(true)
            isFine=false
        }
        if(userData.lname.trim()==='' || userData.lname==null || !nameRegEx.test(userData.lname)){
           
            setLnErr(true)

            isFine=false
        }
        if(userData.fname.trim()==='' || userData.fname==null || !nameRegEx.test(userData.fname)){         
            setFnErr(true)

            isFine=false
        }       
        return isFine;
        
        
    }

    const registerUser=()=>{
       if(!validatUserInfo()){
        return;
       }
       console.log(userData)
        userserviceObj.createUser(userData).then(response=>{
            if(response.status===201){
                console.log(response.data)
                setMsg("Register successfully")
                setOpen(true)
            }
            
        }).catch(error=>{
            console.log("error",error.response)
            setMsg(error.response.data)
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

    function handleDialog(){
        setOpen(false)        
    }
  return (
    <div className='container-fluid'>
        <Navbar />

    
        <div id="sign-up" className='container mauto'>

            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <Model color="" responseMsg={msg} isOpen={open} handleDialog={handleDialog} />
                    <Card>
                        <CardContent>
                            <div className='container text-center'>
                                <img src={ process.env.PUBLIC_URL +'/images/kick1.jpg'} alt='logo.png' style={logoCss}/>
                            </div>
                            <h1 className='text-center'>SignUp</h1>
                            <Form >
                                <TextField error={unErr} fullWidth id="username" size="small" label="Username" variant="outlined" margin="dense" onChange={handleUserInput} name='username' value={userData.username} /> 
                                <FormControl error={passErr} fullWidth size="small" margin="dense" variant="outlined">
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                    <OutlinedInput
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        onChange={handleUserInput}
                                        endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            // onMouseDown={handleMouseDownPassword}
                                            
                                            edge="end"
                                            >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                        }
                                        label="Password"
                                        name='password' value={userData.password}
                                    />
                                </FormControl>
                                
                                
                                <TextField error={fnErr} fullWidth id="fname"    size="small" label="First Name" variant="outlined" margin="dense" onChange={handleUserInput} name='fname' value={userData.fname}/>
                                <TextField error={lnErr} fullWidth id="lname"    size="small" label="Last Name" variant="outlined" margin="dense" onChange={handleUserInput} name='lname' value={userData.lname}/>                  
                                <TextField error={emlErr} fullWidth id="email"    size="small" label="Email Address" variant="outlined" margin="dense" onChange={handleUserInput} name='email' value={userData.email} type='email'/>
                                <TextField error={phoneErr} fullWidth id="mobile"   size="small" label="Phone Number" variant="outlined" margin="dense" onChange={handleUserInput} name='mobile' value={userData.mobile} type='number' pattern="[1-9]{1}[0-9]{9}"/>
                            </Form>

                            <div className='container text-center mt-1'>
                                <Button variant="contained" color='success' className='mx-1' onClick={registerUser}>SignUp</Button>
                                <Button variant="contained" color='secondary' onClick={clearUserDate}>Clear</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className='col-md-3'>
                    <div >
                        <ol>
                            <li>Every feild are mendetory</li>
                            <li>Username should be alpha-numerical with atleast 6 chars and max 16 chars</li>
                            <li>first name and last name  should be alpha char only with atleast 3 chars and max 16 chars</li>
                            <li>
                                <h5>Password</h5>
                                <ol>
                                    <li>Atleast one number</li>
                                    <li>Atleast one uppercase letter</li>
                                    <li>Atleast one lowercase letter</li>
                                    <li>Atleast one character that is NOT alphanumeric(special character)</li>
                                    <li>characters between 8 and 32 characters long</li>                                  
                                </ol>
                            </li>
                            <li>
                                <h5>Email</h5>
                                <ol>
                                    <li>Must have @ symbol</li>
                                    <li>Must some string preceding @ symbol , some string proceeding it</li>
                                    <li> proceeding string  needs to contain a dot, which has an additional 2-3 characters after that</li>
                                </ol>
                            </li>
                            <li>
                                <h5>Mobile</h5>
                                <ol>
                                    <li>Must be numerical</li>
                                    <li>Must be length of 10</li>
                                </ol>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SignUp