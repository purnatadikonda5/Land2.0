// user(Name,Email,MobileNumber,Password,Lands[(land id)])

// land(state,city,village,area,amount,pics,owner,history)
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const userschema= new mongoose.Schema({
    Name:{
        type: String,
        minLength:[3,"Name should contain atleast 3 characters"],
        required: true
    },
    Email:{
        type: String,
        minLength:[3,"Name should contain atleast 3 characters"],
        maxength:[30,"Name should contain less than 31 characters"],
        required: true
    },
    Password:{
        type:String,
        required:true
    },
    // Lands:[{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:Land
    // }],
    PhoneNumber:{
        type:String,
        minLength:[10,"Number should contain exactly 10 characters"],
        maxength:[10,"Number should contain exactly 10 characters"],
        required:true
    }
});
userschema.statics.hashpassword=async (Password)=>{
    return await bcrypt.hash(Password,10);
};
userschema.methods.generateJWT= (email)=>{
    return jwt.sign({email:email},process.env.jwtSECRET);
};
userschema.methods.isvalidPassword=async function(Password){
    console.log(Password,this.Password);
    return await bcrypt.compare(Password,this.Password);
};
const User= mongoose.model("User",userschema);


export default User;