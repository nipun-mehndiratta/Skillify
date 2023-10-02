import express from 'express';
import jwt from 'jsonwebtoken';
import authenticatejwt from '../middleware/auth';
const router = express.Router();
import {Course,User} from '../db/index';
import { userCredentials } from '../validators';

require('dotenv').config();

const SecretKey = process.env.Secret_Key!;

//User Routes

router.post('/signup',async (req,res) => { 
    const parsedInput = userCredentials.safeParse(req.body);
    if(!parsedInput.success){
        return res.status(411).json({message:parsedInput.error});
    }
    const {username,password} = parsedInput.data;
    const user = await User.findOne({username});
    if (user){
       return res.send("User Already Exists");
    }
    const userdata = new User({username,password});
    await userdata.save();
    res.status(200).json({ message:"User created successfully"});
})

router.post('/login',(req,res) => {
    const parsedInput = userCredentials.safeParse(req.body);
    if(!parsedInput.success){
        return res.status(411).json({message:parsedInput.error});
    }
    const {username,password} = parsedInput.data;
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
    const courses = await Course.find({published:true}).populate('');
    res.status(200).json({courses});
})

router.post('/courses/:courseId',authenticatejwt, async (req,res)=>{
    const course = await Course.findById(req.params.courseId);
    if(course){
        const username = req.headers['user'];
        const user = await User.findOne({username});
            if(user){
                const courseId = course._id.toString(); 
                if (user.purchasedCourses.some(purchasedCourse => purchasedCourse.toString() === courseId)) {
                    return res.status(401).json({ message: "Course Already Purchased!" });
                }
                  user.purchasedCourses.push(course as {});
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
        const username = req.headers['user'];
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
            const username = req.headers['user'];
            const user = await User.findOne({ username }).populate('purchasedCourses');
            if (user) {
                const purchasedCourse = user.purchasedCourses.find(course => (course as any)._id == courseId);
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
   res.status(200).json(req.headers['user']);
})    

export default router;