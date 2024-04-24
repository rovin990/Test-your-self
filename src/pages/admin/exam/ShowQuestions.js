import React, {  useEffect, useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom';

import { Button, Card, CardActions, CardContent, CardHeader } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import QuestionService from '../../../services/QuestionService';
import Model from '../../../utility/Model';

const questionServiceObj = new QuestionService();




function ShowQuestions() {
  const allQuestions=useLoaderData();  
  const [questions,setQuestions] = useState(allQuestions);
  const [responseMsg,setResponseMsg]=useState("")
  const [open,setOpen] =useState(false)
  const [color,setColor]=useState("");

  console.log("All question",questions)
  


  useEffect(()=>{
    loadQuestions()    
  },[])




 function loadQuestions(){
  questionServiceObj.getQuestions("All").then(response=>{
          console.log("All question",response)
          if(response.status===200){
            let data=response.data;           
            setQuestions(data)
          }
      }).catch(error=>{
          console.log(error)
      })

  
  }

// function fileterQuestion(){
//   const questionHaveImage=questions.filter(item=>item.image).map(item=>item);
//     const leftQuestions=questions.filter(item=>(!item.image)).map(item=>item);
//     for(let i=0;i<questionHaveImage.length;i++){
//         questionServiceObj.getQuestionImage("question_"+questionHaveImage[i].id+"_"+questionHaveImage[i].image)
//         .then(imageRes=>{
//           questionHaveImage[i].imageData="data:image/png;base64,"+imageRes.data
//             if(i===questionHaveImage.length-1){
//                setIsLoaded(true);
//                setQuestions([...leftQuestions,...questionHaveImage]);
//                console.log("in fileter")
//             }
//           })
//     }
//     if(questionHaveImage.length===0)setIsLoaded(true)
// }


  function deleteQuestion(question){
    questionServiceObj.deleteQuestion(question.id).then(response=>{
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
          {questions.map((question,index)=>{
          return( <Card key={question.id} className='my-3' style={{backgroundColor:'#f0f8ff'}}>
            
              <CardHeader title={question.title}  /> 

              {question.questionImage && 
                <div className='container text-center'>
                  <img src={`data:image/png;base64,`+question.questionImage.data}  alt='Question '/>
                </div> }
              
              <CardContent>  
              <div className='container text-start' dangerouslySetInnerHTML={{__html:question.code}}/>            
                  <ol>
                    {question.options.option1 &&<li>{question.options.option1}</li>}
                    {question.options.option2 &&<li>{question.options.option2}</li>}
                    {question.options.option3 &&<li>{question.options.option3}</li>}
                    {question.options.option4 &&<li>{question.options.option4}</li>}
                  </ol>
              </CardContent>
              <CardActions >
                <div className='container text-center mt-1'>
                    <Button variant='outlined' color='success' className='mx-1' onClick={()=>deleteQuestion(question)} startIcon={<DeleteIcon />}>delete</Button>
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