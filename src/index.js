import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import axios from "axios";
import {RouterProvider} from "react-router-dom";

import router from './router';
import APPConstant from './constants/APPConstant';
import Cookies from 'js-cookie';

const APPConstantOBJ = new APPConstant();



// request interceptors
axios.interceptors.request.use((request)=>{
    // let csrf = sessionStorage.getItem("XSRF-TOKEN");
    // console.log("csrf token ",csrf)
    // if(csrf){
    //   request.headers['X-XSRF-TOKEN']=csrf;
    // }

    

    let authorization = sessionStorage.getItem("Authorization");
    if(authorization!==null){
      request.headers['Authorization']=APPConstantOBJ.ONEWHITE_SPACE+authorization;
    }
    console.log(request)
    return request;
},
error => {
   return  Promise.reject(error)
  })

//reponse interceptor
axios.interceptors.response.use((response)=>{
  console.log(response)

  let xsrf= Cookies.get("XSRF-TOKEN");
  // console.log("xsrf token from cookies in response",xsrf);
  window.sessionStorage.setItem("XSRF-TOKEN",xsrf)
  
  return response;
},error=>{
  console.log(error)
  if(error.response.data===APPConstant.JWT_TOKEN_INVALID || error.response.data===APPConstant.JWT_TOKEN_EXPIRE){
    window.location.href="/logout";
  }
  // console.log(reject)
  return Promise.reject(error);
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <RouterProvider router={router}/>
  </React.StrictMode>
);