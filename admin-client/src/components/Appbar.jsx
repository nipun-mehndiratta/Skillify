import {Button} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {useRecoilState} from 'recoil';
import { userState } from "../store/atoms/user"; 

function Appbar(){

    const [userEmail,setUserEmail] = useRecoilState(userState);
    const navigate = useNavigate();
   

    if(userEmail){
         
  
        return(
            <div style={{display:"flex",justifyContent:"space-between"}}>
                <div>
                <img style={{width:100}} src="https://i.ibb.co/bR0D8k6/Screenshot-2023-08-15-at-7-25-38-PM-removebg-preview.png" onClick={()=>navigate("/")}/>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",height:35}} >
                  
                  <div style={{marginRight:10}}>
                 <Button variant="text" onClick={()=>{navigate("/addcourse")}}>Add Course</Button>
                 <Button variant="text" onClick={()=>{navigate("/courses")}}>Courses</Button>
                 </div>

                 <Button variant="contained" style={{marginRight:10}} onClick={()=>{localStorage.setItem("token",null);setUserEmail(null); navigate("/") }}>Logout</Button>
                 </div>
            </div>
        )
    }

    return(
        <div style={{display:"flex",justifyContent:"space-between"}}>
            <div>
             <img style={{width:100}} src="https://i.ibb.co/bR0D8k6/Screenshot-2023-08-15-at-7-25-38-PM-removebg-preview.png" />
            </div>
            <div>
            <Button variant="contained" style={{marginRight:10}} onClick={()=>{navigate("/login")}}>Signin</Button>
             <Button variant="contained" style={{marginRight:10}} onClick={()=>{navigate("/signup")}}>Signup</Button>
             </div>
        </div>
    )
    }

export default Appbar;