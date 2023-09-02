import { Typography,Button,Grid } from "@mui/material";
import { landingPicture } from "../assets/icons.js"
import { useNavigate} from "react-router-dom";
import { userState } from "../store/atoms/user.js";
import { useRecoilValue } from "recoil";

function Landing(){

    return(
        <Grid container>
         <Grid item xs={12} md={6} lg={6} 
         style={{display:'flex',flexDirection:'column',justifyContent:'center',paddingLeft:'100px'}} >   
        <Typography variant={'h2'} style={{color:'white'}}>Skillify</Typography>
        <Typography variant={'h6'} style={{color:'white'}}>A place To Learn and Grow</Typography>
        <LearningButton/>
        </Grid>
        <Grid item xs = {12} md={6} lg={6} 
        style={{display:'flex',flexDirection:'column',justifyContent:'center',paddingTop:'40px',paddingLeft:'40px'}} >
        <img style={{width:'90%',borderRadius:'10px'}} src={landingPicture} alt={'logo'}/>
        </Grid>
        </Grid>
    )
}

function LearningButton(){

    const user = useRecoilValue(userState);

    const navigate = useNavigate();

    if(!user){

    return(
        <Button 
         variant={'contained'} 
         style={{width:'250px',height:'45px',marginTop:'10px',textTransform:'none',backgroundColor:'#ea5879'}}
        onClick={()=>navigate("/signup")}>Start Learning</Button>
    )
   }
   return(
    <></>
   )
}

export default Landing;