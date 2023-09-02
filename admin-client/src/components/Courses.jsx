import { useEffect } from 'react';
import {useState} from 'react';
import {Card, Typography,Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../config';
import { coursesStyle } from './styles';

function Courses(){
     
    const [coursedata,setcoursedata] = useState([]);
    
    useEffect(()=>{
        axios.get(`${BASE_URL}/admin/courses`,{headers:{'Authorization':`Bearer ${localStorage.getItem("token")}`}}).then((res)=>{
            setcoursedata(res.data);
    })
    },[])

    return(
        <div>
       <Typography variant='h2' style={coursesStyle}>Manage and Enhance Online Learning Experience</Typography>
        <div style={{marginTop:30,display:"flex",flexWrap:'wrap',justifyContent:'center'}}>
            {coursedata.map(course => {
                return <Course course={course} />
            })}
        </div>
        </div>
    )
}

function Course(props){
    const navigate = useNavigate();

    return(
        <div >
        <Card color={'#fafafa'} style={{borderRadius:'8px',height:300,width:300,margin:10}}>
        <img style={{width:300,height:150}}src={props.course.imageLink} alt="image" />
            
            <Typography textAlign={'left'} marginLeft={'10px'} marginTop={'10px'} fontWeight={'bold'} color={"#002333"} variant='h6'>
                {props.course.title}: {props.course.subtitle}
            </Typography>
            
            <Button style={{marginLeft:'10px',marginBottom:'-60px',fontSize:'15px',color:'whitesmoke',backgroundColor:'#ea5879',textTransform:'none'}} variant="contained"
             onClick={()=>{
                navigate(`/admin/course/${props.course._id}`)}}>
                    Edit
            </Button>

            <Typography fontSize={'20px'} marginTop={'8px'} marginLeft={'230px'} color={'#556062'}>${props.course.price}</Typography>
            </Card>
       </div>
    )
}


export default Courses;