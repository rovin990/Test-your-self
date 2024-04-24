import { Button, Card, CardContent, CardHeader } from '@mui/material';
import React from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'

import QuizService from '../../../services/QuizService';


const quizService = new QuizService();

function AttemptedQuiz() {
    const allAttemptedQuiz = useLoaderData();  
    console.log(allAttemptedQuiz)

    const navigate = useNavigate();

    function handleReAttempt(quizId){

      quizService.getQuizzById(quizId).then(response=>{
        navigate("/quiz/quiz-instruction",{state:response.data})
      }).catch(error=>{
        console.log(error)
      })

    }
  return (
    <div className='container'>
      <div  className='row'>
        <CardHeader title="All Attempted Quizzes"  titleTypographyProps={{variant:'h3', fontSize:1.125+'rem',fontWeight:400,lineHeight:1.75+'rem'}} />
        {allAttemptedQuiz.map(quizResponse=>{
            return <div className='col-md-9 offset-md-1 my-1' key={quizResponse.id}>
                      <Card style={{backgroundColor:'#f6f8f9'}}>
                        <CardHeader title={quizResponse.quizTitle} titleTypographyProps={{variant:'h4', fontSize:1.125+'rem',fontWeight:400,lineHeight:1.75+'rem'}}/>
                        <CardContent>
                          <Button className='mx-1'>Attempt :{quizResponse.attemptNo}</Button>
                          <Button className='mx-1'>correct :{quizResponse.correctQuestion+'/'+(quizResponse.attemptedQuestion+quizResponse.notAttemptedQuestion)}</Button>
                          <Button variant='outlined' color='primary' className='mx-1' onClick={()=>handleReAttempt(quizResponse.quizId)}>Re-Attempt</Button>
                          <Link to={`/quiz/solution/`+quizResponse.quizId+"/"+quizResponse.attemptNo} state={quizResponse.responses} ><Button variant='outlined' color='primary' className='mx-1'>Solution</Button> </Link>
                        </CardContent>
                      </Card>
                  </div>
        })} 
      </div>
    </div>
  )
}

export default AttemptedQuiz