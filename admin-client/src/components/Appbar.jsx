import {Button} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {useRecoilState} from 'recoil';
import { userState } from "../store/atoms/user"; 
import {logo} from '../assets/icons.js';



function Appbar(){

    const [userEmail,setUserEmail] = useRecoilState(userState);
    const navigate = useNavigate();
   

    if(userEmail){
         
  
        return(
            <div style={{display:"flex",justifyContent:"space-between"}}>
             
                <img style={{width:100}} src={logo} alt={"logo"} onClick={()=>navigate("/admin")}/>

                  <div style={{marginRight:10,marginTop:'10px'}}>
                 <Button style={{color:"white",textTransform: 'none',borderColor:'white'}} onClick={()=>{navigate("/admin/addcourse")}}>Add Course</Button>
                 <Button style={{color:"white",textTransform: 'none',borderColor:'white'}} onClick={()=>{navigate("/admin/courses")}}>Courses</Button>
                 <Button variant="contained" style={{marginLeft:10,textTransform: 'none',color:'inherit',backgroundColor:'white'}} 
                  onClick={()=>{
                    localStorage.setItem("token",null);
                    setUserEmail(null);
                    navigate("/admin") }}>Logout</Button>
                 </div>
            </div>
        )
    }

    return(
        <div style={{display:"flex",justifyContent:"space-between"}}>
            <div>
             <img style={{width:100}} src={logo} alt={"logo"} onClick={()=>navigate("/admin")} />
            </div>
            <div style={{marginTop:'10px'}}>
            <Button variant="outlined" style={{marginRight:10,color:"white",textTransform: 'none',borderColor:'white'}}
             onClick={()=>{navigate("/admin/login")}}>Sign in</Button>

             <Button variant="contained" style={{marginRight:10,textTransform: 'none',color:'inherit',backgroundColor:'white'}} 
             onClick={()=>{navigate("/admin/signup")}}>Get Started</Button>
             </div>
        </div>
    )
    }

export default Appbar;