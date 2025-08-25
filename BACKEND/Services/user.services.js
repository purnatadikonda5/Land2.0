import User from '../db/models/user.js'
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