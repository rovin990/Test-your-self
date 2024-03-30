import {  Button, Card, CardActions, CardContent, CardHeader, FormControl,  InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Form } from 'react-router-dom';


import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TagFacesIcon from '@mui/icons-material/TagFaces';

import QuizService from '../../../services/QuizService';
import QuestionService from '../../../services/QuestionService';
import Model from '../../../utility/Model';

const quizServiceObj = new QuizService();
const questionServiceObj = new QuestionService();


const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const chipBoxCss={
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  listStyle: 'none',
  p: 0.5,
  m: 0,
}

function AddQuestion() {
  const [examTagsChip, setExamTagsChip]=useState([]);
  // const [quizChip, setQuizChip]=useState([]);
  const [question,setQuestion]=useState({
    title:"",
    explanation:"",
    answer:"",
    questionType:"",
    options:{   
      option1:"",
      option2:"",
      option3:"",
      option4:"",
    },
    examTags:"",
    topic:"",
    subject:"",
    quizIds:""
});
const [quizName, setQuizName] = useState('');
const [quizzes,setQuizzes] = useState([]);

const [titleErr ,setTitleErr]= useState(false)
const [explainErr ,setExplainErr]= useState(false)
const [op1Err ,setOp1Err]= useState(false)
const [op2Err ,setOp2Err]= useState(false)
const [op3Err ,setOp3Err]= useState(false)
const [op4Err ,setOp4Err]= useState(false)
const [tagMErr ,setTagMErr]= useState(false)
const [topicErr ,setTopicErr]= useState(false)
const [subjectErr ,setSubjectErr]= useState(false)
const [answerErr,setAnswerErr]=useState(false)

const [open,setOpen] = useState(false);
const [responseMsg,setResponseMsg]=useState("");
const [color,setColor] = useState("");
function handleDialog(){
  setOpen(false)        
}


useEffect(()=>{
  quizServiceObj.getQuizz("All").then(response=>{
    console.log(response)
    setQuizzes(response.data)
  })
  .catch(error=>{
    console.log(error)
  })
    
},[])


function  handleUserInput(event){
  const name= event.target.name;
  const value=event.target.value;

  if(name==="option1" || name==="option2" || name==="option3" || name==="option4"){
    setQuestion(pre=> {
      return {...pre,"options":{...pre.options,[name]:value}}
    })
    switch (name){
      case "option1": setOp1Err(false); break;
      case "option2": setOp2Err(false); break;
      case "option3": setOp3Err(false); break;
      default:setOp4Err(false)  ; break;      
  }
  }
  else if(name==="tag"){
    if(event.key === 'Enter'){
      setExamTagsChip(prev=>{
        return [...prev,{ key: prev.length, label: value }]
       })

       setQuestion(prev=>{
        return {...prev,examTags:prev.examTags+value+","}
       })
       setTagMErr(false)
    } 
  }
  else if(name==="quiz"){
    setQuestion(prev=>{
      return {...prev,quizIds:prev.quizIds+value+","}
    })
    setQuizName(value)
    
  }
  else{
    setQuestion({...question,[name]:value})
    switch (name){
      case "title": setTitleErr(false); break;
      case "explanation": setExplainErr(false); break;
      case "answer": setAnswerErr(false); break;
      case "topic": setTopicErr(false); break;
      default:setSubjectErr(false)  ; break;      
    }
  } 
  
  console.log(question)
}

const handleSubmit=()=>{
  let isFine = true;
  if(question.title.trim()===''||question.title===null){
    setTitleErr(true)
    isFine=false
  }
  if(question.explanation.trim()===''||question.explanation===null){
    setExplainErr(true)
    isFine=false
  }
  
  if(question.options.option1.trim()===''||question.options.option1===null){
    setOp1Err(true)
    isFine=false
  }
  if(question.options.option2.trim()===''||question.options.option2===null){
    setOp2Err(true)
    isFine=false
  }
  if(question.options.option3.trim()===''||question.options.option3===null){
    setOp3Err(true)
    isFine=false
  }
  if(question.options.option4.trim()===''||question.options.option4===null){
    setOp4Err(true)
    isFine=false
  }
  if(question.answer.trim()==='' || question.answer===null){
    setAnswerErr(true)
    isFine=false;
  }
  if(question.examTags.length===0){
    setTagMErr(true)
    isFine=false;
  }
  if(question.topic.trim()==='' || question.topic===null){
    setTopicErr(true)
    isFine=false;
  }
  if(question.subject.trim()==='' || question.subject===null){
    setSubjectErr(true)
    isFine=false;
  }

  if(!isFine)return ;
  const formData = new FormData();
  formData.append("question",JSON.stringify(question))
  let formImages=[];
  if(titleImg){
    formImages.push(titleImg)
    
  }
  if(checked){
    formImages.push(op1File)  
    formImages.push(op2File)  
    formImages.push(op3File)  
    formImages.push(op4File) 
  
  }  
  for (const image of formImages) {
    formData.append("formImages", image);
  }

  if(formImages.length!==0){
    questionServiceObj.createQuestion(formData).then(response=>{
      if(response.status===201){
        const questionId=response.data.massage;
        console.log("questionId ",questionId)
        setResponseMsg("Question saved with id : "+questionId)
        setOpen(true)
        setColor("success")   
      }
    })
    .catch(error=>{
        setResponseMsg(error.data.massage)
        setOpen(true)
        setColor("warning")
    })
  }else{
    questionServiceObj.createQuestionWithOutImages(formData).then(response=>{
      if(response.status===201){
        const questionId=response.data.massage;
        console.log("questionId ",questionId)
        setResponseMsg("Question saved with id : "+questionId)
        setOpen(true)
        setColor("success")   
      }
    })
    .catch(error=>{
        setResponseMsg(error.data.massage)
        setOpen(true)
        setColor("warning")
    })
  }
}

const tagChipDelete = (chipToDelete) => () => {
  setExamTagsChip((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
};

const [checked, setChecked] = useState(false);

const handleSwitchAction = (event) => {
        setChecked(event.target.checked);
        setQuestion(pre=>{
          return {...pre,"isImageOps":true}
        })
    };

const [op1File,setOp1File]=useState(null);
const [op2File,setOp2File]=useState(null);
const [op3File,setOp3File]=useState(null);
const [op4File,setOp4File]=useState(null);
const [titleImg,setTitleImg]=useState(null);
function handleFileInput(event){
  const value=event.target.files[0];
  const name=event.target.name;
  if(name==="option1" || name==="option2" || name==="option3" || name==="option4"){
    setQuestion(pre=> {
      return {...pre,"options":{...pre.options,[name]:value.name}}
    })    
  } 
  if(name==="image"){
    setQuestion(pre=>{
      return {...pre,[name]:value.name}
    })
    setTitleImg(value)
  }
  switch (name){
    case "option1": setOp1File(value); break;
    case "option2": setOp2File(value); break;
    case "option3": setOp3File(value); break;
    case "option4":setOp4File(value)  ; break;      
    default : break;
  }
}
const [questionFile,setQuestionFile]=useState(null);
function captureFile(event){
  const value=event.target.files[0];
  setQuestionFile(value);
}
function handleFileUpload(){
  
  const formData = new FormData();
  formData.append("question_exl",questionFile)
  questionServiceObj.uploadQuestionFile(formData).then(response=>{
    console.log("file uplaod response ",response)
    setResponseMsg("all question saved")
    setOpen(true)
    setColor("success")
  }).catch(error=>{
    console.log(error)
    // setResponseMsg(error.data.massage)
    // setOpen(true)
    // setColor("warning")
  })
  return ;
}


  return (
    <div className='container'>
        <div className='row '>
            <div className='col-md-8 col-sm my-3'>
            <Model color={color} responseMsg={responseMsg} isOpen={open} handleDialog={handleDialog}/>
                <Card>
                    <CardHeader title="Add New Question" />
                    <CardContent >
                      <Form>
                        <TextField error={titleErr}  fullWidth id="title" size="small" label="title" variant="outlined" margin="dense" onChange={handleUserInput} name='title' value={question.title}/>
                        <TextField error={op1Err} type='file' fullWidth id="image" size="small"   margin="dense" onChange={handleFileInput} name='image'  />
                        <TextField error={explainErr} fullWidth id="explanation" size="small" label="explanation" variant="outlined" multiline rows={4}
                         margin="dense" onChange={handleUserInput} name='explanation' value={question.explanation} />
                        
                        
                        <Switch checked={checked} onChange={handleSwitchAction} inputProps={{"area-label":"controlled"}} />
                               
                        {checked?
                          <>
                          <TextField error={op1Err} type='file' fullWidth id="option1" size="small"   margin="dense" onChange={handleFileInput} name='option1'  />
                          <TextField error={op2Err} type='file' fullWidth id="option2" size="small"   margin="dense" onChange={handleFileInput} name='option2' />
                          <TextField error={op3Err} type='file' fullWidth id="option3" size="small"   margin="dense" onChange={handleFileInput} name='option3' />
                          <TextField error={op4Err} type='file' fullWidth id="option4" size="small"   margin="dense" onChange={handleFileInput} name='option4' />
                          </>
                        :  <>
                          <TextField error={op1Err} fullWidth id="option1" size="small" label="option1" variant="outlined" margin="dense" onChange={handleUserInput} name='option1' value={question.options.option1} />
                          <TextField error={op2Err} fullWidth id="option2" size="small" label="option2" variant="outlined" margin="dense" onChange={handleUserInput} name='option2' value={question.options.option2}/>
                          <TextField error={op3Err} fullWidth id="option3" size="small" label="option3" variant="outlined" margin="dense" onChange={handleUserInput} name='option3' value={question.options.option3}/>
                          <TextField error={op4Err} fullWidth id="option4" size="small" label="option4" variant="outlined" margin="dense" onChange={handleUserInput} name='option4' value={question.options.option4}/>
                          </>
                        }
                         
                        <FormControl fullWidth size="small" margin="dense">
                            <InputLabel id="answer">Answer</InputLabel>
                            <Select error={answerErr} labelId="answer" id="answer" value={question.answer} label="Answer" onChange={handleUserInput} name="answer"                            >
                                <MenuItem value="none"><em>None</em></MenuItem> 
                                <MenuItem  value={question.options.option1}>{question.options.option1}</MenuItem>
                                <MenuItem  value={question.options.option2}>{question.options.option2}</MenuItem>
                                <MenuItem  value={question.options.option3}>{question.options.option3}</MenuItem>
                                <MenuItem  value={question.options.option4}>{question.options.option4}</MenuItem>
                            </Select>
                        </FormControl>
                        
                        <Paper  sx={chipBoxCss} component="ul">
                          {examTagsChip.map((data) => {
                            let icon;

                            if (data.label === 'React') {
                              icon = <TagFacesIcon />;
                            }

                            return (
                              <ListItem key={data.key}>
                                <Chip icon={icon} label={data.label} onDelete={data.label === 'React' ? undefined : tagChipDelete(data)} />
                              </ListItem>
                            );
                          })}
                        </Paper>                        
                        <TextField error={tagMErr} fullWidth id="examTags" size="small" label="examTags" variant="outlined" margin="dense" onKeyUp={handleUserInput} name='tag'/>
                        
                        <TextField error={topicErr} fullWidth id="topic" size="small" label="topic" variant="outlined" margin="dense" onChange={handleUserInput} name='topic' value={question.topic}/>
                        <TextField error={subjectErr} fullWidth id="subject" size="small" label="subject" variant="outlined" margin="dense" onChange={handleUserInput} name='subject' value={question.subject}/>


                        <FormControl fullWidth size="small" margin="dense">
                            <InputLabel id="quiz">quiz</InputLabel>
                            <Select labelId="quiz" id="quiz" value={quizName} label="quiz" onChange={handleUserInput} name="quiz" >
                                <MenuItem value="none"><em>None</em></MenuItem> 
                                {quizzes.map(quiz=>{
                                  if(quiz.questionLeft>0)
                                  return <MenuItem key={quiz.qid} value={quiz.qid} >{quiz.title}</MenuItem>
                                  })}
                            </Select>
                        </FormControl>                        
                      </Form>
                    </CardContent>
                    <CardActions>
                        <div className='container my-1 text-center'>
                            <Button variant='contained' color='success' onClick={handleSubmit} >Save</Button>
                        </div>
                    </CardActions>
                </Card>
            </div>
            <div className='col-md-4 col-sm'>
              <Card className='mt-3'>
                <CardHeader title="Upload question from file" />
                <CardContent className='container text-center'>
                  <TextField variant='outlined' margin='dense'type='file' onChange={captureFile}/>
                </CardContent>  
                <CardActions>
                  <div className='container my-1 text-center'>
                    <Button variant='contained' color='success' onClick={handleFileUpload} >Upload</Button>
                  </div>
                </CardActions>              
              </Card>
              
            </div>
        </div>
    </div>
  )
}

export default AddQuestion;