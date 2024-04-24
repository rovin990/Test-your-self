import axios from "axios";

import { ENVConstant } from "../constants/ENVConstant";

class UserQuizService{

    async getAllAttemptedQuizResponse(){
        return axios.get(ENVConstant.BASE_URL+'/test-response',{withCredentials:true})
    }
    async getQuizResponseByQuizIdAndAttempNo(quizId,attemptNo){
        return axios.get(ENVConstant.BASE_URL+'/test-response/'+quizId+"/"+attemptNo,{withCredentials:true})
    }
}

export default UserQuizService;