import {Card, TextField, Typography,Button} from '@mui/material';
import axios from 'axios';
import { BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Signup(){

    const navigate = useNavigate();
      
    const [email,setEmail] = useState(null);
    const [password,setPassword] = useState(null);

    return(
      <div style={{display:'flex',justifyContent:'center',marginTop:'150px'}}>
        <Card style={{display:'flex',flexDirection:'column',width:400,padding:20}}>
            <Typography fontWeight={'bold'} textAlign={'center'} variant={'h5'}>Create your free account</Typography>
            <br/>
            <TextField fullWidth label={'Email'} onChange={(e)=>{
                setEmail(e.target.value);
            }}></TextField>
            <br/>
            <TextField type={'password'} fullWidth label={'Password'} onChange={(e)=>{
                setPassword(e.target.value);
            }}></TextField>
            <br/>
            <Button variant={"contained"} style={{textTransform:'none',backgroundColor:'#ea5879'}}
            onClick={()=>{
              axios.post(`${BASE_URL}/signup`,
              {username:email,
              password:password}).then((res)=>{
              if(res.data.message){
                alert("Signup Successful, Please Login!");
                navigate("/login");
              }
              else{
                alert("Account Already Exists");
              }
            }).catch((err)=>{
              alert("Please enter valid email and password");
            })
            }}>Sign up</Button>
        </Card>
      </div>
    )
} 

export default Signup;