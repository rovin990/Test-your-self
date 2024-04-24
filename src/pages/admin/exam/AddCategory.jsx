import { Button, CardHeader, TextField } from '@mui/material';
import React, { useState } from 'react'
import { Form } from 'react-router-dom';
import CategoryService from '../../../services/CategoryService';

import Model from '../../../utility/Model';

const catService= new CategoryService();

const logoCss={
    width:'100px',
    height:'100px',
    border: '1px dashed red',
    borderRadius: '100%',
}
function AddCategory() {
    const [category,setCategory] =useState({title:"",color:"#f9f5f5",description:"",image:""});
    const [file,setFile]=useState(null);
    const [preview,setPreview]=useState(null)

    const [error ,setError] = useState(false);



    const [open,setOpen] = useState(false);
    const [responseMsg,setResponseMsg]=useState("");
    const [color,setColor] = useState("");
    function handleDialog(){
    setOpen(false)        
    }

    const handleUserInput = (event)=>{
        const name=event.target.name;
        const value=event.target.value;
        if(name==="title"){
            setError(false)
        }
        setCategory(pre=>{
            return {...pre,[name]:value}
        })  
    }

    const handleFileInput=(event)=>{
        const value=event.target.files[0];
        setFile(value);     
        console.log("category Image",value)
        setPreview(URL.createObjectURL(value));
    }

    const saveCategory= ()=>{
        if(category.title===''|| category.title.trim()==null){
            setError(true)
            return;
        }

        const formData = new FormData();
        formData.append("category",JSON.stringify(category))
        formData.append("categoryImage",file);

        //save category
        catService.saveCategory(formData).then(response=>{
            console.log(response);
            setResponseMsg("Category saved with cId "+response.data.cid)
            setColor('success')
            setOpen(true)
        }).catch(error=>{
            console.log(error)
            setResponseMsg("Something went wrong try againg")
            setColor('warning')
            setOpen(true)
        })
        
    }
  return (
    <div className='container'>
        <div className='row my-3'>
            <div className='col-md-7 col-sm offset-md-2 '>
             <Model color={color} responseMsg={responseMsg} isOpen={open} handleDialog={handleDialog}/>
                
                <CardHeader title="New category" subheader="Please provide valid data"/>
                <Form>
                    <TextField error={error} fullWidth id="title" size="small" label="title" variant="outlined" margin="dense" onChange={handleUserInput} name='title' value={category.title}/>
                    {/* <TextField fullWidth id="color" size='small' label="choose color" margin='dense' onChange={handleUserInput} name="color" value={category.color} type='color' /> */}
                    <TextField fullWidth id="image" size='small'  margin='dense' onChange={handleFileInput} name="file"  type='file' />
                    <TextField fullWidth id="description"  label="description" variant="outlined" margin="dense" multiline name='description'
                                 rows={4} onChange={handleUserInput}  value={category.description} />    
                </Form>
                <div className='container text-center mt-3'>
                    <Button variant="contained" color='success' className='mx-1' onClick={saveCategory}>Save</Button>
                </div>
            </div>
            <div className='col-md-3 col-sm my-4 d-flex justify-content-center'>
                <div className="align-self-center">
                    <label >Image Preview</label>
                    <img  src={preview} style={logoCss} className='img-responsive'/>
                </div>
                
             </div>
        </div>
    </div>
  )
}

export default AddCategory