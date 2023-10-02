import { useEffect,} from "react";
import { useParams } from "react-router-dom";
import {Card,Typography, Grid} from '@mui/material'
import axios from 'axios';
import { courseState} from "../store/atoms/course";
import {useRecoilValue, useSetRecoilState } from "recoil";
import {isCourseLoading,courseTitle,courseVideo,courseSubTitle} from '../store/selectors/course';
import {BASE_URL} from '../config.js' 
import UpdateCard from "./Updatecard.jsx";
import ReactPlayer from 'react-player';

function Course(){
  
  const {id} = useParams();

  const setCourse = useSetRecoilState(courseState);
  const isLoading = useRecoilValue(isCourseLoading); 

  useEffect((()=>{
    
    axios.get(`${BASE_URL}/admin/course/${id}`,{headers:{
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
        <Grid container style={{padding:'40px'}}>
            <Grid item xs={12} md={6} lg={4}>
             <CourseCard />
            </Grid>
             <Grid item xs={12} sm={6} md={6} lg={6} style={{display:'flex',justifyContent:'center',flexDirection:'column',textAlign:'center'}}>
              <Topper/>
             </Grid>
            <Grid item xs={12} md={12} lg={12}>
           <UpdateCard/>
            </Grid>
        </Grid>
         <div style={{marginTop:'-400px',width:'100vw',minHeight:'60vh',backgroundColor:'#7933ff'}}>   
        </div> 
        </div>
    )
}

function Topper(){
    const title = useRecoilValue(courseTitle);
    const subTitle = useRecoilValue(courseSubTitle);
    
    return(
        <div style={{marginBottom:50,maxWidth:'72vw'}}>
        <Typography textAlign={'left'} fontSize={'30px'} fontWeight={700} color={'whitesmoke'} > {title}: {subTitle}</Typography>
        </div>
    )
}

function CourseCard(){
   
    const video = useRecoilValue(courseVideo);

    return(
    <Card style={{height:'210px',width:'375px'}}>
             <ReactPlayer
            url={video}
            controls={true}
            width='full'
            height='auto'
          />
    </Card>
    )
}


export default Course;