import React, { useEffect, useState } from 'react'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';

const logoCss={
    width:'100px',
    height:'100px',
    border: '1px dashed red',
    borderRadius: '100%',
}
function AdminProfile() {
    const [user,setuser] = useState({});

    useEffect(()=>{
        setuser(JSON.parse(sessionStorage.getItem("userdetails")))
    },[])
  return (
    <div className='container text-center'>
        <img src={ process.env.PUBLIC_URL +'/images/kick1.jpg'} alt='logo.png' style={logoCss}/>
        <h2>{user.username}</h2>
        <div className='container text-center'>
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                <Table borderAxis="both">            
                <TableBody>
                    <TableRow>
                        <TableCell>Email</TableCell>
                        <TableCell>{user.email}</TableCell>                    
                    </TableRow>
                    <TableRow>
                        <TableCell>Mobile</TableCell>
                        <TableCell>{user.mobile}</TableCell>                    
                    </TableRow>
                    <TableRow>
                        <TableCell>Role</TableCell>
                        <TableCell>{user.roles}</TableCell>                    
                    </TableRow>
                    <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell>{user.username}</TableCell>                    
                    </TableRow>
                    </TableBody>
                </Table>
                </div>
            </div>
        </div>

        <div className='container text-center mt-1'>
            <Button variant="contained" color='success' className='mx-1' onClick={()=>console.log("update")}>Update</Button>
            <Button variant="contained" color='secondary' onClick={()=>console.log("share")}>Share</Button>
        </div>


    </div>
  )
}

export default AdminProfile