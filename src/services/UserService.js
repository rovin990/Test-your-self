import axios from "axios";
import User from "../Models/User";

class UserService{

    async createUser(user){ 
        let data = new User(user.fname+" " +user.lname,user.mobile,user.email,user.password,user.username,"USER");
        console.log(data)
        return await axios.post("http://localhost:8080/register",data);
    }

    async loginUser(user){
        return await axios.get("http://localhost:8080/user",{ withCredentials:true ,auth:{username:user.username,password:user.password}});
    }

    logoutUser(){
        sessionStorage.clear();
    }

}

export default UserService;