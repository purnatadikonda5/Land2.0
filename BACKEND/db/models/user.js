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
    password:{
        type:String,
        required:true
    },
    // Lands:[{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:Land
    // }],
    MobileNumber:{
        type:String,
        minLength:[10,"Number should contain exactly 10 characters"],
        maxength:[10,"Number should contain exactly 10 characters"],
        required:true
    }
});
userschema.statics.hashpassword=async (password)=>{
    return await bcrypt.hash(password,10);
};
userschema.methods.generateJWT= (email)=>{
    return jwt.sign({email:email},process.env.jwtSECRET);
};
userschema.methods.isvalidPassword=async (password)=>{
    return await bcrypt.compare(password,this.password);
}
const User= mongoose.model("User",userschema);


export default User;