import { Grid, Typography,Button  } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { userState } from "../store/atoms/user";
import {useRecoilValue} from "recoil";

function Landing(){

    return(
        <Grid container style = {{padding:"5vw"}}>
            <Grid item xs={12} md={6} lg={6}>
      <div style={{marginTop:100}}>
        <Typography fontWeight={'light'} variant={'h2'} >Skillify Admin</Typography>
        <Typography fontWeight={'light'} variant={'h6'} >A place to Learn and Grow</Typography>
         <Buttons/>
      </div>
      </Grid>
      <Grid item xs={12}  md={6} lg={6}>
      <img width={'100%'} src={"https://www.98thpercentile.com/hubfs/Imported_Blog_Media/Picture125-1.jpg"} alt={"logo"}/>
      </Grid>
      </Grid> 
    )
}

function Buttons(){
 
    const userEmail = useRecoilValue(userState);

    const navigate = useNavigate();

    if(userEmail){
        return(
            <></>
        )
    }
    return (
        <div >
            <Button style={{margin:20}} variant={'contained'} onClick={()=>navigate("/login")}>Signin</Button>
            <Button style={{margin:20}} variant={'contained'} onClick={()=>navigate("/signup")}>Signup</Button>
        </div>
    )
}

export default Landing;