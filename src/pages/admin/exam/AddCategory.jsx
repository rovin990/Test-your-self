import { Button, CardHeader, TextField } from '@mui/material';
import React, { useState } from 'react'
import { Form } from 'react-router-dom';
import CategoryService from '../../../services/CategoryService';

import { red } from '@mui/material/colors';

import display from '../../../utility/Color';

const catService= new CategoryService();

const logoCss={
    width:'100px',
    height:'100px',
    border: '1px dashed red',
    borderRadius: '100%',
}
function AddCategory() {
    const [category,setCategory] =useState({title:"",color:"",description:"",image:""});
    const [file,setFile]=useState(null);
    const [preview,setPreview]=useState(null)

    const [error ,setError] = useState(false);

    const handleUserInput = (event)=>{
        const name=event.target.name;
        const value=event.target.value;
        if(name=="title"){
            setError(false)
        }
        setCategory(pre=>{
            return {...pre,[name]:value}
        })  
    }

    const handleFileInput=(event)=>{
        const value=event.target.files[0];

        setFile(value);
        const name="image";
        setCategory(pre=>{
            return {...pre,[name]:value.name}
        }) 
       
        
        setPreview(URL.createObjectURL(value));
    }

    const saveCategory= ()=>{
        if(category.title==''|| category.title.trim()==null){
            setError(true)
            return;
        }
        //save category
        catService.saveCategory(category).then(response=>{

            if(response.status==201){
                const formData = new FormData();
                formData.append("file",file)
                catService.saveFile(formData).then(res=>{
                    console.log(res)
                })
                .catch(error=>{
                    console.log(error)
                })
            }

        })
        .catch(error=>{
            console.log(error)
        })
        
    }
  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-7 offset-md-2'>
                
                <CardHeader title="New category" subheader="Please provide valid data"/>
                <Form>
                    <TextField error={error} fullWidth id="title" size="small" label="title" variant="outlined" margin="dense" onChange={handleUserInput} name='title' value={category.title}/>
                    <TextField fullWidth id="color" size='small' label="choose color" margin='dense' onChange={handleUserInput} name="color" value={category.color} type='color' />
                    <TextField fullWidth id="image" size='small'  margin='dense' onChange={handleFileInput} name="file"  type='file' />
                    <TextField fullWidth id="description"  label="description" variant="outlined" margin="dense" multiline name='description'
                                 rows={4} onChange={handleUserInput}  value={category.description} />    
                </Form>
                <div className='container text-center mt-3'>
                    <Button variant="contained" color='success' className='mx-1' onClick={saveCategory}>Save</Button>
                </div>
            </div>
            <div className='col-md-3 d-flex justify-content-center'>
                <div className="align-self-center">
                    <label >Image Preview</label>
                    <img  src={preview} style={logoCss}/>
                </div>
                
             </div>
        </div>
    </div>
  )
}

export default AddCategory