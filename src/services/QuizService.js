import axios from "axios";
const BASE_URL="http://localhost:8080"

class QuizService{

    async getQuizz(filter){
        console.log(BASE_URL+"/"+filter)
        
        return await axios.get(BASE_URL+"/quiz/"+filter,{withCredentials:true,auth:{username:"kick990",password:"12345" } });
    }

    async getQuizzById(quizId){
        return await axios.get(BASE_URL+"/quiz?quizId="+quizId,{withCredentials:true,auth:{username:"kick990",password:"12345" } });
    }

    async createQuiz(quiz){
        return await axios.post(BASE_URL+"/quiz",quiz,{withCredentials:true,auth:{username:"kick990",password:"12345" } })
    }

    async updateQuiz(quiz){
        return await axios.put(BASE_URL+"/quiz",quiz,{withCredentials:true,auth:{username:"kick990",password:"12345" } });
    }

    async deleteQuiz(quizId){
        return await axios.delete(BASE_URL+"/quiz/"+quizId,{withCredentials:true,auth:{username:"kick990",password:"12345" } })
    }

    async getActiveQuizzes(){
        console.log(BASE_URL+"/quiz/active")
        return await axios.get(BASE_URL+"/quiz/active",{withCredentials:true,auth:{username:"kick990",password:"12345" } });
    }
    async getCategoryActiveQuizzes(category){
        console.log(BASE_URL+"/quiz/category/active/"+category)
        return await axios.get(BASE_URL+"/quiz/category/active/"+category,{withCredentials:true,auth:{username:"kick990",password:"12345" } });
    }

    async submitUserTest(quizId,responseData){
    let temp=[];
    for (const [key, value] of responseData) { 
        temp=[...temp,{"questionId":key,"answer":value}]
        
    }
    console.log(temp)
        const data ={
            quizId:quizId,
            responses:temp
        }
        
        return await axios.post(BASE_URL+"/test-response",data,{withCredentials:true,auth:{username:"kick990",password:"12345" } })
    }
}

export default QuizService;