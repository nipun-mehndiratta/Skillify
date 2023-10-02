import {Card,Button,TextField, Typography} from '@mui/material/';
import {useState} from 'react'; 
import axios from 'axios'; 
import {useNavigate} from 'react-router-dom';
import {BASE_URL} from '../config.js';
import {typographyStyle} from "./styles.js"

function Signup(){
   
  const [email,setUsername] = useState(null);
  const [password,setPassword] = useState(" ");
  const navigate = useNavigate();

    return (
      
        <div style={{display:'flex',justifyContent:'center',paddingTop:150,marginBottom:10}}>

            <Card style={{width:400,padding:20}} variant="outlined">

             <Typography style={typographyStyle}> Create your free account</Typography>
             <TextField fullWidth label="Email" variant="outlined" onChange={(e)=>{setUsername(e.target.value)}}/>
             <br/><br/>
             <TextField type={'password'} fullWidth label="Password" variant="outlined" onChange={(e)=>{setPassword(e.target.value)}}/>
             <br/>
             <Button fullWidth variant="contained" style={{
              fontSize:'15px',
              marginTop:20,
              color:'whitesmoke',
              backgroundColor:'#ea5879',
              textTransform:'none'
              }}
              onClick={()=>{
              axios.post(`${BASE_URL}/admin/signup`,
              {username:email,
              password:password}).then((res)=>{
              if(res.data.message){
                alert("Signup Successful, Please Login!");
                navigate("/admin/login");
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