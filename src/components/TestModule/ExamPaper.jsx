import React, {  useState } from "react";
import Timer from "../../utility/Timer"
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { Button, Card, CardContent, CardHeader, Divider, FormControlLabel, Radio, RadioGroup } from "@mui/material";

import Swal from "sweetalert2"

import QuizService from "../../services/QuizService";
import GlobalService from "../../services/GlobalService";
import Navbar from "../Navbar";



const quizService = new QuizService();
const globalService= new GlobalService();

const responseQuestions=new Map()
const visitedQuestions=new Map();
const answeredQuestions=new Map();
const notAnsweredQuestions=new Map();


let currentQuestionIndex=0;
let lastVisitedQuestionId=0;



function ExamPaper() {
  const navigate = useNavigate();
  const location = useLocation();
  const quiz= location.state;
  const questions=useLoaderData();

  // console.log(questions)

  const [activeButton, setActiveButton] = useState(0); // when we click a particular question number button than activeButton=true
  
  const loggedInUser=JSON.parse(globalService.getUserDetails()); // loggedInUser details

  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [titleData,setTitleData] =useState(currentQuestion.title.split("#"));
  visitedQuestions.set(currentQuestion.id,"visited")
  lastVisitedQuestionId=currentQuestion.id;
  const [checkedValue,setCheckedValue]=useState(''); //user selected value state variable


  
  
  const handleRadioChange=(event)=>{
    setCheckedValue(event.target.value);
    responseQuestions.set(currentQuestion.id,event.target.value)

    // console.log(responseQuestions)
  }

  function currentQuestionStyle(lastVisitedQuestionId,color){
    console.log("Before updating",document.getElementById(lastVisitedQuestionId).style)
    document.getElementById(lastVisitedQuestionId).style.removeProperty('background-color')
    document.getElementById(lastVisitedQuestionId).style.backgroundColor=color;
    document.getElementById(lastVisitedQuestionId).style.removeProperty('height')
    document.getElementById(lastVisitedQuestionId).style.height='30px';
    document.getElementById(lastVisitedQuestionId).style.removeProperty('width')
    document.getElementById(lastVisitedQuestionId).style.width='45px';
    document.getElementById(lastVisitedQuestionId).style.removeProperty('border-radius')
    document.getElementById(lastVisitedQuestionId).style.borderRadius='100x 100px 100px 100px';
    document.getElementById(lastVisitedQuestionId).style.removeProperty('border')
    document.getElementById(lastVisitedQuestionId).style.border='1px black solid';
    document.getElementById(lastVisitedQuestionId).style.removeProperty('color')
    
    console.log("after updating",document.getElementById(lastVisitedQuestionId).style)

  }

  function changeCurrentQuestion(clickedQuestion,index){
    // checking clicked question already visited or not. if so applying style according to visite status
    if(answeredQuestions.get(clickedQuestion.id)!==undefined)currentQuestionStyle(clickedQuestion.id,"green")
    if(notAnsweredQuestions.get(clickedQuestion.id)!==undefined)currentQuestionStyle(clickedQuestion.id,"red")

    // updating current qustion with clicked one
    setCurrentQuestion(clickedQuestion);
    // spliting question title for syllosim type questions
    setTitleData(clickedQuestion.title.split("#"))
   

    if(answeredQuestions.get(questions[currentQuestionIndex].id)===undefined){
      console.log("inside if block")
      notAnswerQuestionStyle(questions[currentQuestionIndex].id)
      notAnsweredQuestions.set(questions[currentQuestionIndex].id,questions[currentQuestionIndex])
    }else{
      console.log("inside else block")
      answerQuestionStyle(questions[currentQuestionIndex].id)
    }

     // enable current question active
     setActiveButton(index)

    //current question index
    currentQuestionIndex=index;                         

    //mark current question visited
    visitedQuestions.set(clickedQuestion.id,"visited")

    console.log("visitedQuestions",visitedQuestions)
    
    // checking and setting responded option
    if(responseQuestions.get(clickedQuestion.id)!==undefined){ 

      setCheckedValue(responseQuestions.get(clickedQuestion.id)) //setting checked option if user responded the value
    }

    
  }

  const handleTestSubmit=()=>{
    // console.log(answeredQuestions)
    quizService.submitUserTest(quiz.qid,quiz.title,answeredQuestions).then(res=>{
      if(res.status===200){
        navigate("/quiz/quiz-report/1",{state:res.data})
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


  function answerQuestionStyle(lastVisitedQuestionId){
    document.getElementById(lastVisitedQuestionId).style.backgroundColor='green';
    document.getElementById(lastVisitedQuestionId).style.height='30px';
    document.getElementById(lastVisitedQuestionId).style.width='45px';
    document.getElementById(lastVisitedQuestionId).style.borderRadius='150px 150px 0 0';
    document.getElementById(lastVisitedQuestionId).style.color='white';
  }

  function notAnswerQuestionStyle(lastVisitedQuestionId){
    document.getElementById(lastVisitedQuestionId).style.backgroundColor='red';
    document.getElementById(lastVisitedQuestionId).style.height='30px';
    document.getElementById(lastVisitedQuestionId).style.width='45px';
    document.getElementById(lastVisitedQuestionId).style.borderRadius='0px 0px 150px 150px';
    document.getElementById(lastVisitedQuestionId).style.color='white';
  }

  function changeNextAndSaveQuestion(){  
    lastVisitedQuestionId=questions[currentQuestionIndex].id;
    visitedQuestions.set(lastVisitedQuestionId,"visited")
    // console.log(responseQuestions.get(lastVisitedQuestionId))
    //check for  answered question
    if(responseQuestions.get(lastVisitedQuestionId)!==undefined){
      answeredQuestions.set(lastVisitedQuestionId,responseQuestions.get(lastVisitedQuestionId))
      //if current question was visited but not answered
      notAnsweredQuestions.delete(lastVisitedQuestionId)
      console.log(answeredQuestions)
    }else{
      notAnsweredQuestions.set(lastVisitedQuestionId,currentQuestion)
      console.log(notAnsweredQuestions.length)
    }
    
    
    if(currentQuestionIndex===questions.length-1){
      const SweetAlertResult= Swal.fire({
        title:'info',
        text:"You have reached last question . do you want to got first question ?",
        icon:"info",          
        showDenyButton:true,
        denyButtonColor:'#ed6c02',
        showConfirmButton:true,
        confirmButtonText:"Yes",
        confirmButtonColor:"#0288d1"

      }
      )

      SweetAlertResult.then(result=>{
        if(responseQuestions.get(lastVisitedQuestionId)!==undefined){ 
          answerQuestionStyle(lastVisitedQuestionId)        
         
        }else{
          notAnswerQuestionStyle(lastVisitedQuestionId)
        }

        if(result.isConfirmed)changeCurrentQuestion(questions[0],0)
        else return;
      })
      
    }
    else{
      changeCurrentQuestion(questions[currentQuestionIndex+1],currentQuestionIndex+1)
    }
    setActiveButton(currentQuestionIndex)

    // performing action for saved question button 
    console.log(visitedQuestions.get(lastVisitedQuestionId))
    if(visitedQuestions.get(lastVisitedQuestionId)!==undefined){
      if(responseQuestions.get(lastVisitedQuestionId)!==undefined){ 
        answerQuestionStyle(lastVisitedQuestionId)
      }else{
        notAnswerQuestionStyle(lastVisitedQuestionId)
      }
    }
    if(responseQuestions.get(questions[currentQuestionIndex].id)!==undefined){ 

      setCheckedValue(responseQuestions.get(questions[currentQuestionIndex].id)) //setting checked option if user responded the value
    }
  }

  function changeClearResponse(){
    console.log(responseQuestions)
    responseQuestions.delete(questions[currentQuestionIndex].id);
    setCheckedValue(null)
    answeredQuestions.delete(questions[currentQuestionIndex].id);
    notAnsweredQuestions.set(questions[currentQuestionIndex].id,questions[currentQuestionIndex])
    notAnswerQuestionStyle(questions[currentQuestionIndex].id)
    console.log(responseQuestions)
  }

  return (
    <>
    <Navbar />
    <div className="container-fluid" style={{marginTop:70+'px'}}>
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

          <section className="d-flex my-2">
                {/* <Button variant="contained" size="small" color="primary" onClick={markForReviewAndNext} className="mx-1 btn">Mark for Review & Next</Button> */}
                <Button variant="contained" size="small" color="warning" className="mx-1 btn" onClick={changeClearResponse}>Clear Response</Button>
                <Button variant="contained" size="small" color="success" onClick={changeNextAndSaveQuestion} className="ms-auto mx-1 btn">Save & Next</Button>
          </section>

          <section>
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
            <div className='container text-start' dangerouslySetInnerHTML={{__html:currentQuestion.code}}/>
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
          </section>
          
        </div>
        
        <div className="col-md-3 bg-columbia-blue" >
            <section className="container text-end">
               <Timer examTimeInMins={quiz.noOfQuestion*2} width='auto' actionOnTimeEnd={actionOnTimeEnd}/>
            </section>
            <Divider />

            <section className="d-flex mt-2 mx-3">
                    <button className="btn btn-answer" >{answeredQuestions.size}</button><i className="mx-1">Answered</i>
                    <button className="btn btn-not-visited">{questions.length-visitedQuestions.size}</button><i className="mx-1">Not Visited</i>
                    <button className="btn btn-not-answered">{notAnsweredQuestions.size}</button><i>Not Answered</i>
            </section>
            <Divider />
            <section className="my-2">
              <div className="container my-1">
                <CardHeader title="All Questions"/>
                
                  <div className="row mt-2 p-4">
                  {questions.map((question,index)=>{
                          return <div key={question.id} className="col-2 col-md-2 my-1 mx-1">
                            <button id={question.id}  className={activeButton===index?'btn  btn-current':'btn btn-outline-secondary'}  onClick={()=>changeCurrentQuestion(question,index)}  style={{height:30+'px',width:45+'px'}}>{index+1}</button>
                          </div>
                        })}                
                  </div>
                  <div className="row my-2">
                    <div className="col-md text-center">
                      <Button variant="outlined" color="success" onClick={handleTestSubmit}>Submit Test</Button>
                    </div>
                  </div>
              </div>
            </section>
        </div>
      </div>
      
      
    </div>
    </>
  )
}


export default ExamPaper;