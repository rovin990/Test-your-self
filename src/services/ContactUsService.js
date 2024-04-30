import {axiosInstance} from "../interceptor"


class ContactUsService{

    contactus(data){
        console.log(data);
        return axiosInstance.post("/contact-us",data)
    }
}

export default ContactUsService;