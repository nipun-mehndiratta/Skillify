import {Card,Button,TextField, Typography} from '@mui/material/';
import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userState } from '../store/atoms/user';
import {typographyStyle} from './styles.js';
import { BASE_URL } from '../config';


function Signin(){

  const setUser = useSetRecoilState(userState);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();

    return (
        <div style={{paddingTop:150,marginBottom:10,display:'flex',justifyContent:'center'}} >

         <Card style={{width:400,padding:20}} variant="outlined">
            <Typography style={typographyStyle}> Welcome Back!</Typography>         
            <TextField fullWidth id="outlined-basic" label="Email" variant="outlined" onChange={(e)=>setEmail(e.target.value)} />
            <br/><br/>
            <TextField type={'password'} fullWidth id="outlined-basic2" label="Password" variant="outlined" onChange={(e)=>setPassword(e.target.value)}/>
            <br/>
            <Button fullWidth style={{
              fontSize:'15px',
              marginTop:20,
              color:'whitesmoke',
              backgroundColor:'#ea5879',
              textTransform:'none'}}variant="contained" 
              onClick={async ()=>{
              try{
               const response = await axios.post(`${BASE_URL}/admin/login`,{username:email,password:password});
               alert(response.data.message);
               setUser(email);
               localStorage.setItem("token",response.data.token);
               navigate("/admin/courses");
              }
              catch(error){
               alert("Invalid Username or Password");
              }
           } }>Sign in</Button>
        </Card>
       </div>
    )
}

export default Signin;