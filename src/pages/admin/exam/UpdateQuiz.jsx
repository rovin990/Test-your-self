import React, { useState } from 'react'
import { Form, useLoaderData, useLocation } from 'react-router-dom';

import { Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel,  InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material'


import QuizService from "../../../services/QuizService"
import Model from '../../../utility/Model';

const quizService = new QuizService();


function UpdateQuiz() {
    const location = useLocation();
    const data = location.state;

    const [quiz,setQuiz]=useState(data);

    const [tErr ,setTErr]= useState(false)
    const [dErr ,setDErr]= useState(false)
    const [mMErr ,setMMErr]= useState(false)
    const [nQErr ,setNQErr]= useState(false)
    const [cErr ,setCErr]= useState(false)

    const cData = useLoaderData()
    console.log(cData)
    const [categories,setCategories]= useState(cData);


    const [open,setOpen] = useState(false);
    const [responseMsg,setResponseMsg]=useState("");
    const [color,setColor] = useState("");


    // useEffect(()=>{
    //     categoryService.getCategories().then((response)=>{
    //         setCategories(response.data)
    //     })
    //     .catch(error=>{
    //         console.log("error ",error);
    //     })
    // },[])

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

    function handleSwitchAction(event){
        const name= event.target.name;
        const value=event.target.checked;
        setQuiz({...quiz,[name]:value})
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
        if(quiz.maxMark ==='' || quiz.maxMark==null){
            setMMErr(true)
            isFine=false
        }
        if(quiz.noOfQuestion ==='' || quiz.noOfQuestion==null){
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

        quizService.createQuiz(quiz).then(response=>{
            if(response.status===201){
                setOpen(true)
                setResponseMsg("Quiz is updated successfully with Id : "+response.data.qid)
                setColor("success")
            }
        }).catch(error=>{
            setOpen(true)
            setResponseMsg("Something went wrong try againg")
            setColor("warning")
            console.log(error)
        })
        
    }
    function handleDialog(){
        setOpen(false)        
    }
  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-8 offset-md-2'>
            <Model color={color} responseMsg={responseMsg} isOpen={open} handleDialog={handleDialog}/>
                <Card>
                    <CardHeader title="Update quiz" subheader={quiz.title}/>
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
                                <Switch checked={quiz.published} onChange={handleSwitchAction} inputProps={{"area-label":"controlled"}}  name='published'/>
                                } />
                                               
                        </Form>
                    </CardContent>
                    <CardActions>
                        <div className='container my-1 text-center'>
                            <Button variant='contained' color='success' onClick={handleSubmit} >Update</Button>
                        </div>
                    </CardActions>
                </Card>
            </div>
        </div>
    </div>
  )
}

export default UpdateQuiz;