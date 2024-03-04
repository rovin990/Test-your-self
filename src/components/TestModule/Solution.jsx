import React, { useEffect, useState } from 'react'
import { useLoaderData, useLocation } from 'react-router-dom';

import QuestionService from '../../services/QuestionService';
import GlobalService from "../../services/GlobalService";
import { green, red } from '@mui/material/colors';
import Navbar from '../Navbar';
import { Accordion, AccordionDetails, AccordionSummary, Button, Card, CardContent, CardHeader, Divider, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
const questionService= new QuestionService();
const globalService= new GlobalService();


let currentQuestionIndex=0;
let lastVisitedQuestionId=0;


function Solution() {
  const location = useLocation();
  const quiz= location.state[0];
  const responseData=new Map(location.state[1].map(obj => [obj.id, obj]));
  const questions=useLoaderData();
  const loggedInUser=JSON.parse(globalService.getUserDetails());
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [isViewSolution,setIsViewSolution] = useState(true);



  function handleRadioChange(event){
    const value= event.target.value;

    if(responseData.get(currentQuestion.id)!==undefined){
      if(responseData.get(currentQuestion.id)===value){
        console.log("you got correct and change color of current correct options")
      }
      else{
        console.log("you got wrong and change color of current correct options and also show what was he choose previousely and what is correct one")
      }
    }
    
  }


  function chnageCurrentQuestion(clickedQuestion,index){
    lastVisitedQuestionId=currentQuestion.id;
    setCurrentQuestion(clickedQuestion)                 // set current question
                                
    currentQuestionIndex=index;                         //current question index

  }


  function changePreviousQuestion(){
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

  function changeClearResponse(){
    // console.log(responseQuestions)
    // // responseQuestions.delete(questions[currentQuestionIndex].id);
    // setCheckedValue(null)
    // console.log(responseQuestions)
  }

  return (
    <>
    <Navbar />
    <div className="container" style={{marginTop:70+'px'}}>
      <div className="row">
        <div className="col-md-9 my-2" >
          <Card>
            <b style={{textDecoration:'underline'}}><CardHeader title={quiz.title} /></b>
            <CardContent>
            <Button variant="outlined" color="success" className="mx-1">{loggedInUser.name}</Button>
            <Button variant="outlined" className="mx-1">{new Date().getDate()+ "/"}{new Date().getMonth()+"/"}{new Date().getFullYear()}</Button>
            <Button variant="outlined" className="mx-1">maxMark :{quiz.maxMark}</Button>
            <Button variant="outlined" className="mx-1">noOfQuestion :{quiz.noOfQuestion}</Button>
            </CardContent>
          </Card>
          
        </div>
      </div>
      <div className="row">
        <div className="col-md-9">
          <Card style={{height:700+'px'}}>
            <CardHeader title={currentQuestion.title} />
            <Divider/>
            <div className="mx-3 my-3">
            {false ?
                <RadioGroup
                  aria-labelledby="question-options"
                  name={currentQuestion.id}
                  // value={checkedValue}
                  onChange={handleRadioChange}
                  
                  className="ml-3"
                >
                <FormControlLabel value={currentQuestion.options.option1} control={<Radio />} label={currentQuestion.options.option1} />
                <FormControlLabel value={currentQuestion.options.option2} control={<Radio />} label={currentQuestion.options.option2} />
                <FormControlLabel value={currentQuestion.options.option3} control={<Radio />} label={currentQuestion.options.option3} />
                <FormControlLabel value={currentQuestion.options.option4} control={<Radio />} label={currentQuestion.options.option4} />
                </RadioGroup>
              :
              <div>
                <div className='m-2 d-flex align-items-center'><p>{currentQuestion.options.option1}</p></div>
                <div className='correct m-2 d-flex align-items-center'><p>{currentQuestion.options.option2}</p></div>
                <div className='wrong m-2 d-flex align-items-center'><p>{currentQuestion.options.option3}</p></div>
                <div className='m-2 d-flex align-items-center'><p>{currentQuestion.options.option4}</p></div>
              </div>

          }
            </div>
            <div className='container mt-4'>
             {isViewSolution ?<span> <Button variant='outlined'  onClick={()=>setIsViewSolution(true)}>View Solution</Button> click here to see the answer</span>
                  : <h2>Solution</h2>}
            {/* <Accordion>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Button>View Solution</Button>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                  malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
              </AccordionDetails>
            </Accordion> */}
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
                <Button variant="contained" color="warning" className="mx-1" onClick={changeClearResponse}>Clear Response</Button>
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