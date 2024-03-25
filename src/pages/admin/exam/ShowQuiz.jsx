import { Button, Card, CardActions, CardContent, CardHeader } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import QuizService from "../../../services/QuizService";
import Model from '../../../utility/Model';

const quizServiceObj = new QuizService();


function ShowQuiz() {
    const [quizzes,setQuizzes] = useState([]);
    const [responseMsg,setResponseMsg]=useState("")
    const [open,setOpen] =useState(false)


    useEffect(()=>{
        loadQuizzes()
    },[])

   function loadQuizzes(){
        quizServiceObj.getQuizz("All").then(response=>{
            console.log(response)
            if(response.status==200){
                setQuizzes(response.data)
            }
        }).catch(error=>{
            console.log(error)
        })
    }


    function deleteQuiz(quizId){
        quizServiceObj.deleteQuiz(quizId).then(response=>{
            setOpen(true)
            setResponseMsg(response.data)
            loadQuizzes()
            
           // console.log(response.data)
        }).catch(error=>{
                console.log(error)
        })        
    }

    function handleDialog(){
        setOpen(false)        
    }
  
    return (
    <div>
        <Model color="warning" responseMsg={responseMsg} isOpen={open} handleDialog={handleDialog}/>
        <div className='container'>
            <CardHeader title="All Quizzes" />
        </div>
        {quizzes.map(quiz=>{
        return( <Card key={quiz.qid} className='container my-3' style={{backgroundColor:'#f0f8ff'}}>
            <CardHeader title={quiz.title} subheader={quiz.description}/>
            <CardContent>
                <p>{quiz.description}</p>
            </CardContent>
            <CardActions>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-2 col-xs-auto my-sm-2'>
                            <Link to={"show-questions"}>
                                <Button variant="contained" color='success'  className='mx-1'>Questions</Button>
                            </Link>
                        </div>
                        <div className='col-md-2 col-xs-auto my-sm-2'>
                            <Button  color='secondary'  className='mx-1 ' >Maxs_Marks : {quiz.maxMark}</Button>
                         </div>
                        <div className='col-md-2 col-xs-auto my-sm-2'>
                            <Button  color='secondary' className='mx-1'   >Questions : {quiz.noOfQuestion}</Button>
                        </div>
                        <div className='col-md-2 col-xs-auto my-sm-2'>
                            <Button  color='secondary' className='mx-1' >Attempts</Button>               
                        </div>
                        <div className='col-md-2 col-xs-auto my-sm-2'>
                            <Link to={"/admin/update-quiz"} state={quiz}>
                                <Button variant="contained" color='success' className='mx-1' >Update</Button>
                            </Link>                
                        </div>
                        <div className='col-md-2 col-xs-auto my-sm-2'>
                            <Button variant="contained" color='success' className='mx-1' onClick={()=>deleteQuiz(quiz.qid)} startIcon={<DeleteIcon />}>Delete</Button>                
                        </div>
                    </div>
                </div>
                
            </CardActions>
        </Card>)

    })}
    <div className='container text-center mt-1'>
           <Link to={"/admin/add-quiz"}>
                <Button variant="contained" color='success' className='mx-1'>Add new quiz</Button>
           </Link>
    </div>    
    </div>
    
    
  )
}

export default ShowQuiz;