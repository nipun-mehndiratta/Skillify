const express = require('express');
const jwt = require('jsonwebtoken');
const {authenticatejwt} = require('../middleware/auth');
const router = express.Router();
const {Course,User} = require('../db/index')

require('dotenv').config();

const SecretKey = process.env.Secret_Key;

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
        res.status(200).json({message:"User Created Successfully"});
    })
    }
    catch(err){
        res.status(401).send("Missing username or password");
    }
})

router.post('/login',(req,res) => {
        const {username,password} = req.body;
        User.findOne({username,password}).then((userData) => {
            if(userData){
                const token = jwt.sign({username,role:"User"},SecretKey,{expiresIn:'1h'});
                res.status(200).json({message:"Logged in Successfully",token});
            }
            else{
                res.status(401).json({message:"Invalid username or password"});
            }
        })
})

router.get('/courses',authenticatejwt, async (req,res)=>{
    const courses = await Course.find({published:true}).populate();
    res.status(200).json({courses});
})

router.post('/courses/:courseId',authenticatejwt, async (req,res)=>{
    const cid = await Course.findById(req.params.courseId);
    if(cid){
        const username = req.user;
        const user = await User.findOne({username});
            if(user){
                if (user.purchasedCourses.some(purchasedCourse => purchasedCourse.equals(cid._id))) {
                    return res.status(401).json({ message: "Course Already Purchased!" });
                }
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

    router.get("/purchased/:courseId", authenticatejwt, async (req, res) => {
        const courseId = req.params.courseId;
        try {
            const username = req.user;
            const user = await User.findOne({ username }).populate('purchasedCourses');
            if (user) {
                const purchasedCourse = user.purchasedCourses.find(course => course._id == courseId);
                if (purchasedCourse) {
                    return res.status(200).json(purchasedCourse);
                } else {
                    return res.status(401).json({ message: "Course Not Purchased" });
                }
            }
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });

router.get('/me',authenticatejwt,async(req,res)=>{
   res.status(200).json(req.user);
})    

    module.exports=router;