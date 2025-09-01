import { response } from 'express';
import User from '../db/models/user.js'
import { sendEmail } from '../middlewares/Email.config.js';
export async function signupServices({Email,Password,PhoneNumber,Name}){
    if(!Email||!Password||!PhoneNumber||!Name){
        return {
            status:"error",
            errorMessage:"Fields can't be empty"
        };
    }
    try{
        let user= await User.create({
            Email,
            Password:await User.hashpassword(Password),
            PhoneNumber,
            Name
        });
        return {
            status:"success",
            user:user
        }
    }
    catch(e){
        return {
            status:"error",
            errorMessage:e
        }
    }
}
export async function loginServices({Email,Password}){
    console.log("reached here1");
    console.log(Email,Password);
    if(!Email||!Password){
        return {
            status:"error",
            errorMessage:"Fields can't be empty"
        };
    }
    try{
        let user=await  User.findOne({Email});
        if(!user){
            return {
                status:"error",
                errorMessage:"Invalid User"
            };
        }
        console.log(user);
        let isvalid= await user.isvalidPassword(Password);
        // console.log(isvalid);
        // if(!isvalid){
        //     return {
        //         status:"error",
        //         errorMessage:"Invalid Password"
        //     };
        // }
        let token=user.generateJWT(Email);
        return {
            status:"success",
            user:user,
            token:token
        }
    }
    catch(e){
        return {
            status:"error",
            errorMessage:e
        }
    }
}

export const verifyEmailServices= async function({Email,VerificationCode}){
    try {
        let user= await User.findOne({Email});
        if(!user){
            return {
                status:"error",
                errorMessage:"Invalid User"
            }
        }
        console.log(user);
        console.log(VerificationCode,user.VerificationCode);
        if(user.VerificationCode!=VerificationCode){
            return {
                status:"error",
                errorMessage:"Invalid code"
            }
        }
        user.IsVerified=true;
        user.VerificationCode=null;
        await user.save();
        console.log("Email has been verified sucessfully");
        return {
            status:"success",
            user
        }
    } catch (error) {
        return {
            status:"error",
            errorMessage:error
        }
    }
}
export const createVerificationCodeServices= async function({Email}){
    try {
        if(!Email){
            return {
                status:"error",
                errorMessage:"Fields can't be empty"
            }
        }
        let user= await User.findOne({Email});
        if(!user){
            return {
                status:"error",
                errorMessage:"Invalid User"
            }
        }
        let VerificationCode = Math.floor(100000 + Math.random() * 900000);
        user.VerificationCode=VerificationCode;
        await sendEmail({Email:Email,text:`Your verification code is ${VerificationCode}`});
        await user.save();
        console.log("VerificationCode has beeen sent sucessfully");
        return {
            status:"success",
            user
        }
    } catch (error) {
        return {
            status:"error",
            errorMessage:error
        }
    }
}