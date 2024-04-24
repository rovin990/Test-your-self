import { Card, CardContent, Divider, List, ListItem, ListItemButton, ListItemIcon,  ListItemText } from '@mui/material'
import InboxIcon from '@mui/icons-material/Inbox';
import QuizIcon from '@mui/icons-material/Quiz';
import HomeIcon from '@mui/icons-material/Home';
import React, { useState } from 'react'
import {Outlet, useLoaderData, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar';



function ListItemLink(props) {
    const { icon, primary, to } = props;
    const navigate = useNavigate();

    const handleOnclick = ()=>{
        navigate(`/user`+to)
    }
  
    return (
        <ListItem >          
            <ListItemButton onClick={handleOnclick}>
                <ListItemIcon>                    
                        {icon}                    
                </ListItemIcon>
                <ListItemText primary={primary}/>
            </ListItemButton>
        </ListItem>
    );
  }


function UserDashboard() {
    const loaderData = useLoaderData()
    console.log(loaderData)
    const [categories]= useState(loaderData);

    
  return (
    <>
        <Navbar />
        <div className='container-fluid ' style={{marginTop:70+'px'}}>
            <div className='row '>
                <div className='col-md-2'>
                    <Card style={{backgroundColor:'#fff4f5'}}>
                        <CardContent>
                            <nav aria-label="main mailbox folders">
                                <List>
                                    <ListItemLink to="/category/All" primary="All-quizzes" icon={<HomeIcon />} />
                                    {categories.map(category=><ListItemLink key={category.cid} to={`/category/`+category.title} primary={category.title} icon={<InboxIcon />} />)}
                                    
                                </List>
                                <Divider />
                                <ListItemLink to="/quizzes/attempted" primary="Attempted-quizzes" icon={<QuizIcon />} />
                            </nav>
                        </CardContent>
                    </Card>
                </div>
                <div className='col-md-10' style={{height:100+'%'}}>
                    <Outlet />
                </div>
            </div>
        </div>

    </>
    
  )
}

export default UserDashboard