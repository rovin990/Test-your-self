import React ,{useState }from 'react'
import { Form } from 'react-router-dom'

import Cookies from 'js-cookie';
import {useNavigate} from "react-router-dom"


import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import UserService from '../services/UserService'
import Navbar from '../components/Navbar';
import axios from 'axios';

const userserviceObj = new UserService();



const logoCss={
    width:'100px',
    height:'100px',
    border: '1px dashed red',
    borderRadius: '100%',
}
function SignIn() {
    const [userData,setUserData]=useState({});
    const navigate = useNavigate();

    const handleUserInput = (event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setUserData(pre=>{
            return {...pre,[name]:value}
        })
        // console.log({[event.target.name]:event.target.value})
    }

    const loginUser=()=>{
        userserviceObj.loginUser(userData).then(response=>{  
            if(response.status==200){
                window.sessionStorage.setItem("Authorization",response.headers.get("Authorization"));
                let xsrf= Cookies.get("XSRF-TOKEN");
                window.sessionStorage.setItem("XSRF-TOKEN",xsrf)

                window.sessionStorage.setItem("auth",true)

                let loggedInUser=response.data;
                let userdetails = JSON.stringify(loggedInUser)
                window.sessionStorage.setItem("userdetails",userdetails);

                if(loggedInUser.role.includes("ADMIN")){
                    console.log("/admin/dashboard")
                    navigate("/admin")
                }
                else{
                    console.log("/user/dashboard")
                    navigate("/user")
                }
                // console.log("before",sessionStorage)
                // userserviceObj.logoutUser()
                // console.log("After",sessionStorage)
            }         
            
        })
        .catch(reject=>{
            console.log(reject)
        })
        
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
  return (
    <div className='container-fluid'>
        <Navbar />
        <div id='signin' className='container mauto'>
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <Card>
                        <CardContent>
                            <div className='container text-center'>
                                    <img src={ process.env.PUBLIC_URL +'/images/kick1.jpg'} alt='logo.png' style={logoCss}/>
                            </div>
                            <h1 className='text-center'>SignIn</h1>
                            <Form>
                                <TextField fullWidth id="username" size="small" label="Username" variant="outlined" margin="dense" onChange={handleUserInput} name='username' value={userData.username}/>
                                <TextField fullWidth id="password" size="small" label="Password" variant="outlined" margin="dense" onChange={handleUserInput} type='password' name='password' value={userData.password}/> 
                            </Form>
                            <div className='container text-center mt-1'>
                                <Button variant="contained" color='success' className='mx-1' onClick={loginUser}>SignIn</Button>
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

export default SignIn