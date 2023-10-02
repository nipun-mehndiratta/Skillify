import { Typography,Card, Grid} from "@mui/material";
import { useState,useEffect } from "react";
import axios from 'axios';
import { BASE_URL } from "../config";
import {useNavigate} from "react-router-dom";

function Purchased(){

    const [purchases,setPurchases] = useState([]);

   useEffect(()=>{
   
    const token = localStorage.getItem("token");

    try{
     axios.get(`${BASE_URL}/purchasedcourses`,{headers:{
        'Authorization':`Bearer ${token}`
     }}).then((res)=>{
        if(res.data){
            setPurchases(res.data.purchasedcourses);}
     })
    }
    
   catch(error){
     console.log("Failed to fetch courses data");
   } 

   },[])

   if(!purchases){
     
    return(
    <p>Loading...</p>
    )
   }

    return(
        <div>
        <Typography textAlign={'center'} variant={'h4'} fontWeight={'bold'} style={{color:'white',paddingBottom:'30px'}}>Your Courses</Typography>
        <Grid container>
         {purchases.map(course=>{
            return(
            <Grid key={course.id} item xs={12} md={6} lg={3} style={{display: 'flex', justifyContent: 'center', padding: '10px' }}>
            <CourseCard course={course}/>
            </Grid>
            )
         })}   
        </Grid>
        </div>
    )
}

function CourseCard({course}){

    const navigate = useNavigate();

    return(
        <Card style={{display:'flex',flexDirection:'column',width:'300px',height:'300px',borderRadius:'10px',cursor:'pointer'}} onClick={()=>{navigate(`/course/${course._id}`)}} >
         <img style={{widthFull:true,height:'150px'}} src={course.imageLink}/>
         <Typography  variant={'h6'} fontWeight={'bold'} style={{paddingLeft:'10px',marginTop:'5px'}}>{course.title}: {course.subtitle}</Typography>
        </Card>
    )
}

export default Purchased;