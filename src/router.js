import {createBrowserRouter} from "react-router-dom";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Welcome from "./pages/user/Welcome";
import AdminWelcome  from "./pages/admin/AdminWelcome";
import Profile from "./pages/user/Profile";

import AdminProfile from "./pages/admin/AdminProfile";
import ShowCategory from "./pages/admin/exam/ShowCategory";
import AddCategory from "./pages/admin/exam/AddCategory";
import ShowQuiz from "./pages/admin/exam/ShowQuiz";
import AddQuiz from "./pages/admin/exam/AddQuiz";

import UserService from "./services/UserService";
import CategoryService from "./services/CategoryService";
import QuestionService from "./services/QuestionService";


import UpdateQuiz from "./pages/admin/exam/UpdateQuiz";
import AddQuestion from "./pages/admin/exam/AddQuestion";
import ShowQuestions from "./pages/admin/exam/ShowQuestions";
import ShowQuizzes from "./pages/user/tests/ShowQuizzes";
import Instructions from "./components/TestModule/Instructions";
import ExamPaper from "./components/TestModule/ExamPaper";
import GaurdRoute from "./GaurdRoute";
import ScoreDashboard from "./components/TestModule/ScoreDashboard";
import Solution from "./components/TestModule/Solution";


const userserviceObj = new UserService();
const categoryService = new CategoryService();
const questionService = new QuestionService();



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
        {index:true,element:<AdminWelcome />},   
        {
          path:"home",
          element:<h1>home</h1>
      },
      {
          path:"show-quizzes",
          element:<ShowQuiz />          
      },
      {
        path:"update-quiz",
        element:<UpdateQuiz />,
        loader : async ()=>{
          const categories=await categoryService.getCategories();

          return categories.data;          
       }
      },
      {
          path:"profile",
          element:<AdminProfile />
      },
      {
          path:"add-quiz",
          element:<AddQuiz />,
          loader : async ()=>{
            const categories=await categoryService.getCategories();            
            return categories.data;
          }
      },
      {
        path:"categories",
        element:<ShowCategory/>
      },
      {
        path:"add-category",
        element:<AddCategory />
      },
      {
        path:"add-category",
        element:<AddCategory />
      },
      {
        path:"show-questions",
        element:<ShowQuestions />
      },
      {
        path:"add-question",
        element:<AddQuestion />
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
            {index:true,element:<Welcome />},
            {
                path:"category/:category",
                element:<ShowQuizzes />
            }
            
        ]
    },
    {
      path:"quiz/quiz-instruction",
      element:<Instructions />
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
      path:"quiz/quiz-report",
      element:<GaurdRoute Component={ ScoreDashboard }/>
    },
    {
      path:"quiz/solution/:quizId",
      element:<GaurdRoute Component={ Solution } />,
      loader:async ({params})=>{
        const questions= await questionService.getQuestionsByQuizIdWithAnswer(params.quizId);
        return  questions.data;
      }
    }

  ]);
  

  export default router;