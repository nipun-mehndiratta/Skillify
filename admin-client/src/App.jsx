import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Signup from './components/Signup.jsx'
import Signin from './components/Signin.jsx'
import Appbar from './components/Appbar.jsx'
import AddCourse from './components/AddCourse.jsx'
import Courses from './components/Courses.jsx'
import Course from './components/Course.jsx'
import Landing from './components/Landing.jsx'
import {RecoilRoot,useSetRecoilState} from 'recoil';
import { useEffect } from 'react';
import {userState} from './store/atoms/user.js'; 
import axios from 'axios';

function App() {
  
  return (
    <div style={{width:'100vw',height:'100vh',backgroundColor:'#eeeeee',padding:5}} >
     
     <RecoilRoot>
       <Router>
        <InitUser/>
       <Appbar></Appbar>
      <Routes>
         <Route path="/" element = {<Landing/>} />
         <Route path="/login" element  = {<Signin/>} />
         <Route path="/signup" element = {<Signup/>} />
         <Route path="/addcourse" element = {<AddCourse/>} />
         <Route path="/courses" element = {<Courses/>} />
         <Route path ="/course/:id" element = {<Course/>} /> 
      </Routes>
      </Router>
      </RecoilRoot>
    </div>
  )
}

function InitUser(){

  const setUserEmail = useSetRecoilState(userState);

  useEffect((()=>{
   axios.get("http://localhost:3000/admin/me",{headers:{
      'Authorization': `Bearer ${localStorage.getItem("token")}`
     }}).then((response)=>{ setUserEmail(response.data);})
    
  }),[])
   return(
   <></>
   )
}

export default App
