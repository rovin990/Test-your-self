import axios from "axios";
import User from "../Models/User";

import { ENVConstant } from "../constants/ENVConstant";

class UserService{

    async createUser(user){ 
        let data = new User(user.fname+" " +user.lname,user.mobile,user.email,user.password,user.username,"USER");
        // console.log(data)
        return await axios.post(ENVConstant.BASE_URL+"/register",data);
    }

    async loginUser(user){
        return await axios.get(ENVConstant.BASE_URL+"/user",{ withCredentials:true ,auth:{username:user.username,password:user.password}});
    }

    logoutUser(){
        sessionStorage.clear();
    }

}

export default UserService;