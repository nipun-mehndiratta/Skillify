import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import adminRouter from './routes/admin';
import userRouter from './routes/user';
const app = express();
const port = 3000;
require('dotenv').config();


app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI!, { dbName: "courses" });

//Routes
app.use("/admin",adminRouter);
app.use("/users",userRouter);



app.listen(port,()=>{console.log(`Server running on ${port}`)});