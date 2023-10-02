import {Card, TextField, Typography,Button} from '@mui/material';
import axios from 'axios';
import { BASE_URL } from '../config';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { userState } from '../store/atoms/user';
import { useNavigate } from 'react-router-dom';

function Signin(){

 const [email,setEmail] = useState(null);
 const [password,setPassword] = useState(null);
 const SetUser = useSetRecoilState(userState); 

 const navigate = useNavigate();

    return(
      <div style={{display:'flex',justifyContent:'center',marginTop:'150px'}}>
        <Card style={{display:'flex',flexDirection:'column',width:400,padding:20}}>
            <Typography fontWeight={'bold'} textAlign={'center'} variant={'h5'}>Welcome Back!</Typography>
            <br/>
            <TextField fullWidth label={'Email'} onChange={(e)=>{
                setEmail(e.target.value);
            }} ></TextField>
            <br/>
            <TextField type={'password'} fullWidth label={'Password'} onChange={(e)=>{
                setPassword(e.target.value);
            }} ></TextField>
            <br/>
            <Button variant={"contained"} style={{textTransform:'none',backgroundColor:'#ea5879'}}
             onClick={async ()=>{
             try{
              const username = email;  
              const response = await axios.post(`${BASE_URL}/login`,{username,password});
              alert(response.data.message);
              localStorage.setItem("token",response.data.token);
              SetUser(email);
              navigate("/courses");
             }
             catch(error){
                alert("Invalid Username Or Password")
             }
             }}>Sign in</Button>
        </Card>
      </div>
    )
} 

export default Signin;