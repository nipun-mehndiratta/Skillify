import {Card,Button,TextField, Typography} from '@mui/material/';
import {useState} from 'react'; 
import axios from 'axios'; 
import {useNavigate} from 'react-router-dom';

function Signup(){
   
  const  [email,setUsername] = useState(null);
  const [password,setPassword] = useState(" ");
  const navigate = useNavigate();

    return (
      
        <div >
    
            <div style={{display:'flex',justifyContent:'center',paddingTop:150,marginBottom:10}}>
               <Typography variant={'h6'}> Welcome To Skillify. Signup Below </Typography>
            </div>
           
           {/* card */} 
           <div style={{display:'flex',justifyContent:'center'}}>
            <Card style={{width:400,padding:20}} variant="outlined">
          <TextField fullWidth label="Email" variant="outlined" onChange={(e)=>{setUsername(e.target.value)}}/>
          <br/><br/>
          <TextField fullWidth label="Password" variant="outlined" onChange={(e)=>{setPassword(e.target.value)}}/>
          <br/>
          <Button style={{marginTop:20}}variant="contained" onClick={()=>{
            axios.post("http://localhost:3000/admin/signup",{username:email,
            password:password}).then((res)=>{
              if(res.data.message){
                alert("Signup Successful, Please Login!");
                navigate("/login");
              }
              else{alert("Account Already Exists");}
          })}}>Signup</Button>
            </Card>
            </div> 
            
       </div>
    )
}

export default Signup;