import express from 'express';
import jwt from 'jsonwebtoken';
import authenticatejwt from '../middleware/auth';
import {Course,Admin} from '../db/index';
import { userCredentials,courseInput } from '../validators';
const router = express.Router();
require('dotenv').config();


const SecretKey = process.env.Secret_Key!;

//Admin Routes
router.post('/signup',async (req,res) => {
    const parsedInput = userCredentials.safeParse(req.body); 
    if(!parsedInput.success){
        return res.status(411).json({message:parsedInput.error});
    }
    const {username,password} = parsedInput.data;
    const admin = await Admin.findOne({username});
    if (admin){
       return res.send("Admin Already Exists");
    }
    const userdata = new Admin({username,password});
    await userdata.save();
    res.status(200).json({ message:"Admin created successfully"});
}
);

router.post('/login',async (req,res) => {
    const parsedInput = userCredentials.safeParse(req.body); 
    if(!parsedInput.success){
        return res.status(411).json({message:parsedInput.error});
    }
    const {username,password} = parsedInput.data;
       const admin =  await Admin.findOne({username,password});
       if(!admin){
        return res.status(401).json({message:"Invalid username or password"});
       }
       try{
            if(admin.username){
                const token = jwt.sign({username,role:"Admin"},SecretKey,{expiresIn:'1h'});
                res.status(200).json({message:"Logged in Successfully",token});
            }
        }
        catch(error){
                res.status(401).json({message:"Invalid username or password"});
        }
        })
       

router.get("/me",authenticatejwt,(req,res)=>{
    const username = req.headers["user"];
    return res.status(200).json(username); 
})


router.post('/courses',authenticatejwt, async (req,res) =>{
    if(req.headers['role']=='Admin'){
    const parsedInput = courseInput.safeParse(req.body);  
    if(!parsedInput.success){
        return res.status(411).json({message:parsedInput.error});
    }  
    const course = new Course(parsedInput.data);
    await course.save();
    return res.status(200).json({message:"Course Created",courseId:course.id});
    }
    
     return res.status(401).send("Not an Admin id");
    
})

router.get("/course/:id",authenticatejwt,async (req,res)=>{
    let cid = req.params.id;
    try{
        let course = await Course.findById(cid).populate('');
        res.status(200).json(course);
    }
    catch(error){
        res.status(404).json(error);
    }
})

router.put('/courses/:courseId',authenticatejwt, async (req,res)=>{
    if(req.headers['role']=="Admin"){
     const cid = req.params.courseId;
     const parsedInput = courseInput.safeParse(req.body);  
    if(!parsedInput.success){
        return res.status(411).json({message:parsedInput.error});
    }  
    const course = await Course.findByIdAndUpdate(cid,parsedInput.data,{new:true});
    if(course){
       return res.status(200).json({message:"Course updated Successfuly"});
    }
 
      return res.status(404).json({message:"Course not Found"});
 
    }
   
    return res.send("Not an Admin id");
    
})

router.get('/courses',authenticatejwt,async (req,res) => {
    if(req.headers['role']=="Admin"){
        const courses = await Course.find().populate('');
        res.status(200).json(courses);
    }
    else{
        res.send("Not an Admin id");
    }
})

export default router;