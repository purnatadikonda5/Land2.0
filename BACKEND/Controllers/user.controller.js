import { validationResult } from "express-validator"
import * as userServices from '../Services/user.services.js'
//validate 
export const  loginController= async (req,res)=>{
    console.log("reached here");
    let Errors=validationResult(req);
    if(!Errors.isEmpty()){
        return res.status(401).json({errors:Errors.array()});
    }
    let response= await userServices.loginServices(req.body);
    if(response.status=='success'){
        console.log(response);
        return res.status(200).json(response);
    }
    else return res.status(400).json({Error: response});
}
export const  signUpController= async (req,res)=>{
    let Errors=validationResult(req);
    if(!Errors.isEmpty()){
        return res.status(401).json({errors:Errors.array()});
    }
    let response= await userServices.signupServices(req.body);
    if(response.status=='success'){
        console.log(response);
        return res.status(200).json(response);
    }
    else return res.status(400).json({Error: response});
}
export const createVerificationCodeController= async (req,res)=>{
    let {Email}= req.body;
    if(!Email){
        return res.status(400).json({Error:"Fields can't be empty"});
    }
    try {
        let response= await userServices.createVerificationCodeServices({Email});
        if(response.status=='success'){
            return res.status(200).json(response);
        }
        else return res.status(400).json({Error: response});
    } catch (error) {
        return res.status(400).json({Error: error});
    }
};
export const verifyEmailController= async function(req,res){
    let {Email,VerificationCode}= req.body;
    if(!Email||!VerificationCode){
        return res.status(400).json({Error:"Fields can't be empty"});
    }
    try {
        let response= await userServices.verifyEmailServices({Email,VerificationCode});
        if(response.status=='success'){
            return res.status(200).json(response);
        }
        else return res.status(400).json({Error: response});
    } catch (error) {
        return res.status(401).json({Error: error});
    }
}