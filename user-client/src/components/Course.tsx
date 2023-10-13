import { Typography,Grid } from '@mui/material';
import ReactPlayer from 'react-player';
import {useParams} from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';
import { useState } from 'react';


function Course(){

const {courseId} = useParams();
const [purchasedCourse,setpurchasedCourse] = useState(null);

useEffect(()=>{
  try{
     axios.get(`${BASE_URL}/purchased/${courseId}`,{headers:{
      'Authorization':`Bearer ${localStorage.getItem("token")}`
     }}).then((res)=>{
        setpurchasedCourse(res.data);
     })
  }
  catch(error){
    console.log(error);
  }
},[])

if(!purchasedCourse){
  return (
    <p>Loading..</p>
  )
}

    return (
      <div style={{padding:'30px'}}>
        <Grid container>
          <Grid item xs={12} md={6} lg={6}>
          <ReactPlayer
            url={purchasedCourse.videoLink}
            controls={true}
            width='full'
            height='auto'
          />
          </Grid>
         <Grid item xs={12} md={6} lg={6} style={{display:'flex',justifyContent:'center',flexDirection:'column',textAlign:'center'}}>
         <Typography style={{fontSize:'5vh'}} fontWeight={'bold'} color={'whitesmoke'}>{purchasedCourse.title}: {purchasedCourse.subtitle}</Typography>
          </Grid>
          <div style={{width:'auto',maxWidth:'600px',minHeight:'420px',backgroundColor:'inherit',paddingTop:'30px'}}>
             <Typography color={'#ffffff'} variant='h5' fontWeight={'bold'}>About This Class</Typography>
             <br/>
             <Typography color={'#c5cacf'}>{purchasedCourse.description}</Typography>
          </div>
         </Grid>
        </div>
      );
}

export default Course;
