import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import axios from "axios";
import {RouterProvider, redirect} from "react-router-dom";

import router from './router';
import APPConstant from './constants/APPConstant';




// const axiosInstance = axios.create({
//     baseURL:ENVConstant.BASE_URL
// })
// request interceptors
axios.interceptors.request.use((request)=>{
    let csrf = sessionStorage.getItem("XSRF-TOKEN");
    if(csrf){
      request.headers['X-XSRF-TOKEN']=csrf;
    }

    

    let authorization = sessionStorage.getItem("Authorization");
    if(authorization!==null){
      request.headers['Authorization']=authorization;
       console.log("authorization header after successfull login ",request.headers.get('Authorization'))
    }
    
    return request;
},
error => {
    Promise.reject(error)
  })

axios.interceptors.response.use((response)=>{
  console.log(response)
  
  return response;
},reject=>{
  if(reject.response.data===APPConstant.JWT_TOKEN_INVALID || reject.response.data===APPConstant.JWT_TOKEN_EXPIRE){
    window.location.href="/logout";
  }
  console.log(reject)
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <RouterProvider router={router}/>
  </React.StrictMode>
);