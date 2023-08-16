import {Card,Button,TextField, Typography} from '@mui/material/';
import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userState } from '../store/atoms/user';


function Signin(){

   const setUser = useSetRecoilState(userState);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();

    return (
        <div >
            
            <div style={{display:'flex',justifyContent:'center',paddingTop:150,marginBottom:10}}>
               <Typography variant={'h6'}> Welcome Back. Signin Below </Typography>
            </div>
           
           {/* card */} 
           <div style={{display:'flex',justifyContent:'center'}}>
            <Card style={{width:400,padding:20}} variant="outlined">
          <TextField fullWidth id="outlined-basic" label="Email" variant="outlined" onChange={(e)=>setEmail(e.target.value)} />
          <br/><br/>
          <TextField fullWidth id="outlined-basic2" label="Password" variant="outlined" onChange={(e)=>setPassword(e.target.value)}/>
          <br/>
          <Button style={{marginTop:20}}variant="contained" onClick={async ()=>{
            try{
            const response = await axios.post("http://localhost:3000/admin/login",{username:email,password:password});
            alert(response.data.message);
            setUser(email);
            localStorage.setItem("token",response.data.token);
               navigate("/courses");
          }
          catch(error){
            alert("Invalid Username or Password");
          }
           } }>Signin</Button>
            </Card>
            </div>
            
       </div>
    )
}

export default Signin;