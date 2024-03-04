import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { Card, CardContent, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListIcon from '@mui/icons-material/List';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import QuizIcon from '@mui/icons-material/Quiz';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';


import Navbar from '../../components/Navbar';


function ListItemLink(props) {
    const { icon, primary, to } = props;
    const navigate = useNavigate();

    const handleOnclick = ()=>{
        navigate(`/admin`+to)
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

function AdminDashboard() {
  return (
    <>
        <Navbar />
        <div className='container-fluid ' style={{marginTop:70+'px'}}>
            <div className='row'>
                <div className='col-md-2'>
                    <Card>
                        <CardContent>
                            <nav aria-label="main mailbox folders">
                                <List>
                                    <ListItemLink to="/home" primary="Home" icon={<HomeIcon />} />
                                    <ListItemLink to="/profile" primary="Profile" icon={<AccountCircleIcon />} />
                                    <ListItemLink to="/categories" primary="Categories" icon={<ListIcon />} />
                                    <ListItemLink to="/add-category" primary="Add Category" icon={<PlaylistAddIcon />} />                                
                                    <ListItemLink to="/show-quizzes" primary="Quizzes" icon={<QuizIcon />} />
                                    <ListItemLink to="/add-quiz" primary="Add Quiz" icon={<AddIcon />} />
                                    <ListItemLink to="/show-questions" primary="Show Questions" icon={<QuestionMarkIcon />} />
                                    <ListItemLink to="/add-question" primary="Add Question" icon={<AddIcon />} />
                                </List>
                            </nav>
                        </CardContent>
                    </Card>
                </div>
                <div className='col-md-10'>
                    <Card>
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

export default AdminDashboard