import axios from "axios";
const BASE_URL="http://localhost:8080"
class UserQuizService{

    async getAllAttemptedQuizResponse(){
        return axios.get(BASE_URL+'/test-response',{withCredentials:true})
    }
    async getQuizResponseByQuizId(quizId){
        return axios.get(BASE_URL+'/test-response/'+quizId,{withCredentials:true})
    }
}

export default UserQuizService;