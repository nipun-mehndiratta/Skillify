import { Typography,TextField,Button,Card } from "@mui/material";
import {useState} from 'react';
import axios from 'axios';

function AddCourse(){
  
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [image,setImage] = useState("");
    const [price,setPrice] = useState("");

    return(

        <div>
             <div style={{marginTop:100,display:'flex',justifyContent:'center'}} >
            <Typography variant={'h6'}>Add New Course</Typography>
            </div>
            
            <div style={{display:'flex',justifyContent:'center'}}>
            <Card style={{width:400,padding:20}}>
            <TextField fullWidth label='Title' onChange={(e)=>{setTitle(e.target.value)}}></TextField>
            <br/><br/>
            <TextField fullWidth label='Description' onChange={(e)=>{setDescription(e.target.value)}}></TextField>
            <br/><br/>
            <TextField fullWidth label='ImageLink' onChange={(e)=>{setImage(e.target.value)}}></TextField>
            <br/><br/>
            <TextField fullWidth label='Price' onChange={(e)=>{setPrice(e.target.value)}}> </TextField>
             <br/><br/>
            <Button variant='contained' onClick={async ()=>{
                let token = localStorage.getItem("token");
                await axios.post("http://localhost:3000/admin/courses",{title:title,description:description,imageLink:image,price:price},{headers:{'Authorization':`Bearer ${token}`}})
                alert("Course Added Successfully")
            }}>Add Course</Button>
            </Card>
            </div>
        </div>
    )
}

export default AddCourse;