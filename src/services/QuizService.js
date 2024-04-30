import {axiosInstance} from "../interceptor"

class QuizService{

    async getQuizz(filter){
        // console.log(BASE_URL+"/"+filter)
        
        return await axiosInstance.get("/quiz/"+filter,{withCredentials:true });
    }

    async getQuizzById(quizId){
        return await axiosInstance.get("/quiz?quizId="+quizId,{withCredentials:true});
    }

    async createQuiz(quiz){
        return await axiosInstance.post("/quiz",quiz,{withCredentials:true })
    }

    async updateQuiz(quiz){
        return await axiosInstance.put("/quiz",quiz,{withCredentials:true });
    }

    async deleteQuiz(quizId){
        return await axiosInstance.delete("/quiz/"+quizId,{withCredentials:true})
    }

    async getActiveQuizzes(){
        return await axiosInstance.get("/quiz/active",{withCredentials:true});
    }
    async getCategoryActiveQuizzes(category){
        return await axiosInstance.get("/quiz/category/active/"+category,{withCredentials:true});
    }

    async submitUserTest(quizId,quizTitle,responseData){
        let temp=[];
        for (const [key, value] of responseData) { 
            temp=[...temp,{"questionId":key,"answer":value}]
        }
        console.log(temp)
            const data ={
                quizId:quizId,
                quizTitle:quizTitle,
                responses:temp
        }
        
        return await axiosInstance.post("/test-response",data,{withCredentials:true})
    }

    async getRankerByQuizId(quizId,attemptNo){
        return axiosInstance.get("/test-response/rankers?quizId="+quizId+"&attemptNo="+attemptNo,{withCredentials:true})
    }
}

export default QuizService;



// async getQuizz(filter){
//     console.log(BASE_URL+"/"+filter)
    
//     return await axiosInstance.get(BASE_URL+"/quiz/"+filter,{withCredentials:true,auth:{username:"kick990",password:"12345" } });
// }

// async getQuizzById(quizId){
//     return await axiosInstance.get(BASE_URL+"/quiz?quizId="+quizId,{withCredentials:true,auth:{username:"kick990",password:"12345" } });
// }

// async createQuiz(quiz){
//     return await axiosInstance.post(BASE_URL+"/quiz",quiz,{withCredentials:true,auth:{username:"kick990",password:"12345" } })
// }

// async updateQuiz(quiz){
//     return await axiosInstance.put(BASE_URL+"/quiz",quiz,{withCredentials:true,auth:{username:"kick990",password:"12345" } });
// }

// async deleteQuiz(quizId){
//     return await axiosInstance.delete(BASE_URL+"/quiz/"+quizId,{withCredentials:true,auth:{username:"kick990",password:"12345" } })
// }

// async getActiveQuizzes(){
//     console.log(BASE_URL+"/quiz/active")
//     return await axiosInstance.get(BASE_URL+"/quiz/active",{withCredentials:true,auth:{username:"kick990",password:"12345" } });
// }
// async getCategoryActiveQuizzes(category){
//     console.log(BASE_URL+"/quiz/category/active/"+category)
//     return await axiosInstance.get(BASE_URL+"/quiz/category/active/"+category,{withCredentials:true,auth:{username:"kick990",password:"12345" } });
// }

// async submitUserTest(quizId,quizTitle,responseData){
// let temp=[];
// for (const [key, value] of responseData) { 
//     temp=[...temp,{"questionId":key,"answer":value}]
    
// }
// console.log(temp)
//     const data ={
//         quizId:quizId,
//         quizTitle:quizTitle,
//         responses:temp
//     }
    
//     return await axiosInstance.post(BASE_URL+"/test-response",data,{withCredentials:true,auth:{username:"kick990",password:"12345" } })
// }