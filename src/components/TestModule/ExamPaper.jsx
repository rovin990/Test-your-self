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

  // console.log(questions)

  const [activeButton, setActiveButton] = useState(0); // when we click a particular question no button than activeButton=true
  
  const loggedInUser=JSON.parse(globalService.getUserDetails()); // loggedInUser details

  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [titleData,setTitleData] =useState(currentQuestion.title.split("#"));
  visitedQuestions.set(currentQuestion.id,"visited")
  const [checkedValue,setCheckedValue]=useState(''); //user selected value state variable
  
  const handleRadioChange=(event)=>{
    setCheckedValue(event.target.value);
    responseQuestions.set(currentQuestion.id,event.target.value)

    // console.log(responseQuestions)
  }


  function chnageCurrentQuestion(clickedQuestion,index){
    lastVisitedQuestionId=currentQuestion.id;
    setCurrentQuestion(clickedQuestion)                 // set current question
    setTitleData(clickedQuestion.title.split("#"))
    setActiveButton(index)                              //  apply color arrtirbute to clicked button
    currentQuestionIndex=index;                         //current question index
    visitedQuestions.set(clickedQuestion.id,"visited") //visited hashMap

    if(visitedQuestions.get(lastVisitedQuestionId)!==undefined){
      document.getElementById(lastVisitedQuestionId).style.backgroundColor='red';
    }
    if(visitedQuestions.get(clickedQuestion.id)!==undefined){
      document.getElementById(clickedQuestion.id).style.backgroundColor='#9c27b0';
    }
    
    if(responseQuestions.get(clickedQuestion.id)!==undefined){ 

      setCheckedValue(responseQuestions.get(clickedQuestion.id)) //setting checked option if user responded the value
    }

    console.log(currentQuestion)
  }

  const handleTestSubmit=()=>{
    quizService.submitUserTest(quiz.qid,quiz.title,responseQuestions).then(res=>{
      if(res.status===200){
        navigate("/quiz/quiz-report",{state:res.data})
      }
      console.log(res)
    })
    .catch(error=>{
      console.log("error")
    })
  }

  function actionOnTimeEnd(){
    handleTestSubmit()
  }

  function changePreviousQuestion(){
    lastVisitedQuestionId=questions[currentQuestionIndex].id;
    visitedQuestions.set(lastVisitedQuestionId,"visited")
    
    if(currentQuestionIndex===0){
      return;
    }
    else if(currentQuestionIndex>0){
      setCurrentQuestion(questions[currentQuestionIndex-1])
      setTitleData(questions[currentQuestionIndex-1].title.split("#"))
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
    console.log(currentQuestion)
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
      setTitleData(questions[currentQuestionIndex+1].title.split("#"))
      console.log(questions[currentQuestionIndex+1])
      currentQuestionIndex++;
    }
    setActiveButton(currentQuestionIndex)

    //console.log("visitedQuestions",visitedQuestions,"currentQuestionIndex ",questions[currentQuestionIndex])
    if(visitedQuestions.get(lastVisitedQuestionId)!==undefined){
      // console.log("visitedQuestion.get(visitedQuestion) ",visitedQuestions.get(lastVisitedQuestionId))
      document.getElementById(lastVisitedQuestionId).style.backgroundColor='red';
    }
    if(visitedQuestions.get(questions[currentQuestionIndex].id)!==undefined){ //current question is visited question
      document.getElementById(questions[currentQuestionIndex].id).style.backgroundColor='#9c27b0';
    }

    if(responseQuestions.get(questions[currentQuestionIndex].id)!==undefined){ 

      setCheckedValue(responseQuestions.get(questions[currentQuestionIndex].id)) //setting checked option if user responded the value
    }
    console.log(currentQuestion)
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
            <Button variant="outlined" className="mx-1">{new Date().getDate()+ "/"}{new Date().getMonth()+1+"/"}{new Date().getFullYear()}</Button>
            <Button variant="outlined" className="mx-1">Marks :{quiz.maxMark}</Button>
            <Button variant="outlined" className="mx-1 my-2">Questions :{quiz.noOfQuestion}</Button>
            </CardContent>
          </Card>
          
        </div>
        <div className="col-md-3 " >
            <div className="container text-center">
               <Timer examTimeInMins='10' width='150' actionOnTimeEnd={actionOnTimeEnd}/>
            </div>
        </div>
      </div>
      <div className="row">
      <div className="col-md-9 d-flex my-2">
                <Button variant="contained" size="small" color="primary" onClick={changePreviousQuestion} className="mx-1 btn">Previous</Button>
                <Button variant="contained" size="small" color="warning" className="mx-1 btn" onClick={changeClearResponse}>Clear Response</Button>
                <Button variant="contained" size="small" color="success" onClick={changeNextAndSaveQuestion} className="ms-auto mx-1 btn">Save & Next</Button>
      </div>
      </div>
      <div className="row">
        <div className="col-md-9">
          <Card >
            {titleData[0][0]!=="$" ? <CardHeader title={(currentQuestionIndex+1)+". "+titleData[0]} /> : <CardHeader title={(currentQuestionIndex+1)+". Statements"} />}
            {titleData[0][0]==="$" && <div>
                <ol>
                 {titleData[0].split("$")[0] && <li>{titleData[0].split("$")[0]}</li> }
                 {titleData[0].split("$")[1] && <li>{titleData[0].split("$")[1]}</li> }
                 {titleData[0].split("$")[2] && <li>{titleData[0].split("$")[2]}</li> }
                </ol>
            </div>}
            {currentQuestion.questionImage &&
            <div className='container text-center'>
                  <img className="img-fluid" src={`data:image/png;base64,`+currentQuestion.questionImage.data}  alt='Question '/>
                </div> }
            { titleData[1] && <div>
              <CardHeader title="Conclusion" />
                <ol>
                 {titleData[1] && <li>{titleData[1]}</li> }
                 {titleData[2] && <li>{titleData[2]}</li> }
                 {titleData[3] && <li>{titleData[3]}</li> }
                </ol>
            </div> }
            <Divider/>
            <div className="mx-3 my-3">
            <RadioGroup
              aria-labelledby="question-options"
              name={currentQuestion.id}
              value={checkedValue}
              onChange={handleRadioChange}
              
              className="ml-3"
            >
             <FormControlLabel className="my-3" value={currentQuestion.options.option1} control={<Radio />}
              label={currentQuestion.options.optionsImage?<img className="img-fluid" src={`data:image/png;base64,`+currentQuestion.options.optionsImage.option1}  alt='Question '/>:currentQuestion.options.option1} />
             <FormControlLabel className="my-3" value={currentQuestion.options.option2} control={<Radio />} 
             label={currentQuestion.options.optionsImage?<img className="img-fluid" src={`data:image/png;base64,`+currentQuestion.options.optionsImage.option2}  alt='Question '/>:currentQuestion.options.option2} />
             <FormControlLabel className="my-3" value={currentQuestion.options.option3} control={<Radio />} 
             label={currentQuestion.options.optionsImage?<img className="img-fluid" src={`data:image/png;base64,`+currentQuestion.options.optionsImage.option3}  alt='Question '/>:currentQuestion.options.option3} />
             <FormControlLabel className="my-3" value={currentQuestion.options.option4} control={<Radio />} 
             label={currentQuestion.options.optionsImage?<img className="img-fluid" src={`data:image/png;base64,`+currentQuestion.options.optionsImage.option4}  alt='Question '/>:currentQuestion.options.option4} />
            </RadioGroup>
            </div>
          </Card>
        </div>
        
        <div className="col-md-3 my-2">
          <Card className="container my-1">
            <CardHeader title="All Questions"/>
            <Divider />
              <div className="row mt-2">
              {questions.map((question,index)=>{
                      return <div key={question.id} className="col-3 col-md-3 mx-1  my-1">
                        <Button id={question.id} variant='outlined' color={activeButton === index ? "secondary" : "success"}  className="visited" onClick={()=>chnageCurrentQuestion(question,index)}>{index+1}</Button>
                      </div>
                    })}                
              </div>
              <div className="row my-2">
                <div className="col-md text-center">
                  <Button variant="outlined" color="success" onClick={handleTestSubmit}>Submit Test</Button>
                </div>
              </div>
          </Card>
        </div>
      </div>
      
    </div>
    {/* <div id="test-navigate-button" className="container">
        <div  className="row">
          <div className="col-md-9">
              <div  className="d-flex my-2" >
                <Button variant="contained" size="small" color="primary" onClick={changePreviousQuestion} className="mx-1 btn">Previous</Button>
                <Button variant="contained" size="small" color="warning" className="mx-1 btn" onClick={changeClearResponse}>Clear Response</Button>
                <Button variant="contained" size="small" color="success" onClick={changeNextAndSaveQuestion} className="ms-auto mx-1 btn">Save & Next</Button>
              </div>
          </div>
        </div>
    </div> */}
    </>
  )
}


export default ExamPaper;