const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const cors = require('cors');
const adminRouter = require('./routes/admin')
const userRouter = require('./routes/user');


app.use(cors());
app.use(express.json());

mongoose.connect('', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" });

//Routes
app.use("/admin",adminRouter);
app.use("/users",userRouter);



app.listen(port,()=>{console.log(`Server running on ${port}`)});