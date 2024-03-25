import React, { useEffect, useState } from 'react'
import CategoryService from '../../../services/CategoryService';
import { Card, CardContent, CardHeader,Button, Divider } from '@mui/material';
import { lightGreen ,yellow ,red, lightBlue, orange} from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import ReadMore from '../../../utility/ReadMore';



const categoryService =new CategoryService();



const logoCss={
    width:'50px',
    height:'50px',
    border: '1px dashed red',
    borderRadius: '100%',
}

const catTemp =[
    {
        cId:1,
        title:"Programming",
        description:"Programming is language for computer . in market serverl are present such as JAVA , CSS , PYTHON",
        color:lightGreen[100]

    },
    {
        cId:2,
        title:"Reasoning",
        description:"Programming is language for computer . in market serverl are present such as JAVA , CSS , PYTHON",
        color:yellow[100]

    },
    {
        cId:3,
        title:"Aptitude",
        description:"Programming is language for computer . in market serverl are present such as JAVA , CSS , PYTHON",
        color:lightBlue[100]

    },
    {
        cId:4,
        title:"English",
        description:"Programming is language for computer . in market serverl are present such as JAVA , CSS , PYTHON",
        color:red[200]

    },
    {
        cId:5,
        title:"General awareness",
        description:"Programming is language for computer . in market serverl are present such as JAVA , CSS , PYTHON",
        color:orange[100]

    },
    {
        cId:6,
        title:"Programming",
        description:"Programming is language for computer . in market serverl are present such as JAVA , CSS , PYTHON",
        color:lightGreen[100]

    },
    {
        cId:7,
        title:"Reasoning",
        description:"Programming is language for computer . in market serverl are present such as JAVA , CSS , PYTHON",
        color:yellow[100]

    },
    {
        cId:8,
        title:"Aptitude",
        description:"Programming is language for computer . in market serverl are present such as JAVA , CSS , PYTHON",
        color:lightBlue[100]

    },
    {
        cId:9,
        title:"English",
        description:"Programming is language for computer . in market serverl are present such as JAVA , CSS , PYTHON",
        color:red[200]

    },
    {
        cId:10,
        title:"General awareness",
        description:"Programming is language for computer . in market serverl are present such as JAVA , CSS , PYTHON",
        color:orange[100]

    }
];
function ShowCategory() {
    const navigate =useNavigate();
    const [categories,setCategories] = useState([]);

    useEffect(()=>{
        categoryService.getCategories().then((response)=>{
            console.log("response",response);
            setCategories(response.data)
        })
        .catch(error=>{
            console.log("error ",error);
        })        
    },[])

    const handleOnclick = (to)=>{
        navigate(`/admin`+to)
    }
  return (
    <div className='container'>
        <div className='row'>
            
                <CardHeader title="All Categories" subheader="sub header" />
            
        </div>
        <div className='row '>
            
            {categories.map(category=>{
                return <div key={category.cId} className='col-md-3 '>
                    <Card style={{backgroundColor:category.color}} className='mb-5'>
                    {/* <div className='container text-end'>
                    <DeleteOutlineOutlinedIcon />
                    </div> */}
                    
                    <CardContent>
                        <div className='container text-center '>
                            <div className='row'>
                                <div className='col-md-3 d-flex justify-content-center'>
                                    <img className="align-self-center" src={ process.env.PUBLIC_URL +'/images/category/'+category.image} alt='category image' style={logoCss}/>
                                </div>
                                <div className='col-md-9'>
                                    <h4>{category.title }</h4>
                                    <ReadMore text={category.description} displayCount='15'/>
                                </div>
                            </div>
                        </div>
                        <Divider />
                    </CardContent>
                    </Card>
                </div>
            })}
            
            
        </div>
        <div className='container text-center mt-1'>
            <Button variant="contained" color='success' className='mx-1' onClick={()=>handleOnclick("/add-category")}>Add new Category</Button>
        </div>
    </div>
  )
}

export default ShowCategory