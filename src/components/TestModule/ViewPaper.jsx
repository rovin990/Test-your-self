import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

import {Button, Card, CardContent, CardHeader, Divider, FormControlLabel} from "@mui/material"

import QuestionService from "../../services/QuestionService"
import GlobalService from "../../services/GlobalService";


const _questionService = new QuestionService();
const _globalService = new GlobalService();

function ViewPaper() {
    const location = useLocation();
    const quiz= location.state;
    console.log(quiz)
    const [allQuestion,setAllQuestion] = useState([])
    const loggedInUser=JSON.parse(_globalService.getUserDetails()); // loggedInUser details

    useEffect(()=>{
        _questionService.getQuestionsByQuizId(quiz.qid).then(response=>{
            setAllQuestion(response.data)
        }).catch(error=>{
            console.log(error)
        })
    },[])

  return (
    <>
        <div className='container'>
            <div className='row'>
                <div className='col-md-8 offset-md-2'>
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
            {allQuestion.map((question,index)=>{
                return <div key={question.qid} className='row'>
                    <div className='col-md-8 offset-md-2'>
                    <Card className='my-2'>
                        {question.title.split("#")[0][0]!=="$" ? <CardHeader title={(index+1)+". "+question.title.split("#")[0]} /> : <CardHeader title={(index+1)+". Statements"} />}
                        {question.title.split("#")[0][0]==="$" && <div>
                            <ol>
                            {question.title.split("#")[0].split("$")[0] && <li>{question.title.split("#")[0].split("$")[0]}</li> }
                            {question.title.split("#")[0].split("$")[1] && <li>{question.title.split("#")[0].split("$")[1]}</li> }
                            {question.title.split("#")[0].split("$")[2] && <li>{question.title.split("#")[0].split("$")[2]}</li> }
                            </ol>
                        </div>}
                        {question.questionImage &&
                        <div className='container text-center'>
                            <img src={`data:image/png;base64,`+question.questionImage.data}  alt='Question '/>
                            </div> }
                        { question.title.split("#")[1] && <div>
                        <CardHeader title="Conclusion" />
                            <ol>
                            {question.title.split("#")[1] && <li>{question.title.split("#")[1]}</li> }
                            {question.title.split("#")[2] && <li>{question.title.split("#")[2]}</li> }
                            {question.title.split("#")[3] && <li>{question.title.split("#")[3]}</li> }
                            </ol>
                        </div> }
                        <Divider/>
                        <div className='d-flex flex-column justify-content-evenly'>
                        <ol>
                            <li className='my-3'>{question.options.optionsImage?<img className="mx-3" src={`data:image/png;base64,`+question.options.optionsImage.option1}  alt='Question '/>:<p className="mx-3">{question.options.option1}</p>}</li>
                            <li className='my-3'>{question.options.optionsImage?<img className="mx-3" src={`data:image/png;base64,`+question.options.optionsImage.option2}  alt='Question '/>:<p className="mx-3">{question.options.option2}</p>}</li>
                            <li className='my-3'>{question.options.optionsImage?<img className="mx-3" src={`data:image/png;base64,`+question.options.optionsImage.option3}  alt='Question '/>:<p className="mx-3">{question.options.option3}</p>}</li>
                            <li className='my-3'>{question.options.optionsImage?<img className="mx-3" src={`data:image/png;base64,`+question.options.optionsImage.option4}  alt='Question '/>:<p className="mx-3">{question.options.option4}</p>}</li>
                        </ol>
                        </div>
                    </Card>
                    </div>
                </div>
            })}
            <div className='container text-center'>
                <Link to={-1} ><Button color='primary' variant='contained'>Back</Button></Link>
            </div>
        </div>

    </>
  )
}

export default ViewPaper