import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { Button, Card, CardActions, CardContent, CardHeader } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import QuestionService from '../../../services/QuestionService';
import Model from '../../../utility/Model';


const questionServiceObj = new QuestionService();

const questemp=[{
  "id":1,
  "title":"What is Java?",
  "answerList":[
      {
          "explaination":"Java is object oriented programming language. which used widely for web application , desktop , mobile application"
      }
  ],
  "questionType":"descriptive",
  "options":{
      "option1":"OPP language.",
      "option2":"Widely used for web application",
      "option3":"Platform independent language.",
      "option4":"Platform independent language."
  },
  "examTags":["ssc","rbi","sbi","nicl"]
},
{
  "id":2,
  "title":"comparable vs coomparator ?",
  "answerList":[
      {
          "explaination":"comparable is used for sorting objects by natural sorting order . means comparable can only sort by it is define . but we can implement class for coomparator for different class variable and can pass to sort() method"
      }
  ],
  "questionType":"descriptive",
  "options":{
      "option1":"only one comparable can be used for a class while more than one coomparator can be used",
      "option2":"Widely used for web application",
      "option3":"Platform independent language."
  },
  "examTags":["ssc","rbi","sbi","nicl","google"]
}]

function ShowQuestions() {
  const [questions,setQuestions] = useState([]);
  const [responseMsg,setResponseMsg]=useState("")
  const [open,setOpen] =useState(false)
  const [color,setColor]=useState("");


  useEffect(()=>{
      loadQuestions()
  },[])

 function loadQuestions(){
  questionServiceObj.getQuestions("All").then(response=>{
          console.log(response)
          if(response.status==200){
              setQuestions(response.data)
          }
      }).catch(error=>{
          console.log(error)
      })
  }


  function deleteQuestion(questionId){
    questionServiceObj.deleteQuestion(questionId).then(response=>{
          setOpen(true)
          setResponseMsg(response.data)
          loadQuestions()
          setColor("success")
      }).catch(error=>{
              console.log(error)
              setOpen(true)
              setResponseMsg(error.data)
              setColor("warning")
      })        
  }

  function handleDialog(){
      setOpen(false)        
  }

  return (
      <div>
          <Model color={color} responseMsg={responseMsg} isOpen={open} handleDialog={handleDialog}/>
          <div className='container'>
              <CardHeader title="All Questions" />
          </div>
          {/* {console.log(questions) } */}
          {questions.map((question,index)=>{
          return( <Card key={question.id} className='my-3' style={{backgroundColor:'#f0f8ff'}}>
              
              <CardContent>
              <CardHeader title={question.title}/>
                  <ol>
                    {question.options.option1 &&<li>{question.options.option1}</li>}
                    {question.options.option2 &&<li>{question.options.option2}</li>}
                    {question.options.option3 &&<li>{question.options.option3}</li>}
                    {question.options.option4 &&<li>{question.options.option4}</li>}
                  </ol>
              </CardContent>
              <CardActions >
                <div className='container text-center mt-1'>
                    <Button variant='outlined' color='success' className='mx-1' onClick={()=>deleteQuestion(question.id)} startIcon={<DeleteIcon />}>delete</Button>
                </div> 
              </CardActions>
          </Card>)

      })}
      <div className='container text-center mt-1'>
            <Link to={"/admin/add-question"}>
                  <Button variant="contained" color='success' className='mx-1'>Add new questoin</Button>
            </Link>
      </div>    
      </div>
  
)
}

export default ShowQuestions;