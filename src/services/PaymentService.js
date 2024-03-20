import axios from "axios"

import { ENVConstant } from "../constants/ENVConstant";

class PaymentService{

    async createOrder(){
        return axios.get(ENVConstant.BASE_URL+"/payment/orders?amount=50",{withCredentials:true});
    }

    async saveOrder(data){
        return axios.post(ENVConstant.BASE_URL+"/payment/success",data,{withCredentials:true})
    }
}


export default PaymentService;