import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function GaurdRoute(props) {
  
    const {Component} =props;
    
    const navigate = useNavigate();

    useEffect(()=>{
        let auth = sessionStorage.getItem("auth");
        if(!auth){
            navigate("/")
        }
    },[])
    
  return (
    <Component />
  )
}

export default GaurdRoute;