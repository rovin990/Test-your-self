import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import TextField from '@mui/material/TextField';
import DoneIcon from '@mui/icons-material/Done';
import Button from '@mui/material/Button';

import Model from "../utility/Model"

import ContactUsService from '../services/ContactUsService';
import { Link } from 'react-router-dom';
import SuccessStory from './SuccessStory';

const contactUsService = new ContactUsService();

function Home() {
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[message,setMessage]=useState("");

    const[nameErr,setNameErr]=useState(false);
    const[emailErr,setEmailErr]=useState(false);
    const[messageErr,setMessageErr]=useState(false);


    //handle model
    const [open,setOpen] = useState(false);
    const [responseMsg,setResponseMsg]=useState("");
    const [color,setColor] = useState("");
    function handleDialog(){
    setOpen(false)        
    }

    function handleUserInput(event){
        const name=event.target.name;
        const value=event.target.value;

        switch(name){
            case 'name':{
                setName(value);
                setNameErr(false)
                break;
            }
            case 'email':{
                setEmail(value);
                setEmailErr(false)
                break;
            }
            default:{
                setMessage(value);
                setMessageErr(false)
                break;
            }
        }

       // console.log(name,value)
    }

    function handleContactUs(){
        let isFinal=true;
        if(name.trim()==='' || name.trim()===null){
            
            setNameErr(true);
            isFinal=false;
        }
        if(email.trim()==='' || email.trim()===null){
            setEmailErr(true);
            isFinal=false;
        }
        if(message.trim()==='' || message.trim()===null){
            setMessageErr(true);
            isFinal=false;
        }

        if(!isFinal){
            return;
        }

        contactUsService.contactus({name,email,message}).then(response=>{
            console.log(response)
            setResponseMsg("Service reference : "+response.data)
            setOpen(true)
            setColor("success")
        }).catch(error=>{
            console.log(error)
            setResponseMsg(error.data)
            setOpen(true)
            setColor("warning")
        })

    }
   

  return (
    <div className='container-fluid'  id='home'>
        <div className='row'>
            <div className='col-md-12'>
                <Navbar />
            </div>
        </div>
        <div className='row' >
            <div className='col-md-12'>
                <section id='banner'>
                    <div className='container text-center'>
                        <h1>Free online practice quizz</h1>
                        <p>Come and practice whatever topic you want .</p>

                        <button className='btn m-1 do-practice'>do-practice</button>
                        <p><DoneIcon />Used by 50k+ people around the world</p>
                    </div>
                </section>
                <section id='middle-section' className='container text-center p-5'>
                        <h1>success Story</h1>
                        <SuccessStory />
                    
                </section>
                <section id='contact-us' className='bg-columbia-blue'>
                    <div className='container p-5'>
                        <div className='row'>
                            <div className='col-md-6 d-flex  align-items-center'>
                                <div>
                                    <h1 >Get in touch</h1>
                                    <p >Send us a message, and we'll get back to you as soon as we can</p>
                                </div>
                            </div>
                            <div className='col-md-6 p-5' style={{backgroundColor:'white'}} >
                                    <Model color={color} responseMsg={responseMsg} isOpen={open} handleDialog={handleDialog} />
                                    <form>
                                        <TextField error={nameErr} fullWidth id="Name" label="Name" variant="outlined"  className='mb-4' name='name' value={name} onChange={handleUserInput}/>
                                        <TextField error={emailErr} fullWidth id="Email" label="Email" variant="outlined" className='mb-4' name='email' value={email} onChange={handleUserInput}/>
                                        <TextField
                                            error={messageErr}
                                            fullWidth
                                            id="message"
                                            label="Message"
                                            multiline
                                            rows={4}
                                            size='medium'
                                            name='message'
                                            value={message}
                                            onChange={handleUserInput}
                                            />
                                        
                                    </form>
                                    <div className='container text-center'>
                                    <Button variant='contained' className='m-2' onClick={handleContactUs}>Contact-us</Button>
                                    </div>

                            </div>
                        </div>
                    </div>
                </section>
                
                <section id='footer' className='bg-davy-gray'>
                    <div className='container text-center'>
                        <div className='row'>
                            <div className='col-md-3'>
                            <div className='d-flex content-justify-center'>
                                <img src={ process.env.PUBLIC_URL +'/images/flogo.png'} alt='logo.png' className='f-logo img-responsive'/>
                                <p className='h3 text-white ml-2 p-1'>ExamSphere</p>
                            </div>
                            <p className='h6 text-white fw-semibold m-2'>ExamSphere pvt Ltd</p>
                            <address className='text-white fw-semibold m-2'>
                                abc street,<br/>
                                Agra , by-pass road,<br/>
                                Uttar Pradesh-283203
                            </address>
                            </div>
                            <div className='col-md-3'>
                                <p className='h6 text-white fw-semibold m-2'>Company</p>
                                <ul className="nav flex-column">
                                    <li className="nav-item mb-2"><Link to="/about-us" className="nav-link p-0 text-body-secondary f-link">About Us</Link></li>
                                    <li className="nav-item mb-2"><Link to="/about-us" className="nav-link p-0 text-body-secondary">practice quiz</Link></li>
                                </ul>
                            </div>
                            <div className='col-md-3'>
                                
                                
                            </div>
                            <div className='col-md-3'>
                                
                            </div>
                        </div>
                        
                    </div>                    
                    <hr/>
                    <div className='container'>
                        <p>Copyright &copy; {new Date().getFullYear()} ExamSphere Pvt. Ltd.: All rights reserved</p>
                    </div>
                </section>
            </div>

        </div>
    </div>
  )
}

export default Home