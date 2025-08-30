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