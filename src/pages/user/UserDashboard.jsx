import { Card, CardContent, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemLinkButton, ListItemLinkIcon, ListItemLinkText, ListItemText } from '@mui/material'
import InboxIcon from '@mui/icons-material/Inbox';
import HomeIcon from '@mui/icons-material/Home';
import React, { useState } from 'react'
import {Outlet, useLoaderData, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar';



function ListItemLink(props) {
    const { icon, primary, to } = props;
    const navigate = useNavigate();

    const handleOnclick = ()=>{
        navigate(`/user/category/`+to)
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
  
//   ListItemLink.propTypes = {
//     icon: PropTypes.element,
//     primary: PropTypes.string.isRequired,
//     to: PropTypes.string.isRequired,
//   };

function UserDashboard() {
    const loaderData = useLoaderData()
    console.log(loaderData)
    const [categories,setCategories]= useState(loaderData);

    
  return (
    <>
        <Navbar />
        <div className='container-fluid ' style={{marginTop:70+'px'}}>
            <div className='row '>
                <div className='col-md-2'>
                    <Card>
                        <CardContent>
                            <nav aria-label="main mailbox folders">
                                <List>
                                    <ListItemLink to="All" primary="All-quizzes" icon={<HomeIcon />} />
                                    {categories.map(category=><ListItemLink to={category.title} primary={category.title} icon={<InboxIcon />} />)}
                                    
                                </List>
                            </nav>
                        </CardContent>
                    </Card>
                </div>
                <div className='col-md-10'>
                    <Card  style={{height:100+'%'}}>
                        <CardContent>
                            <Outlet />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>

    </>
    
  )
}

export default UserDashboard