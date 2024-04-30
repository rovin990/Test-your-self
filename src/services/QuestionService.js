import {axiosInstance} from "../interceptor"

class QuestionService{
    async getQuestions(filter){        
        return await axiosInstance.get("/question/"+filter,{withCredentials:true });
    }

    async createQuestion(formData){
        return await axiosInstance.post("/question",formData,{withCredentials:true })
    }
    async createQuestionWithOutImages(formData){
        return await axiosInstance.post("/question/withoutimage",formData,{withCredentials:true })
    }

    async updateQuestion(question){
        return await axiosInstance.put("/question",question,{withCredentials:true});
    }

    async deleteQuestion(questionId){
        return await axiosInstance.delete("/question/"+questionId,{withCredentials:true })
    }

    async getQuestionsByQuizId(quizId){
        return await axiosInstance.get("/question/quiz/"+quizId,{withCredentials:true })
    }
    async getQuestionsByQuizIdWithAnswer(quizId){
        return await axiosInstance.get("/question/quiz/"+quizId,{withCredentials:true})
    }

    async uploadQuestionFile(formData){
        return await axiosInstance.post("/question/import",formData,{withCredentials:true})
    }
    
}

export default QuestionService;



// for (var key of formData.entries()) {
//     console.log(key[0] + ', ' + key[1]);
// }