import axios from "axios";
const BASE_URL="http://localhost:8080"

class QuestionService{
    async getQuestions(filter){        
        return await axios.get(BASE_URL+"/question/"+filter,{withCredentials:true });
    }

    async createQuestion(formData){
        return await axios.post(BASE_URL+"/question",formData,{withCredentials:true })
    }
    async createQuestionWithOutImages(formData){
        return await axios.put(BASE_URL+"/question",formData,{withCredentials:true })
    }

    async updateQuestion(question){
        return await axios.put(BASE_URL+"/question",question,{withCredentials:true});
    }

    async deleteQuestion(questionId){
        return await axios.delete(BASE_URL+"/question/"+questionId,{withCredentials:true })
    }

    async getQuestionsByQuizId(quizId){
        return await axios.get(BASE_URL+"/question/quiz/"+quizId,{withCredentials:true })
    }
    async getQuestionsByQuizIdWithAnswer(quizId){
        return await axios.get(BASE_URL+"/question/quiz/"+quizId,{withCredentials:true})
    }
    
}

export default QuestionService;



// for (var key of formData.entries()) {
//     console.log(key[0] + ', ' + key[1]);
// }