const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedCourses: [{type:mongoose.Types.ObjectId,ref:'Course'}]
});

const adminSchema = new mongoose.Schema({
      username:String,
      password:String
    });

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean,
})

const User = new mongoose.model('User',userSchema);
const Admin = new mongoose.model('Admin',adminSchema);
const Course = new mongoose.model('Course',courseSchema);

module.exports = {
User,
Admin,
Course
}