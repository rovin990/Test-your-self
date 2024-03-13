import React, { useState } from 'react'
import {  useLoaderData, useLocation, useNavigate } from 'react-router-dom';


import GlobalService from "../../services/GlobalService";
import UserQuizService from '../../services/UserQuizService';

import { green, red } from '@mui/material/colors';
import Navbar from '../Navbar';
import {  Button, Card, CardContent, CardHeader, Divider, Radio } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check'


const globalService= new GlobalService();
const userQuizService = new UserQuizService();


let currentQuestionIndex=0;
let lastVisitedQuestionId=0;



function Solution() {
  const navigate= useNavigate();
  const location = useLocation();
  const responseData=new Map(location.state.map(obj => [obj.questionId, {answer:obj.answer,correctAnswer:obj.correctAnswer}]));
  
  const [questions,quiz]=useLoaderData();
  const allQuestionAnswer = new Map(questions.map(question=>[question.id,question.answer]));
  const loggedInUser=JSON.parse(globalService.getUserDetails());
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [isViewSolution,setIsViewSolution] = useState(false);

  const [selectedValue,setSelectedValue] = useState('');

  const [opetion1Choosen,setOpetion1Choosen] = useState(false)
  const [opetion2Choosen,setOpetion2Choosen] = useState(false)
  const [opetion3Choosen,setOpetion3Choosen] = useState(false)
  const [opetion4Choosen,setOpetion4Choosen] = useState(false)


  const [is1Correct,setIs1Correct] = useState(false)
  const [is2Correct,setIs2Correct] = useState(false)
  const [is3Correct,setIs3Correct] = useState(false)
  const [is4Correct,setIs4Correct] = useState(false)


  function handleRadioChange(event){
    const value= event.target.value;
    const chooseId=event.target.id;
    setSelectedValue(value)
  if(allQuestionAnswer.get(currentQuestion.id)===value && responseData.get(currentQuestion.id)!==undefined){
      switch(chooseId){
        case 'a':{          
          setIs1Correct(true)
          switch(responseData.get(currentQuestion.id).answer){
            case currentQuestion.options.option2 :{
              setOpetion2Choosen(true)
              break;
            }
            case currentQuestion.options.option3 :{
              setOpetion3Choosen(true)
              break;
            }
            case currentQuestion.options.option4:{
              setOpetion4Choosen(true)
              break;
            }
          }
          break;
        }
        case 'b':{
          console.log("setIs2Correct")
          setIs2Correct(true)
          console.log("responseData.get(currentQuestion.id).answer",responseData.get(currentQuestion.id).answer)
          switch(responseData.get(currentQuestion.id).answer){
            case currentQuestion.options.option1 :{
              setOpetion1Choosen(true)
              console.log("setOpetion1Choosen")
              break;
            }
            case currentQuestion.options.option3 :{
              setOpetion3Choosen(true)
              console.log("setOpetion3Choosen")
              break;
            }
            case currentQuestion.options.option4:{
              setOpetion4Choosen(true)
              console.log("setOpetion4Choosen")
              break;
            }
          }
          
          break;
        }
        case 'c':{
          setIs3Correct(true)
          switch(responseData.get(currentQuestion.id).answer){
            case currentQuestion.options.option2 :{
              setOpetion2Choosen(true)
              break;
            }
            case currentQuestion.options.option1 :{
              setOpetion1Choosen(true)
              break;
            }
            case currentQuestion.options.option4:{
              setOpetion4Choosen(true)
              break;
            }
          }
          console.log("setOpetion3Choosen")
          break;
        }
        default:{
          setIs4Correct(true)
          switch(responseData.get(currentQuestion.id).answer){
            case currentQuestion.options.option2 :{
              setOpetion2Choosen(true)
              break;
            }
            case currentQuestion.options.option3 :{
              setOpetion3Choosen(true)
              break;
            }
            case currentQuestion.options.option1:{
              setOpetion1Choosen(true)
              break;
            }
          }
          console.log("setOpetion4Choosen")
          break;
        }
      }
    }
    else{
      switch(chooseId){
        case 'a':{
          setOpetion1Choosen(true)
          switch(allQuestionAnswer.get(currentQuestion.id)){
            case currentQuestion.options.option1 :{
              setIs1Correct(true)
              break;
            }
            case currentQuestion.options.option2 :{
              setIs2Correct(true)
              break;
            }
            case currentQuestion.options.option3 :{
              setIs3Correct(true)
              break;
            }
            case currentQuestion.options.option4 :{
              setIs4Correct(true)
              break;
            }
          }
          break;
          
        }
        case 'b':{
          setOpetion2Choosen(true)
          switch(allQuestionAnswer.get(currentQuestion.id)){
            case currentQuestion.options.option1 :{
              setIs1Correct(true)
              break;
            }
            case currentQuestion.options.option2 :{
              setIs2Correct(true)
              break;
            }
            case currentQuestion.options.option3 :{
              setIs3Correct(true)
              break;
            }
            case currentQuestion.options.option4:{
              setIs4Correct(true)
              break;
            }
          }
          break;
          
        }
        case 'c':{
          setOpetion3Choosen(true)
          switch(allQuestionAnswer.get(currentQuestion.id)){
            
            case currentQuestion.options.option1 :{
              setIs1Correct(true)
              break;
            }
            case currentQuestion.options.option2:{
              setIs2Correct(true)
              break;
            }
            case currentQuestion.options.option3:{
              setIs3Correct(true)
              break;
            }
            case currentQuestion.options.option4 :{
              setIs4Correct(true)
              break;
            }
          }
          break;
          
        }
        default:{
          setOpetion4Choosen(true)
          switch(allQuestionAnswer.get(currentQuestion.id)){
            case currentQuestion.options.option2 :{
              setIs2Correct(true)
              break;
            }
            case currentQuestion.options.option3 :{
              setIs3Correct(true)
              break;
            }
            case currentQuestion.options.option1:{
              setIs1Correct(true)
              break;
            }
            case currentQuestion.options.option4:{
              setIs4Correct(true)
              break;
            }
          }
          break;
          
        }
      }
    }
    setIsViewSolution(true)
  }

  function resetAllValue(){
    setOpetion1Choosen(false)
    setOpetion2Choosen(false)
    setOpetion3Choosen(false)
    setOpetion4Choosen(false)


    setIs1Correct(false)
    setIs2Correct(false)
    setIs3Correct(false)
    setIs4Correct(false)

    setIsViewSolution(false)

  }
  function chnageCurrentQuestion(clickedQuestion,index){
    lastVisitedQuestionId=currentQuestion.id;
    setCurrentQuestion(clickedQuestion)                 // set current question
                           
    currentQuestionIndex=index;                         //current question index

    resetAllValue()

  }


  function changePreviousQuestion(){
    resetAllValue()
    lastVisitedQuestionId=questions[currentQuestionIndex].id;
    
    if(currentQuestionIndex===0){
      return;
    }
    else if(currentQuestionIndex>0){
      setCurrentQuestion(questions[currentQuestionIndex-1])
      currentQuestionIndex--;
    }
    
  }

  function changeNextAndSaveQuestion(){
    resetAllValue()
    lastVisitedQuestionId=questions[currentQuestionIndex].id;
    
    if(currentQuestionIndex===questions.length-1){
      // console.log("full ",questions[currentIndex])
      return;
    }
    else{
      setCurrentQuestion(questions[currentQuestionIndex+1])
      console.log(questions[currentQuestionIndex+1])
      currentQuestionIndex++;
    }
  }


  function handleRighClick(){
    return false;
  }


  function handleOnClickForScore(){
    userQuizService.getQuizResponseByQuizId(quiz.qid).then(res=>{
      console.log(res)
      navigate("/quiz/quiz-report",{state:res.data})
    }).catch(error=>{
      console.log("error",error)
    })
  }

  return (
    <>
    <Navbar />
    <div className="container" style={{marginTop:70+'px'}} onContextMenu={handleRighClick} >
      <div className="row">
        <div className="col-md-9 my-2" >
          <Card>
            <b style={{textDecoration:'underline'}}><CardHeader title={quiz.title} /></b>
            <CardContent>
            <Button variant="outlined" color="success" className="mx-1">{loggedInUser.name}</Button>
            <Button variant="outlined" className="mx-1">{new Date().getDate()+ "/"}{new Date().getMonth()+1+"/"}{new Date().getFullYear()}</Button>
            <Button variant="outlined" className="mx-1">maxMark :{quiz.maxMark}</Button>
            <Button variant="outlined" className="mx-1">noOfQuestion :{quiz.noOfQuestion}</Button>
            </CardContent>
          </Card>
          
        </div>
        <div className='col-md-3 my-2'>
          <Card>
          <Button variant='outlined' color='primary' className='mx-1' onClick={handleOnClickForScore}>Score-Dashboard</Button>
          <Divider/>

          </Card>
          
        </div>
      </div>
      <div className="row">
        <div className="col-md-9">
          <Card style={{height:700+'px'}}>
            <CardHeader title={(currentQuestionIndex+1)+". "+currentQuestion.title} />
            <Divider/>
            <div className="mx-3 my-3">
            {!isViewSolution ?              
              <div>
              <div><Radio id='a' checked={selectedValue === currentQuestion.options.option1 } onChange={handleRadioChange} value={currentQuestion.options.option1} name="options" inputProps={{ 'aria-label': 'A' }} /><span>{currentQuestion.options.option1}</span></div>
              <div><Radio id='b' checked={selectedValue === currentQuestion.options.option2 } onChange={handleRadioChange} value={currentQuestion.options.option2} name="options" inputProps={{ 'aria-label': 'A' }} /><span>{currentQuestion.options.option2}</span></div>
              <div><Radio id='c' checked={selectedValue === currentQuestion.options.option3 } onChange={handleRadioChange} value={currentQuestion.options.option3} name="options" inputProps={{ 'aria-label': 'A' }} /><span>{currentQuestion.options.option3}</span></div>
              <div><Radio id='d' checked={selectedValue === currentQuestion.options.option4 } onChange={handleRadioChange} value={currentQuestion.options.option4} name="options" inputProps={{ 'aria-label': 'A' }} /><span>{currentQuestion.options.option4}</span></div>
              </div>
              :
              <div className='d-flex flex-column justify-content-evenly'>
                <div id='a' className={is1Correct?'correct':(opetion1Choosen?'wrong':'')}><p><span>{(is1Correct?<CheckIcon />:opetion1Choosen?<CloseIcon  />:'')}</span>{currentQuestion.options.option1}</p></div>
                <div id='b' className={is2Correct?'correct':(opetion2Choosen?'wrong':'')}><p><span>{(is2Correct?<CheckIcon />:opetion2Choosen?<CloseIcon  />:'')}</span>{currentQuestion.options.option2}</p></div>
                <div id='c' className={is3Correct?'correct':(opetion3Choosen?'wrong':'')}><p><span>{(is3Correct?<CheckIcon />:opetion3Choosen?<CloseIcon  />:'')}</span>{currentQuestion.options.option3}</p></div>
                <div id='d' className={is4Correct?'correct':(opetion4Choosen?'wrong':'')}><p><span>{(is4Correct?<CheckIcon />:opetion4Choosen?<CloseIcon  />:'')}</span>{currentQuestion.options.option4}</p></div>
              </div>
            }
            </div>
            <div className='container mt-4'>
             { !isViewSolution ?<span> <Button variant='outlined'  onClick={()=>setIsViewSolution(true)}>View Solution</Button> click here to see the answer</span>
                : 
                  
                <div>
                  <Card>
                    <CardHeader title="Solution & Explanation" titleTypographyProps={{variant:'h6',fontSize:1+'rem'}} />
                    <CardContent>
                        {currentQuestion.explanation}
                    </CardContent>
                  </Card>
                </div>  }
             </div>
          </Card>

        </div>
        
        <div className="col-md-3">
          <Card>
            <CardHeader title="All Questions"/>
            <Divider />
            <div className="container my-1">
              <div className="row">
              {questions.map((question,index)=>{
                      return <div key={question.id} className="col-md-3 mx-1 my-1">
                        <Button id={question.id} variant='contained' style={{backgroundColor:responseData.get(question.id)!==undefined?red.A200:green[800]}}   onClick={()=>chnageCurrentQuestion(question,index)}>{index+1}</Button>
                      </div>
                    })}                
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
    <div id="test-navigate-button" className="container">
        <div  className="row">
          <div className="col-md-9">
            <Card>
            <Divider />
              <div  className="d-flex my-2" >
                <Button variant="contained" color="primary" onClick={changePreviousQuestion} className="mx-1">Previous</Button>
                
                <Button variant="contained" color="success" onClick={changeNextAndSaveQuestion} className="ms-auto mx-1">Save & Next</Button>
              </div>
            </Card>
          </div>
        </div>
    </div>
    </>
  )
}

export default Solution