import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import {Card,TextField,Typography,Button, Grid} from '@mui/material'
import axios from 'axios';
import { courseState} from "../store/atoms/course";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {isCourseLoading,courseTitle,coursePrice,courseImage} from '../store/selectors/course';



function Course(){
  
  let {id} = useParams();

  const setCourse = useSetRecoilState(courseState);
  const isLoading = useRecoilValue(isCourseLoading); 

  useEffect((()=>{
    
    axios.get(`http://localhost:3000/admin/course/${id}`,{headers:{
        'Authorization':`Bearer ${localStorage.getItem("token")}`
    }}).then((res)=>{
        setCourse({isLoading: false, course: res.data});
    })
  }),[])

   if(isLoading){
    return(
        <p>Loading</p>
    )
   }

    return(
        <div>
        <Topper/>
        <Grid container>
            <Grid item lg={4} md={12} sm={12}>
             <div style={{display:'flex'}}>
             <CourseCard />
            </div>
            </Grid>

            <Grid item lg={8} md={12} sm={12}>
           <UpdateCard  />
            </Grid>
        </Grid>
       </div>
   
    )
}

function Topper(){
    const title = useRecoilValue(courseTitle);
    return(
        <div style={{marginTop:10,width:'100vw',height:150,backgroundColor:'#232424'}}>
        <Typography paddingTop={'45px'} color={'whiteSmoke'} fontWeight={'10'} fontSize={'30px'} textAlign={'center'}> {title}</Typography>
    </div>
    )
}


function UpdateCard(){
    const [courseDetails, setCourse] = useRecoilState(courseState);
    
    const [title,setTitle] = useState(courseDetails.course.title);
    const [description,setDescription] = useState(courseDetails.course.description);
    const [image,setImage] = useState(courseDetails.course.imageLink);
    const [price,setPrice] = useState(courseDetails.course.price);

    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <Card style={{borderRadius:'20px',maxWidth:400,marginLeft:30,marginTop:-30}}>
             <Typography paddingTop={'10px'} color={'##606060'} variant='h6' textAlign={'center'}>Update Course</Typography>

             <TextField style={{width:360,marginLeft:20,marginTop:10}}label='Title' value={title} onChange={((e)=>{
               
                setTitle(e.target.value);
             })}></TextField>

             <TextField style={{width:360,marginLeft:20,marginTop:10}} label='Description' value={description} onChange={((e)=>{
                setDescription(e.target.value)})}></TextField>

             <TextField style={{width:360,marginLeft:20,marginTop:10}}label='Image' value={image} onChange={((e)=>{
                setImage(e.target.value)})}></TextField>

             <TextField style={{width:360,marginLeft:20,marginTop:10}}label='Price' value={price} onChange={((e)=>{
                setPrice(e.target.value)})}></TextField>  

             <Button style={{width:100,margin:20}} variant="contained" onClick={async()=>{
           
                axios.put("http://localhost:3000/admin/courses/"+courseDetails.course._id,{
                    title:title,
                    description:description,
                    imageLink:image,
                    price:price,
                },{headers:{'Authorization':`Bearer ${localStorage.getItem("token")}`}}).then(()=>{
                    let updatedcourse = {
                        _id: courseDetails.course._id,
                        title:title,
                        description:description,
                        imageLink:image,
                        price:price
                    }
                        setCourse({course: updatedcourse, isLoading: false});
        
                    })
                    
             }}>Update</Button>
            </Card>
            </div>  
    )
}

function CourseCard(){

    const title = useRecoilValue(courseTitle);
    const image = useRecoilValue(courseImage);
    const price = useRecoilValue(coursePrice);

    return(
    <Card style={{borderRadius:'20px',height:250,width:300,marginLeft:80,marginTop:-120,marginBottom:40}}>
            <img style={{height:175,width:300}}src={image} alt="image" />
            <Typography style={{marginLeft:10,marginBottom:-3}} variant='h6' textAlign={'left'}>{title}</Typography>
            <Typography fontSize={'14px'} color={'grey'} variant="h7" style={{marginLeft:10}}>Price</Typography>
            <br/>
            <Typography color={'##606060'} variant="h7" style={{marginLeft:10,marginTop:5}}>Rs {price}</Typography>
            </Card>
    )
}


export default Course;