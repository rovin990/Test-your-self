import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import { Button, Card, CardHeader, Divider } from '@mui/material';

import QuizService from '../../services/QuizService';

const quizService= new QuizService();


const quizCss={
  width:'30px',
  height:'30px',
  borderRadius: '100%',
}
function ScoreDashboard() {
  const location = useLocation();
  const quizAnalysis=location.state;

  const [quiz,setQuiz]=useState({});

  useEffect(()=>{
    quizService.getQuizzById(quizAnalysis.quizId).then(res=>{
      console.log(res)
      setQuiz(res.data)
    })
  },[])

  
  return (
    <>
      <Navbar />
      <div className='container-fluid' style={{marginTop:70+'px'}}>
        <div className='row'>
          <div className='col-md-8 offset-md-1'>
            <CardHeader title="Overall Performance Summary" titleTypographyProps={{variant:'h3', fontSize:1.125+'rem',fontWeight:400,lineHeight:1.75+'rem'}}/>
            <Divider />
            <Card>
              <div className='container'>
                <div className='row'>
                  <div className='col-md-3'>
                      <div className='container'>
                        <div className='row'>
                          <div className='col-md-3 d-flex align-items-center'>
                          <img  src={ process.env.PUBLIC_URL +'/images/category/high-score.png'} alt='quiz.png' style={quizCss}/>
                          
                          </div>
                          <div className='col-md-9 d-flex align-items-center'>
                            <CardHeader title={quizAnalysis.score+`/40`} subheader="Score" titleTypographyProps={{variant:'h6',fontSize:1+'rem'}} subheaderTypographyProps={{fontSize:0.8+'rem'}}/>
                          </div>
                        </div>
                      </div>
                  </div>
                  <div className='col-md-3'>
                      <div className='container'>
                        <div className='row'>
                          <div className='col-md-3 d-flex align-items-center'>
                          <img  src={ process.env.PUBLIC_URL +'/images/category/setting.png'} alt='quiz.png' style={quizCss}/>
                          </div>
                          <div className='col-md-9 d-flex align-items-center'>
                            <CardHeader title={quizAnalysis.attemptedQuestion+'/'+(quizAnalysis.attemptedQuestion+quizAnalysis.notAttemptedQuestion)
                            } subheader="Attempted" titleTypographyProps={{variant:'h6',fontSize:1+'rem'}} subheaderTypographyProps={{fontSize:0.8+'rem'}}/>
                            
                          </div>
                        </div>
                      </div>
                  </div>
                  <div className='col-md-3'>
                      <div className='container'>
                        <div className='row'>
                          <div className='col-md-3 d-flex align-items-center'>
                          <img  src={ process.env.PUBLIC_URL +'/images/category/dart-board.png'} alt='quiz.png' style={quizCss}/>
                          </div>
                          <div className='col-md-9 d-flex align-items-center'>
                            <CardHeader title={(quizAnalysis.score/(quizAnalysis.attemptedQuestion*(4)))*100+'%'} subheader="Accuracy" titleTypographyProps={{variant:'h6',fontSize:1+'rem'}} subheaderTypographyProps={{fontSize:0.8+'rem'}}/>
                            
                          </div>
                        </div>
                      </div>
                  </div>
                  <div className='col-md-3'>
                      <div className='container'>
                        <div className='row'>
                          <div className='col-md-3 d-flex align-items-center'>
                          <img  src={ process.env.PUBLIC_URL +'/images/category/document.png'} alt='quiz.png' style={quizCss}/>
                          </div>
                          <div className='col-md-9 d-flex align-items-center'>
                            <CardHeader title={quizAnalysis.wrongQuestion} subheader="Wrong" titleTypographyProps={{variant:'h6',fontSize:1+'rem'}} subheaderTypographyProps={{fontSize:0.8+'rem'}}/>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className='col-md-3 '>
            <CardHeader title="What you can next!" titleTypographyProps={{variant:'h3', fontSize:1.125+'rem',fontWeight:400,lineHeight:1.75+'rem'}}/>
            <Link to="/quiz/quiz-instruction" state={quiz}><Button variant='outlined' color='primary' className='mx-1 my-1'>Re-Attempt</Button></Link>
            <Link to={`/quiz/solution/`+quiz.qid} state={quizAnalysis.responses} ><Button variant='outlined' color='primary' className='mx-1 my-1'>Solution</Button> </Link>
            <Link to="/user/category/All" ><Button variant='outlined' color='primary' className='mx-1 my-1'>Tests</Button></Link>
          </div>
          
        </div>
      </div>
    </>
    
  )
}

export default ScoreDashboard;