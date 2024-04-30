import {axiosInstance} from "../interceptor"

class UserQuizService{

    async getAllAttemptedQuizResponse(){
        return axiosInstance.get('/test-response',{withCredentials:true})
    }
    async getQuizResponseByQuizIdAndAttempNo(quizId,attemptNo){
        return axiosInstance.get('/test-response/'+quizId+"/"+attemptNo,{withCredentials:true})
    }
}

export default UserQuizService;