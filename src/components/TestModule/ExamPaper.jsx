import React, {  useState } from "react";
import Timer from "../../utility/Timer"
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { Button, Card, CardContent, CardHeader, Divider, FormControlLabel, Radio, RadioGroup } from "@mui/material";

import QuizService from "../../services/QuizService";
import GlobalService from "../../services/GlobalService";
import Navbar from "../Navbar";

const quizService = new QuizService();
const globalService= new GlobalService();
const responseQuestions=new Map()
const visitedQuestions=new Map();

let currentQuestionIndex=0;
let lastVisitedQuestionId=0;



function ExamPaper() {
  const navigate = useNavigate();
  const location = useLocation();
  const quiz= location.state;
  const questions=useLoaderData();

  const [activeButton, setActiveButton] = useState(0); // when we click a particular question no button than activeButton=true
  
  const loggedInUser=JSON.parse(globalService.getUserDetails()); // loggedInUser details

  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  visitedQuestions.set(currentQuestion.id,"visited")
  const [checkedValue,setCheckedValue]=useState(''); //user selected value state variable
  
  const handleRadioChange=(event)=>{
    setCheckedValue(event.target.value);
    responseQuestions.set(currentQuestion.id,event.target.value)

    // console.log(responseQuestions)
  }

  // useEffect(()=>{
  //   window.history.pushState(null, document.title, window.location.href);
  //   window.addEventListener('popstate', function (event){
  //       window.history.pushState(null, document.title,  window.location.href);
  //   });
  // },[])

  function chnageCurrentQuestion(clickedQuestion,index){
    lastVisitedQuestionId=currentQuestion.id;
    setCurrentQuestion(clickedQuestion)                 // set current question
    setActiveButton(index)                              //  apply color arrtirbute to clicked button
    currentQuestionIndex=index;                         //current question index
    visitedQuestions.set(clickedQuestion.id,"visited") //visited hashMap

    //console.log("visitedQuestion.get(visitedQuestion) before check",visitedQuestions.get(lastVisitedQuestionId))
    if(visitedQuestions.get(lastVisitedQuestionId)!==undefined){
      // console.log("visitedQuestion.get(visitedQuestion) ",visitedQuestions.get(lastVisitedQuestionId))
      document.getElementById(lastVisitedQuestionId).style.backgroundColor='red';
    }
    if(visitedQuestions.get(clickedQuestion.id)!==undefined){
      document.getElementById(clickedQuestion.id).style.backgroundColor='#9c27b0';
    }
    // console.log("visitedQuestion :",visitedQuestions)
    // console.log("lastVisitedQuestionId :",lastVisitedQuestionId,"currentQuestionId :",cq.id)
    
    // console.log(document.getElementById(cq.id))
   // console.log("responseQuestions.get(clickedQuestion.id)",responseQuestions.get(clickedQuestion.id),"clickedQuestion.id ",clickedQuestion.id)
    if(responseQuestions.get(clickedQuestion.id)!==undefined){ 

      setCheckedValue(responseQuestions.get(clickedQuestion.id)) //setting checked option if user responded the value
    }
  }

  const handleTestSubmit=()=>{
    quizService.submitUserTest(quiz.qid,responseQuestions).then(res=>{
      if(res.status===200){
        navigate("/quiz/quiz-report",{state:res.data})
      }
      console.log(res)
    })
    .catch(error=>{
      console.log("error")
    })
  }

  function changePreviousQuestion(){
    lastVisitedQuestionId=questions[currentQuestionIndex].id;
    visitedQuestions.set(lastVisitedQuestionId,"visited")
    
    if(currentQuestionIndex===0){
      return;
    }
    else if(currentQuestionIndex>0){
      setCurrentQuestion(questions[currentQuestionIndex-1])
      currentQuestionIndex--;
    }
    setActiveButton(currentQuestionIndex)
     //visited hashMap
    //console.log("visitedQuestions",visitedQuestions,"currentQuestionIndex ",questions[currentQuestionIndex])
     if(visitedQuestions.get(lastVisitedQuestionId)!==undefined){
      // console.log("visitedQuestion.get(visitedQuestion) ",visitedQuestions.get(lastVisitedQuestionId))
      document.getElementById(lastVisitedQuestionId).style.backgroundColor='red';
    }
    if(visitedQuestions.get(questions[currentQuestionIndex].id)!==undefined){
      document.getElementById(questions[currentQuestionIndex].id).style.backgroundColor='#9c27b0';
    }

    if(responseQuestions.get(questions[currentQuestionIndex].id)!==undefined){ 

      setCheckedValue(responseQuestions.get(questions[currentQuestionIndex].id)) //setting checked option if user responded the value
    }
    // console.log(currentIndex)
  }

  function changeNextAndSaveQuestion(){
    lastVisitedQuestionId=questions[currentQuestionIndex].id;
    visitedQuestions.set(lastVisitedQuestionId,"visited")
    
    if(currentQuestionIndex===questions.length-1){
      // console.log("full ",questions[currentIndex])
      return;
    }
    else{
      setCurrentQuestion(questions[currentQuestionIndex+1])
      console.log(questions[currentQuestionIndex+1])
      currentQuestionIndex++;
    }
    setActiveButton(currentQuestionIndex)

    //console.log("visitedQuestions",visitedQuestions,"currentQuestionIndex ",questions[currentQuestionIndex])
    if(visitedQuestions.get(lastVisitedQuestionId)!==undefined){
      // console.log("visitedQuestion.get(visitedQuestion) ",visitedQuestions.get(lastVisitedQuestionId))
      document.getElementById(lastVisitedQuestionId).style.backgroundColor='red';
    }
    if(visitedQuestions.get(questions[currentQuestionIndex].id)!==undefined){
      document.getElementById(questions[currentQuestionIndex].id).style.backgroundColor='#9c27b0';
    }

    if(responseQuestions.get(questions[currentQuestionIndex].id)!==undefined){ 

      setCheckedValue(responseQuestions.get(questions[currentQuestionIndex].id)) //setting checked option if user responded the value
    }
    // console.log(currentIndex)
  }

  function changeClearResponse(){
    console.log(responseQuestions)
    responseQuestions.delete(questions[currentQuestionIndex].id);
    setCheckedValue(null)
    console.log(responseQuestions)
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
        <div className="col-md-3" >
        <Timer examTimeInMins='10' width='200'/>
        </div>
      </div>
      <div className="row">
        <div className="col-md-9">
          <Card style={{height:700+'px'}}>
            <CardHeader title={currentQuestion.title} />
            <Divider/>
            <div className="mx-3 my-3">
            <RadioGroup
              aria-labelledby="question-options"
              name={currentQuestion.id}
              value={checkedValue}
              onChange={handleRadioChange}
              
              className="ml-3"
            >
             <FormControlLabel value={currentQuestion.options.option1} control={<Radio />} label={currentQuestion.options.option1} />
             <FormControlLabel value={currentQuestion.options.option2} control={<Radio />} label={currentQuestion.options.option2} />
             <FormControlLabel value={currentQuestion.options.option3} control={<Radio />} label={currentQuestion.options.option3} />
             <FormControlLabel value={currentQuestion.options.option4} control={<Radio />} label={currentQuestion.options.option4} />
            </RadioGroup>
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
                        <Button id={question.id} variant='contained' color={activeButton === index ? "secondary" : "success"}  className="visited" onClick={()=>chnageCurrentQuestion(question,index)}>{index+1}</Button>
                      </div>
                    })}                
              </div>
              <div className="row">
                <div className="col-md text-center">
                  <Button variant="outlined" color="success" onClick={handleTestSubmit}>Submit Test</Button>
                </div>
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


export default ExamPaper;