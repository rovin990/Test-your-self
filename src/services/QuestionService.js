import axios from "axios";

import { ENVConstant } from "../constants/ENVConstant";

class QuestionService{
    async getQuestions(filter){        
        return await axios.get(ENVConstant.BASE_URL+"/question/"+filter,{withCredentials:true });
    }

    async createQuestion(formData){
        return await axios.post(ENVConstant.BASE_URL+"/question",formData,{withCredentials:true })
    }
    async createQuestionWithOutImages(formData){
        return await axios.put(ENVConstant.BASE_URL+"/question",formData,{withCredentials:true })
    }

    async updateQuestion(question){
        return await axios.put(ENVConstant.BASE_URL+"/question",question,{withCredentials:true});
    }

    async deleteQuestion(questionId){
        return await axios.delete(ENVConstant.BASE_URL+"/question/"+questionId,{withCredentials:true })
    }

    async getQuestionsByQuizId(quizId){
        return await axios.get(ENVConstant.BASE_URL+"/question/quiz/"+quizId,{withCredentials:true })
    }
    async getQuestionsByQuizIdWithAnswer(quizId){
        return await axios.get(ENVConstant.BASE_URL+"/question/quiz/"+quizId,{withCredentials:true})
    }
    
}

export default QuestionService;



// for (var key of formData.entries()) {
//     console.log(key[0] + ', ' + key[1]);
// }