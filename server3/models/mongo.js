const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');


const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())


mongoose.connect("mongodb://localhost:27017/Database",{
    useNewUrlParser:true,
    useUnifiedTopology: true
}, ()=>{
    console.log("DB connected")
})



//schema


const userSchema = new mongoose.Schema({
    username: String,
        email: String,
        publicKey: String,
        createdTime: Number,
        updatedTime: Number,
        isActive: Boolean
})

const User =new mongoose.model("User", userSchema)

// Routes


const signIn =  async (email) => {
    const Email = email;
    
    const data = await User.findOne({email:Email});
        if(data !== undefined){
            return data;
        }
        else{
            return 'No Data Found'
        }

}

const signUP = (username,email, publicKey) => {
    const createdTime = Date.now()
    const UserData = new User({
        username,
        email,
        publicKey,
        createdTime
    })

    UserData.save(err => {
        if(err) {
            throw new Error('Error occurred while registering data')
        } else {
            return "Successfully Registered"
        }
    })

    // check if email already exists
    // if(checkDuplicateEmail(email)){
    //     return "Email already exist";
    // } else{
    //     const UserData = new User({
    //         username,
    //         email,
    //         puKey
    //     })

    //     UserData.save(err => {
    //         if(err) {
    //             throw new Error('Error occurred while registering data')
    //         } else {
    //             return "Successfully Registered"
    //         }
    //     })
    // }

}
module.exports = {signIn, signUP};


// app.listen(9000,()=>{
// console.log("BackEnd Running")
// })