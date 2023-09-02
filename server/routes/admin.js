const express = require('express');
const jwt = require('jsonwebtoken');
const {authenticatejwt} = require('../middleware/auth');
const router = express.Router();
const {Course,Admin} = require('../db/index');
require('dotenv').config();

const SecretKey = process.env.Secret_Key;

//Admin Routes
router.post('/signup',(req,res) => {
    const {username,password} = req.body; 
    function callback(admin){
    if (admin){
        res.send("Admin Already Exists");
    }
    else{
    const userdata = new Admin({username,password});
    userdata.save();
    res.status(200).json({ message:"Admin created successfully"});
    }
}
   Admin.findOne({username}).then(callback);
});

router.post('/login',async (req,res) => {
    const {username,password} = req.body;
       const admin =  await Admin.findOne({username,password});
       try{
            if(admin.username){
                const token = jwt.sign({username,role:"Admin"},SecretKey,{expiresIn:'1h'});
                res.status(200).json({message:"Logged in Successfully",token});
            }
        }
        catch(error){
                res.status(401).json({message:"Invalid username or password"});
        }
        } )
       

router.get("/me",authenticatejwt,(req,res)=>{
    let username = req.user;
    res.status(200).json(username); 
})

router.post('/courses',authenticatejwt, async (req,res) =>{
    if(req.role=='Admin'){
    const course = new Course(req.body);
    await course.save();
    res.status(200).json({message:"Course Created",courseId:course.id});
    }
    else{
        res.status(401).send("Not an Admin id");
    }
})

router.get("/course/:id",authenticatejwt,async (req,res)=>{
    let cid = req.params.id;
    try{
        let course = await Course.findById(cid).populate();
        res.status(200).json(course);
    }
    catch(error){
        res.status(404).json(error);
    }
})

router.put('/courses/:courseId',authenticatejwt, async (req,res)=>{
    if(req.role=="Admin"){
     const cid = req.params.courseId;
    const course = await Course.findByIdAndUpdate(cid,req.body,{new:true});
    if(course){
        res.status(200).json({message:"Course updated Successfuly"});
    }
    else{
        res.status(404).json({message:"Course not Found"});
    }
    }
    else{
        res.send("Not an Admin id");
    }
})

router.get('/courses',authenticatejwt,async (req,res) => {
    if(req.role=="Admin"){
        const courses = await Course.find().populate();
        res.status(200).json(courses);
    }
    else{
        res.send("Not an Admin id");
    }
})

module.exports=router;