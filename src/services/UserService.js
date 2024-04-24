import axios from "axios";
import User from "../Models/User";
import Cookies from "js-cookie"

import { ENVConstant } from "../constants/ENVConstant";

class UserService{

    async createUser(user){ 
        let data = new User(user.fname+" " +user.lname,user.mobile,user.email,user.password,user.username,"USER");
        // console.log(data)
        return await axios.post(ENVConstant.BASE_URL+"/register",data);
    }

    async loginUser(user){
        console.log("user name",user.username)
        return await axios.get(ENVConstant.BASE_URL+"/user",{ withCredentials:true ,auth:{username:user.username,password:user.password}});
    }

    logoutUser(){
        sessionStorage.clear();
        Cookies.remove('XSRF-TOKEN')
        Cookies.remove('JSESSIONID')
        axios.post(ENVConstant.BASE_URL+"/logout").then(response=>{
            console.log(response)
        });
    }

}

export default UserService;