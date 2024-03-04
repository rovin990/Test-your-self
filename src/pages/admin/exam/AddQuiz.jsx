import { Alert, Button, Card, CardActions, CardContent, CardHeader, Collapse, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

import React, { useEffect, useState } from 'react'
import { Form} from 'react-router-dom';

import QuizService from "../../../services/QuizService"
import CategoryService from '../../../services/CategoryService';

const quizService = new QuizService();
const categoryService = new CategoryService();

function AddQuiz() {
    const [quiz,setQuiz]=useState({
        title:"",
        description:"",
        maxMark:"",
        noOfQuestion:"",
        category:"",
        published:false
    });

    const [checked, setChecked] = useState(false);

    const handleSwitchAction = (event) => {
        setChecked(event.target.checked);
    };
    const [tErr ,setTErr]= useState(false)
    const [dErr ,setDErr]= useState(false)
    const [mMErr ,setMMErr]= useState(false)
    const [nQErr ,setNQErr]= useState(false)
    const [cErr ,setCErr]= useState(false)

    const [categories,setCategories]= useState([]);

    const [open,setOpen] = useState(false);
    const [responseMsg,setResponseMsg]=useState("");

    useEffect(()=>{
        categoryService.getCategories().then((response)=>{
            setCategories(response.data)
        })
        .catch(error=>{
            console.log("error ",error);
        })
    },[])

  function  handleUserInput(event){
        const name= event.target.name;
        const value=event.target.value;

        setQuiz({...quiz,[name]:value})

        switch (name){
            case "title": setTErr(false); break;
            case "description": setDErr(false); break;
            case "maxMark": setMMErr(false); break;
            case "noOfQuestion": setNQErr(false); break;
            default:setCErr(false)  ; break;      
        }
    }

   function handleSubmit(){
        let isFine = true;
        if(quiz.title.trim()==='' || quiz.title==null){
            setTErr(true)
            isFine=false
        }
        if(quiz.description.trim()==='' || quiz.description==null){
            setDErr(true)
            isFine=false
        }
        if(quiz.maxMark.trim()==='' || quiz.maxMark==null){
            setMMErr(true)
            isFine=false
        }
        if(quiz.noOfQuestion.trim()==='' || quiz.noOfQuestion==null){
            setNQErr(true)
            isFine=false
        }
        if(quiz.category.trim()==='' || quiz.category==null){
            setCErr(true)
            isFine=false
        }
        if(!isFine) {
            return;
        }

        console.log(checked)
        quiz.published=checked;

        console.log(quiz)

        quizService.createQuiz(quiz).then(response=>{
            if(response.status===201){
                setOpen(true)
                setResponseMsg("Quiz is added successfully with Id : "+response.data.qid)
                console.log(response)
            }
        }).catch(error=>{
            setOpen(true)
            setResponseMsg("Something went wrong try againg")
            console.log(error)
        })
        
    }
  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-8 offset-md-2'>
            <div className='container '>
                <Collapse in={open}>
                    <Alert action={ <IconButton aria-label="close" color="inherit" size="small" onClick={() => { setOpen(false); }} >
                                    <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }
                    sx={{ mb: 2 }}
                    >
                    {responseMsg}
                    </Alert>
                </Collapse>
            </div>
                <Card>
                    <CardHeader title="Add new quiz" />
                    <CardContent >
                        <Form>
                        <TextField error={tErr}  fullWidth id="title" size="small" label="title" variant="outlined" margin="dense" onChange={handleUserInput} name='title' value={quiz.title}/>
                        <TextField error={dErr} fullWidth id="description" size="small" label="description" variant="outlined" multiline rows={4}
                         margin="dense" onChange={handleUserInput} name='description' value={quiz.description}/>
                        <TextField error={mMErr} fullWidth id="maxMark" size="small" label="maxMark" variant="outlined" margin="dense" onChange={handleUserInput} name='maxMark' value={quiz.maxMark}/>
                        <TextField error={nQErr} fullWidth id="noOfQuestion" size="small" label="noOfQuestion" variant="outlined" margin="dense" onChange={handleUserInput} name='noOfQuestion' value={quiz.noOfQuestion}/>

                        <FormControl fullWidth size="small" margin="dense">
                            <InputLabel id="category">Category</InputLabel>
                            <Select
                                labelId="category"
                                id="category"
                                value={quiz.category}
                                label="Category"
                                onChange={handleUserInput}
                                name="category"
                                error={cErr}                            >
                                <MenuItem value="">
                                <em>None</em>
                                </MenuItem>
                                {categories.map(category=>{
                                    return <MenuItem  value={category.title}>{category.title}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        <FormControlLabel label="isPublished"
                                control={
                                <Switch checked={checked} onChange={handleSwitchAction} inputProps={{"area-label":"controlled"}} />
                                } />
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

export default AddQuiz