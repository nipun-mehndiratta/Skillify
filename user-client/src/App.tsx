import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Appbar from './components/Appbar.tsx';
import Landing from './components/Landing.tsx';
import Signin from './components/Signin.tsx';
import Signup from './components/Singup.tsx';
import Courses from './components/Courses.tsx';
import Purchased from './components/Purchased.tsx';
import Course from './components/Course.tsx';
import {RecoilRoot, useSetRecoilState,} from 'recoil';
import { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from './config.ts';
import { userState } from './store/atoms/user.ts';

function App() {


  return (
   <div style={{minHeight:'100vh',width:'100vw',backgroundColor:'#05192d'}}>
    <RecoilRoot>
     <Router>
     <InitUser/> 
     <Appbar/>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path = "/login" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/> 
        <Route path="/courses" element={<Courses/>}/>
        <Route path="/purchases" element={<Purchased/>}/>
        <Route path="/course/:courseId" element={<Course/>}/>
     </Routes>
     </Router>
   </RecoilRoot>
   </div> 
  )
}


function InitUser(){

  const setUser = useSetRecoilState(userState);

  useEffect((()=>{
    try{
      axios.get(`${BASE_URL}/me`,{headers:{'Authorization':`Bearer ${localStorage.getItem("token")}`}}).then((res)=>{
       setUser(res.data);
      })
    }
    catch(error){
      console.log(error);
    }
  }),[])

  return(
    <></>
  )
}
export default App;
