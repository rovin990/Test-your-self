import axios  from "axios";

import {ENVConstant} from "../constants/ENVConstant"


class ContactUsService{

    contactus(data){
        console.log(data);
        return axios.post(ENVConstant.BASE_URL+"/contact-us",data)
       // return Math.floor(Math.random()*100);
    }
}

export default ContactUsService;