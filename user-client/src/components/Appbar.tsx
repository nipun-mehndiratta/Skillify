import {logo} from '../assets/icons.js';
import {Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useRecoilState} from 'recoil';
import { userState } from '../store/atoms/user.js';

function Appbar(){

    const navigate = useNavigate();
    const [user,setUser] = useRecoilState(userState);

    if(!user){

    return(
        <div style={{display:'flex',justifyContent:'space-between'}}>
           <img style={{width:'100px'}} src={logo} alt={'logo'} onClick={()=>navigate("/")}/>
            <div style={{marginTop:'10px',marginRight:'10px'}}>
           <Button variant={'outlined'} style={{color:'white',borderColor:'white',textTransform:'none',marginRight:10}}
            onClick={()=>navigate("/login")}>Sign in</Button>
           <Button variant={'contained'} style={{color:'inherit',backgroundColor:'white',textTransform:'none'}}
            onClick={()=>navigate("/signup")}>Get Started</Button>
           </div>
        </div>
    )
   }

   return (
    <div style={{display:'flex',justifyContent:'space-between'}}>
    <img style={{width:'100px'}} src={logo} alt={'logo'} onClick={()=>navigate("/")}/>
     <div style={{marginTop:'10px',marginRight:'10px'}}>
        <Button style={{color:'white',textTransform:'none'}} onClick={()=>{
         navigate("/courses");
        }}>Courses</Button>
        <Button style={{color:'white',textTransform:'none',marginRight:'10px'}} onClick={()=>{
         navigate("/purchases")
        }}>Purchases</Button>
        <Button variant={'contained'} style={{color:'inherit',backgroundColor:'white',textTransform:'none'}} onClick={()=>{
         localStorage.setItem("token",null);
         setUser(null);
         navigate("/");
        }}>Logout</Button>
    </div>
 </div>
   )
} 

export default Appbar;
