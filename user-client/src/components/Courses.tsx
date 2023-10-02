import { Typography,Card, Button, Grid } from "@mui/material";
import { useState,useEffect } from "react";
import axios from 'axios';
import { BASE_URL } from "../config";

function Courses(){

    const [coursesData,setCourses] = useState([]);

   useEffect(()=>{
   
    const token = localStorage.getItem("token");

    try{
     axios.get(`${BASE_URL}/courses`,{headers:{
        'Authorization':`Bearer ${token}`
     }}).then((res)=>{
        if(res.data){
        setCourses(res.data.courses);}
     })
    }
    
   catch(error){
     console.log("Failed to fetch courses data");
   } 

   },[])

   if(!coursesData){
     
    return(
    <p>Loading...</p>
    )
   }

    return(
        <div>
        <Typography
          textAlign="center"
          variant="h4"
          fontWeight="bold"
          style={{ color: 'white', paddingBottom: '30px' }}
        >
          Explore Courses
        </Typography>
        <Grid container>
          {coursesData.map((course) => (
            <Grid
              key={course.id} 
              item
              xs={12}
              md={6}
              lg={3}
              style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}
            >
              <Course course={course} />
            </Grid>
          ))}
        </Grid>
      </div>
    )
}

function Course({course}){

    const token = localStorage.getItem("token");

    return(
        <Card style={{display:'flex',flexDirection:'column',width:'300px',height:'300px',borderRadius:'10px'}} >
         <img style={{widthFull:true,height:'150px'}} src={course.imageLink}/>
         <Typography  variant={'h6'} fontWeight={'bold'} style={{paddingLeft:'10px',marginTop:'5px'}}>{course.title}: {course.subtitle}</Typography>
         <div style={{display:'flex',position:'absolute',marginTop:'252px',}}>
         <Button variant={'contained'} style={{marginLeft:'10px',backgroundColor:'#ea5879',width:'95px',textTransform:'none'}} onClick={async ()=>{
            try {
                console.log("Sending request...");
                const response = await axios.post(
                    `${BASE_URL}/courses/${course._id}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                alert(response.data.message);
            } catch (error) {
                alert("Course Already Purchased");
            }
         }}>Purchase</Button>
         <Typography variant={'h6'} style={{color:'#556062',marginLeft:'130px'}}>${course.price}</Typography>
         </div>
        </Card>
    )
}

export default Courses;