import { Avatar, Card, CardContent, CardHeader} from '@mui/material';
import { blue,orange, red } from '@mui/material/colors';
import React, { useEffect, useState } from 'react'
import { Link, useParams} from 'react-router-dom'
import ReadMore from '../../../utility/ReadMore';

import QuizService from '../../../services/QuizService'; 

const quizServiceObj = new QuizService();



const quizCss={
    width:'50px',
    height:'50px',
    borderRadius: '100%',
}


function ShowQuizzes() {
    const [quizess,setQuizzes] = useState([]);
    const routeParams = useParams();
    console.log(routeParams.category)
    useEffect(()=>{
        loadQuiz()
    },[routeParams])

   function loadQuiz(){
        if(routeParams.category!=="All"){
            quizServiceObj.getCategoryActiveQuizzes(routeParams.category).then(response=>{
                setQuizzes(response.data)
            }).catch(error=>{
                console.log(error)
            })
        }
        else{
            quizServiceObj.getActiveQuizzes().then(response=>{
                setQuizzes(response.data)
            }).catch(error=>{
                console.log(error)
            })
        }
    }
  return (
    <div className='container-fluid' style={{backgroundColor:'#f0f8ff'}}>
        <div className='row '>
            <h3>{"Available "+routeParams.category+ " Quiz"}</h3>
            {quizess.map(quiz=>{
                return <div className='col-md-4'>
                    <Card className='mb-3'>
                    <CardHeader avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    <img src={ process.env.PUBLIC_URL +'/images/category/quiz.png'} alt='quiz.png' style={quizCss}/></Avatar> }
                        title={quiz.title}
                        subheader="September 14, 2016"
                    />
                    <CardContent>
                        <ReadMore text={quiz.description} displayCount='30'/>
                    </CardContent>
                    <div className='container pb-2' style={{margin:0}}>
                        <Link to="/quiz/quiz-instruction" state={quiz} className='mx-1 read-or-hide' style={{textDecoration:'none',color:blue[900]}}>View</Link>
                        <Link to="/quiz/quiz-instruction" state={quiz} className='mx-1 read-or-hide' style={{textDecoration:'none',color:orange[900]}}>Start</Link>
                    </div>
                    </Card>
                </div>
            })}
        </div>
    </div>
  )
}

export default ShowQuizzes