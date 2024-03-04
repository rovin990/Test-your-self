import { Alert, Button, Card, CardActions, CardContent, CardHeader, Collapse, FormControl, IconButton, InputBase, InputLabel, MenuItem, Select, TextField } from '@mui/material';
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
    explaination:"",
    answer:"",
    questionType:"",
    options:{   
      option1:"",
      option2:"",
      option3:"",
      option4:"",
    },
    examTags:[],
    topic:"",
    subject:"",
    quizList:[]

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
    if(event.key == 'Enter'){
      setExamTagsChip(prev=>{
        return [...prev,{ key: prev.length, label: value }]
       })

       setQuestion(prev=>{
        return {...prev,examTags:[...prev.examTags,value]}
       })
       setTagMErr(false)
    } 
  }
  else if(name==="quiz"){

    setQuestion(prev=>{
      return {...prev,quizList:[...prev.quizList,value]}
    })
    setQuizName(value)
    
  }
  else{
    setQuestion({...question,[name]:value})
    switch (name){
      case "title": setTitleErr(false); break;
      case "explaination": setExplainErr(false); break;
      case "answer": setAnswerErr(false); break;
      case "topic": setTopicErr(false); break;
      default:setSubjectErr(false)  ; break;      
    }
  } 
  
}

const handleSubmit=()=>{
  let isFine = true;
  if(question.title.trim()===''||question.title===null){
    setTitleErr(true)
    isFine=false
  }
  if(question.explaination.trim()===''||question.explaination===null){
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
  

  
  questionServiceObj.createQuestion(question).then(response=>{
      setResponseMsg(response.data.massage)
      setOpen(true)
      setColor("success")
  })
  .catch(error=>{
      setResponseMsg(error.data.massage)
      setOpen(true)
      setColor("warning")
    //console.log(error)
  })
  //console.log(question)
}

const tagChipDelete = (chipToDelete) => () => {
  setExamTagsChip((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
};

const quizChipDelete = (chipToDelete) => () => {
  setExamTagsChip((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
};

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-8 offset-md-2'>
            <Model color={color} responseMsg={responseMsg} isOpen={open} handleDialog={handleDialog}/>
                <Card>
                    <CardHeader title="Add New Question" />
                    <CardContent >
                      <Form>
                        <TextField error={titleErr}  fullWidth id="title" size="small" label="title" variant="outlined" margin="dense" onChange={handleUserInput} name='title' value={question.title}/>
                        <TextField error={explainErr} fullWidth id="explaination" size="small" label="explaination" variant="outlined" multiline rows={4}
                         margin="dense" onChange={handleUserInput} name='explaination' value={question.explaination} />
                        
                        <TextField error={op1Err} fullWidth id="option1" size="small" label="option1" variant="outlined" margin="dense" onChange={handleUserInput} name='option1' value={question.options.option1}/>
                        <TextField error={op2Err} fullWidth id="option2" size="small" label="option2" variant="outlined" margin="dense" onChange={handleUserInput} name='option2' value={question.options.option2}/>
                        <TextField error={op3Err} fullWidth id="option3" size="small" label="option3" variant="outlined" margin="dense" onChange={handleUserInput} name='option3' value={question.options.option3}/>
                        <TextField error={op4Err} fullWidth id="option4" size="small" label="option4" variant="outlined" margin="dense" onChange={handleUserInput} name='option4' value={question.options.option4}/>
                        
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
                                {quizzes.map(quiz=><MenuItem key={quiz.qid} value={quiz.qid}>{quiz.title}</MenuItem>)}
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
        </div>
    </div>
  )
}

export default AddQuestion;