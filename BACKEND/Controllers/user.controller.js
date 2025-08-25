import { validationResult } from "express-validator"
import 

//validate 
export const  loginController= async (req,res)=>{
    let Errors=validationResult(req);
    if(!Errors.isEmpty()){
        return res.status(401).json({errors:Errors.array()});
    }
    
}
export const  signUpController= async (req,res)=>{
    let Errors=validationResult(req);
    if(!Errors.isEmpty()){
        return res.status(401).json({errors:Errors.array()});
    }
    let response= await userSer
}