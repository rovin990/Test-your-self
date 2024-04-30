import {axiosInstance} from "../interceptor"

class PaymentService{

    async createOrder(){
        return axiosInstance.get("/payment/orders?amount=50",{withCredentials:true});
    }

    async saveOrder(data){
        return axiosInstance.post("/payment/success",data,{withCredentials:true})
    }
}


export default PaymentService;