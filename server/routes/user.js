const express = require('express');
const jwt = require('jsonwebtoken');
const {authenticatejwt,SecretKey} = require('../middleware/auth');
const router = express.Router();
const {Course,User} = require('../db/index')



//User Routes

router.post('/signup',(req,res) => { 
    const {username,password} = req.body;
    try{
    User.findOne({username}).then((user) => {
        if(user){
          return res.send("User already Exists");
        }
        const userData = new User({username,password});
        userData.save();
        const token = jwt.sign({username,role:"User"},SecretKey,{expiresIn:'1h'});
        res.status(200).json({message:"User Created Successfully",token});
    })
    }
    catch(err){
        res.status(401).send("Missing username or password");
    }
})

router.post('/login',authenticatejwt,(req,res) => {
    if(req.role=="User"){
        const {username,password} = req.headers;
        User.findOne({username,password}).then((userData) => {
            if(userData){
                res.status(200).json({message:"Logged in Successfully"});
            }
            else{
                res.status(401).json({message:"Invalid username or password"});
            }
        })
    }
    else{res.status(401).send("Not An Userid")}
})

router.get('/courses',authenticatejwt, async (req,res)=>{
    const courses = await Course.find({published:true}).populate();
    res.status(200).json({courses});
})

router.post('/courses/:courseId',authenticatejwt, async (req,res)=>{//bugs-able to purchased unpublished courses,able to purchase same course twice
    const cid = await Course.findById(req.params.courseId);
    if(cid){
        const username = req.user;
        const user = await User.findOne({username});
            if(user){
                  await user.purchasedCourses.push(cid);
                  await user.save();
                  res.status(201).json({message:"Course purchased Successfully"})
            }
            else{
              res.status(403).json({message:"User doesnot exist"});
            }
       }
    else{
        res.status(404).json({message:"Course doesnot exist"});
    } })

router.get('/purchasedcourses',authenticatejwt,async (req,res)=>{
        const username = req.user;
        const user = await User.findOne({username}).populate('purchasedCourses');
        if(user){
            res.status(200).json({purchasedcourses:user.purchasedCourses});
        }
        else{
            res.status(403).json({message:"User doesnot exist"});
        } 
    })

    module.exports=router;