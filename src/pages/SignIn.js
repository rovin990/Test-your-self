import React ,{useState }from 'react'
import { Form } from 'react-router-dom'

import {useNavigate} from "react-router-dom"


import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Swal from "sweetalert2"

import UserService from '../services/UserService'
import Navbar from '../components/Navbar';

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
       // console.log(userData)
        userserviceObj.loginUser(userData).then(response=>{  
            if(response.status===200){
                window.sessionStorage.setItem("Authorization",response.headers.get("Authorization"));
                console.log("response.headers",response.headers)
                // const csrfToken = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1');
                // console.log(csrfToken)
                // let xsrf= Cookies.get("XSRF-TOKEN");
                // console.log("xsrf token from cookies",xsrf)
                // if(xsrf===undefined ||xsrf===null){
                //     xsrf= response.headers.get("x-xsrf-token");

                // //    let temp= window.atob(xsrf)
                //     console.log("temp decoded csrf",response.headers)
                //     console.log("xsrf token from header",xsrf)
                // }
                // console.log("xsrf token after login",xsrf)
                // window.document.cookie="XSRF-TOKEN="+xsrf;
                // window.sessionStorage.setItem("XSRF-TOKEN",xsrf)

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
            }         
            
        })
        .catch(reject=>{
            console.log(reject)
            const tempRes=reject.response;
            const tempData=tempRes.data;
            Swal.fire({
                title:'Error',
                text:tempData.detail,
                icon:"error",          
                showConfirmButton:true,
                confirmButtonText:"Ok",        
              }
              )

           return;
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
                                    <img src={ process.env.PUBLIC_URL +'/images/logo.png'} alt='logo.png' style={logoCss}/>
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