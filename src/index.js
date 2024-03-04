import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import axios from "axios";
import {RouterProvider} from "react-router-dom";

import router from './router';


// const axiosInstance = axios.create({
//     baseURL:ENVConstant.BASE_URL
// })
//request interceptors
// axios.interceptors.request.use((config)=>{
//     let csrf = sessionStorage.getItem("XSRF-TOKEN");
//     if(csrf){
//         config.headers['X-XSRF-TOKEN']=csrf;
//     }

    

//     let authorization = sessionStorage.getItem("Authorization");
//     if(authorization){
//        config.headers['Authorization']=authorization;
//        console.log("authorization header after successfull login ",config.headers.get('Authorization'))
//     }
    
//     return config;
// },
// error => {
//     Promise.reject(error)
//   })

//response interceptors
// axios.interceptors.response.use((responseConfig)=>{
//   console.log("Response ",responseConfig)
//   return responseConfig;
// })




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <RouterProvider router={router}/>
  </React.StrictMode>
);
