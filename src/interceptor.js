import axios from "axios";
import {ENVConstant} from "./constants/ENVConstant.js";

const axiosInstance = axios.create({
    baseURL:ENVConstant.BASE_URL
})

axiosInstance.interceptors.request.use((config)=>{
    let csrf = sessionStorage.getItem("XSRF-TOKEN");
    if(csrf){
        config.headers['X-XSRF-TOKEN']=csrf;
    }

    console.log(config)

    let authorization = sessionStorage.getItem("Authorization");
    if(authorization){
       config.headers['Authorization']='Bearer '+authorization;
    }
    return config;
},
error => {
    Promise.reject(error)
  })

export default axiosInstance;