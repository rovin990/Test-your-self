import axios from "axios";
import {ENVConstant} from "./constants/ENVConstant.js";
import APPConstant from './constants/APPConstant';

const APPConstantOBJ = new APPConstant();

export const axiosInstance = axios.create({
    baseURL:ENVConstant.BASE_URL
})

axiosInstance.interceptors.request.use((config)=>{

    let authorization = sessionStorage.getItem("Authorization");
    if(authorization){
       config.headers['Authorization']=APPConstantOBJ.ONEWHITE_SPACE+authorization;
    }
    return config;
},
error => {
    Promise.reject(error)
  })

//reponse interceptor
axiosInstance.interceptors.response.use((response)=>{
    console.log(response)
  
    // let xsrf= Cookies.get("XSRF-TOKEN");
    // // console.log("xsrf token from cookies in response",xsrf);
    // window.sessionStorage.setItem("XSRF-TOKEN",xsrf)
    
    return response;
  },error=>{
    console.log(error)
    if(error.response.data===APPConstant.JWT_TOKEN_INVALID || error.response.data===APPConstant.JWT_TOKEN_EXPIRE){
      window.location.href="/logout";
    }
    // console.log(reject)
    return Promise.reject(error);
  })