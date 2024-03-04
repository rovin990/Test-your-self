import axios from "axios";
const BASE_URL="http://localhost:8080/question"

class QuestionService{
    async getQuestions(filter){
        console.log(BASE_URL+"/"+filter)
        
        return await axios.get(BASE_URL+"/"+filter,{withCredentials:true,auth:{username:"kick990",password:"12345" } });
    }

    async createQuestion(question){
        return await axios.post(BASE_URL,question,{withCredentials:true,auth:{username:"kick990",password:"12345" } })
    }

    async updateQuestion(question){
        return await axios.put(BASE_URL,question,{withCredentials:true,auth:{username:"kick990",password:"12345" } });
    }

    async deleteQuestion(questionId){
        return await axios.delete(BASE_URL+"/"+questionId,{withCredentials:true,auth:{username:"kick990",password:"12345" } })
    }

    async getQuestionsByQuizId(quizId){
        return await axios.get(BASE_URL+"/quiz/"+quizId,{withCredentials:true,auth:{username:"kick990",password:"12345" } })
    }
    async getQuestionsByQuizIdWithAnswer(quizId){
        return await axios.get(BASE_URL+"/quiz/"+quizId,{withCredentials:true,auth:{username:"kick990",password:"12345" } })
    }
}

export default QuestionService;