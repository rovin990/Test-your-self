import { Button, Divider } from '@mui/material';
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Navbar from '../Navbar';

function Instructions() {
  const location = useLocation();
  const quiz= location.state;
  
  console.log(quiz)
  return (
    <>
    <Navbar />
    <div className='container' style={{marginTop:70+'px'}}>
        <h3>{ `General Instructions`.toLocaleUpperCase()}</h3>
        <div className='container text-center'>
          <b >Please read the instructions carefully</b>
        </div>
        <div className='container ml-2 mt-5'>
          <h5 style={{textDecoration:'underline'}}>General Instructions</h5>
          <ol>
          <li>This test is only for practice.</li>
          <li>Total duration of <b>{quiz.title}</b>  test is {quiz.noOfQuestion*2} Minutes.</li>
          <li>You can attempt test any number of times.</li>
          <li>There are <b>{quiz.noOfQuestion} questions</b> in this test.</li>
          <li>Each question carry <b>{(quiz.maxMark)/(quiz.noOfQuestion)} marks</b>. No nagetive marking for wrong one.</li>
          <li>All questions are MCQ type.</li>
          </ol>
          <Divider />
          <h5 style={{textDecoration:'underline'}}>Attempting Quiz</h5>
          <ol>
            <li>Click <b>Start Test</b> button to start the test.</li>
            <li>The time will start the moment you clicked the Start Test button.</li>
            <li>You can not resume the test. if intrupted.</li>
            <li>Click <b>Next</b> or <b>Question number</b> button to move next question.</li>
            <li>Click on submit button on compliation of test.</li>
            <li>Report will display under attemptted test section.</li>
          </ol>
        </div>
        <div className='container text-center'>
          <Link to={`/quiz/start/`+quiz.qid} state={quiz}><Button variant='contained' color='success'>Start Test</Button></Link>
        </div>
        
    </div>
    </>
  )
}

export default Instructions