import { Grid, Typography,Button  } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { userState } from "../store/atoms/user";
import {useRecoilValue} from "recoil";
import {landingPicture} from "../assets/icons"


function Landing(){

    return(
        <Grid container style={{ padding: '5vw' }}>

        <Grid item xs={12} md={6} lg={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        
          <Typography color="white" variant="h2">Skillify Admin</Typography>
          <Typography color="white" style={{ fontWeight: 'light'}} variant="h6">A place to Learn and Grow</Typography>
          <Buttons  />
        
        </Grid>

        <Grid item xs={12} md={6} lg={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ maxWidth: '80%', position: 'relative' }}>
          <img
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '10px',
            }}
            src={landingPicture}
            alt="landingPicture"
          />
        </div>
      </Grid>
    </Grid>
    )
}

function Buttons(){
 
    const userEmail = useRecoilValue(userState);

    const navigate = useNavigate();

    if(userEmail){
        return(
            <div style={{height:'20px'}}></div>
        )
    }
    return (
        <div style={{paddingBottom:'50px'}} >
            <Button style={{
              fontSize:'15px',
              height:'45px',
              marginTop:'20px',
              width:'245px',
              color:'whitesmoke',
              backgroundColor:'#ea5879',
              textTransform:'none'}} variant={'contained'} 
              onClick={()=>navigate("/admin/signup")}>Start Teaching</Button>
        </div>
    )
}

export default Landing;