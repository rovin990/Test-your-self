import {createBrowserRouter} from "react-router-dom";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Welcome from "./pages/user/Welcome";
import AdminWelcome  from "./pages/admin/AdminWelcome";

import AdminProfile from "./pages/admin/AdminProfile";
import ShowCategory from "./pages/admin/exam/ShowCategory";
import AddCategory from "./pages/admin/exam/AddCategory";
import ShowQuiz from "./pages/admin/exam/ShowQuiz";
import AddQuiz from "./pages/admin/exam/AddQuiz";

import UserService from "./services/UserService";
import CategoryService from "./services/CategoryService";
import QuestionService from "./services/QuestionService";
import UserQuizService from "./services/UserQuizService";
import QuizService from "./services/QuizService";


import UpdateQuiz from "./pages/admin/exam/UpdateQuiz";
import AddQuestion from "./pages/admin/exam/AddQuestion";
import ShowQuestions from "./pages/admin/exam/ShowQuestions";
import ShowQuizzes from "./pages/user/tests/ShowQuizzes";
import Instructions from "./components/TestModule/Instructions";
import ExamPaper from "./components/TestModule/ExamPaper";
import GaurdRoute from "./GaurdRoute";
import ScoreDashboard from "./components/TestModule/ScoreDashboard";
import Solution from "./components/TestModule/Solution";
import AttemptedQuiz from "./pages/user/tests/AttemptedQuiz";
import ViewPaper from "./components/TestModule/ViewPaper";


const userserviceObj = new UserService();
const categoryService = new CategoryService();
const questionService = new QuestionService();
const userQuizService = new UserQuizService();
const quizService = new QuizService();



const router = createBrowserRouter([
    {
      path:"/",
      element:<Home/>
  
    },
    {
      path:"/signup",
      element:<SignUp/>
      
    },
    {
      path:"/signin",
      element:<SignIn/>
      
    },
    {
      path:"/logout",
      element:<Home/>,
      loader:(()=>{
        userserviceObj.logoutUser()
        return null;
      })
      
    },
    {
      path:"/admin",
      element:<GaurdRoute Component={AdminDashboard}/>,
      children:[
        // {index:true,element:<AdminWelcome />},   
        // {
        //   path:"home",
        //   element:<h1>home</h1>
        // },
        {
            path:"show-quizzes",
            element:<GaurdRoute  Component={ShowQuiz} />          
        },
        {
          path:"update-quiz",
          element:<GaurdRoute  Component={UpdateQuiz} />,
          loader : async ()=>{
            console.log("before update-quiz")
            const categories=await categoryService.getCategories();
            console.log("Inside update-quiz")
            return categories.data;          
          }
        },
        {
            path:"profile",
            element:<GaurdRoute  Component={AdminProfile} />
        },
        {
            path:"add-quiz",
            element:<GaurdRoute  Component={AddQuiz} />,
            loader : async ()=>{
              const categories=await categoryService.getCategories();            
              return categories.data;
            }
        },
        {
          path:"categories",
          element:<GaurdRoute Component={ShowCategory} />
        },
        {
          path:"add-category",
          element:<GaurdRoute Component={AddCategory} />
        },
        {
          path:"show-questions",
          element:<GaurdRoute Component={ShowQuestions} />,
          loader:async ()=>{
          const allQuestions= await questionService.getQuestions("All");
          let tempData=allQuestions.data;
          return tempData;
          }
        },
        {
          path:"add-question",
          element:<GaurdRoute Component={AddQuestion} />
        }
        
      ]
    },
    {
        path:"/user",
        element:<GaurdRoute Component={ UserDashboard }/>,
        loader:async ()=>{
          const categories=await categoryService.getCategories();            
          return categories.data;
        },
        children:[
            // {index:true,element:<Welcome />},
            {
                path:"category/:category",
                element:<GaurdRoute Component={ShowQuizzes} />
            },
            {
              path:"quizzes/attempted",
              element:<GaurdRoute Component={AttemptedQuiz} />,
              loader :async()=>{
                const userAttemptedQuiz = await userQuizService.getAllAttemptedQuizResponse();
                return userAttemptedQuiz.data;
              }
            }
            
        ]
    },
    {
      path:"quiz/quiz-instruction",
      element:<GaurdRoute Component={Instructions} />
    },
    {
      path:"quiz/view",
      element:<GaurdRoute Component={ ViewPaper }/>
    },
    {
      path:"quiz/start/:quizId",
      element:<GaurdRoute Component={ ExamPaper }/>,
      loader:async ({params})=>{
        const questions = await questionService.getQuestionsByQuizId(params.quizId);
        return  questions.data;
      }
    },
    {
      path:"quiz/quiz-report/:attemptNo",
      element:<GaurdRoute Component={ ScoreDashboard }/>
    },
    {
      path:"quiz/solution/:quizId/:attemptNo",
      element:<GaurdRoute Component={ Solution } />,
      loader:async ({params})=>{
        const questions= await questionService.getQuestionsByQuizIdWithAnswer(params.quizId);
        const quiz = await quizService.getQuizzById(params.quizId);
        return  [questions.data,quiz.data];
      }
    },
   

  ]);
  

  export default router;