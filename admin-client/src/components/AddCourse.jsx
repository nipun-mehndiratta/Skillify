import { Typography,TextField,Button,Card } from "@mui/material";
import {useState} from 'react';
import axios from 'axios';
import {BASE_URL} from '../config.js'
import {typographyStyle,buttonStyle} from './styles.js' 

function AddCourse(){
  
    const [title,setTitle] = useState("");
    const [subTitle,setSubTitle] = useState("");
    const [description,setDescription] = useState("");
    const [video,setVideo] = useState("");
    const [image,setImage] = useState("");
    const [price,setPrice] = useState("");

    return(

        <div>
            <div style={{marginTop:'10px',display:'flex',justifyContent:'center'}}>
            <Card style={{width:400,padding:20}}>
                
            <Typography style={typographyStyle} > Create New Course</Typography>    

            <TextField fullWidth label='Title' onChange={(e)=>{setTitle(e.target.value)}}></TextField>
            <br/><br/>
            <TextField fullWidth label='SubTitle' onChange={(e)=>{setSubTitle(e.target.value)}}></TextField>
            <br/><br/>
            <TextField fullWidth label='Description' onChange={(e)=>{setDescription(e.target.value)}}></TextField>
            <br/><br/>
            <TextField fullWidth label='ImageLink' onChange={(e)=>{setImage(e.target.value)}}></TextField>
            <br/><br/>
            <TextField fullWidth label='VideoLink' onChange={(e)=>{setVideo(e.target.value)}}></TextField>
            <br/><br/>
            <TextField fullWidth label='Price' onChange={(e)=>{setPrice(e.target.value)}}> </TextField>
             <br/><br/>
            <Button fullWidth variant='contained' style={buttonStyle} onClick={async ()=>{
                let token = localStorage.getItem("token");
                await axios.post(`${BASE_URL}/admin/courses`,
                {title:title,subtitle:subTitle,description:description,imageLink:image,videoLink:video,price:price},
                {headers:{'Authorization':`Bearer ${token}`}});
                alert("Course Added Successfully");
            }}>Add Course</Button>
            </Card>
            </div>
        </div>
    )
}

export default AddCourse;