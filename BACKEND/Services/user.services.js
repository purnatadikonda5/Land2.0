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