import { useEffect } from 'react';
import {useState} from 'react';
import {Card, Typography,Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Courses(){
     
    const [coursedata,setcoursedata] = useState([]);
    
    useEffect(()=>{
        axios.get("http://localhost:3000/admin/courses",{headers:{'Authorization':`Bearer ${localStorage.getItem("token")}`}}).then((res)=>{
            setcoursedata(res.data);
    })
    },[])

    return(
        <div style={{marginTop:30,display:"flex",flexWrap:'wrap',justifyContent:'center'}}>
            {coursedata.map(course => {
                return <Course course={course} />
            })}
        </div>
    )
}

function Course(props){
    const navigate = useNavigate();

    return(
        <div >
        <Card style={{borderRadius:'20px',height:300,width:300,margin:10}}>
            <Typography variant='h6' textAlign={'center'}>{props.course.title}</Typography>
            <br/>
            <Typography variant='subtitle1' textAlign={'center'}>{props.course.description}</Typography>
            <img style={{width:300,height:150}}src={props.course.imageLink} alt="image" />
            <Button style={{marginLeft:115,marginTop:10}} variant="contained" onClick={()=>{
                navigate(`/course/${props.course._id}`)
            }}>Edit</Button>
            </Card>
       </div>
    )
}


export default Courses;