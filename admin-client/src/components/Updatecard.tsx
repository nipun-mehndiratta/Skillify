import axios from 'axios';
import { useState } from 'react';
import {Button,TextField,Card,Typography} from '@mui/material';
import {BASE_URL} from '../config.js'
import { useRecoilState } from 'recoil';
import { courseState } from '../store/atoms/course.js';
import { typographyStyle } from './styles';

 

function UpdateCard(){
    const [courseDetails, setCourse] = useRecoilState(courseState);
    const [title,setTitle] = useState(courseDetails.course.title);
    const [subTitle,setSubTitle] = useState(courseDetails.course.subtitle);
    const [description,setDescription] = useState(courseDetails.course.description);
    const [image,setImage] = useState(courseDetails.course.imageLink);
    const [video,setVideo] = useState(courseDetails.course.videoLink);
    const [price,setPrice] = useState(courseDetails.course.price);

    return (
        <div style={{maxHeight:'660px',display:'flex',justifyContent:'flex-end'}}>
            <Card style={{borderRadius:'20px',padding:'15px',maxWidth:'400px'}}>
             
             <Typography style={typographyStyle}>Update Course</Typography>

             <TextField fullWidth style={{marginBottom:'10px'}} label='Title' value={title} onChange={((e)=>{
                setTitle(e.target.value);
             })}></TextField>
             <br/>
             <TextField fullWidth style={{marginBottom:'10px'}} label='SubTitle' value={subTitle} onChange={((e)=>{
                setSubTitle(e.target.value)})}></TextField>

             <TextField fullWidth style={{marginBottom:'10px'}} label='Description' value={description} onChange={((e)=>{
                setDescription(e.target.value)})}></TextField>

             <TextField fullWidth style={{marginBottom:'10px'}} label='Image' value={image} onChange={((e)=>{
                setImage(e.target.value)})}></TextField>

             <TextField fullWidth style={{marginBottom:'10px'}} label='Video' value={video} onChange={((e)=>{
                setVideo(e.target.value)})}></TextField>    

             <TextField fullWidth style={{marginBottom:'10px'}} label='Price' value={price} onChange={((e)=>{
                setPrice(e.target.value)})}></TextField>  

             <Button fullWidth style={{
                fontSize:'15px',
                marginBottom:'10px',
                color:'whitesmoke',
                backgroundColor:'#ea5879',
                textTransform:'none',
                }}
                variant="contained" onClick={async()=>{
                axios.put(`${BASE_URL}/admin/courses/${courseDetails.course._id}`,{
                    title:title,
                    subtitle:subTitle,
                    description:description,
                    imageLink:image,
                    videoLink:video,
                    price:price,
                },
                {headers:{'Authorization':`Bearer ${localStorage.getItem("token")}`}}).then(()=>{
                    let updatedcourse = {
                        _id: courseDetails.course._id,
                        title:title,
                        subtitle:subTitle,
                        description:description,
                        imageLink:image,
                        videoLink:video,
                        price:price
                    }
                        setCourse({course: updatedcourse, isLoading: false});
                    })
             }}>Update</Button>
            </Card>
            </div>  
    )
}

export default UpdateCard;