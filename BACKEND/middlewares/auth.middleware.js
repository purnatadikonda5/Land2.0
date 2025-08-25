import jwt from 'jsonwebtoken' 
export default function auth(req,res,next){
    try{
        const token=req.cookies.token || req.headers.authorization.split(' ')[1];
        if(!token){
            return res.json({error:"Unauthorized User"}).status(401);
        }
        let decodedUser=jwt.verify(token,process.env.jwtSECRET);
        req.user=decodedUser;
        next();
    }catch(e){
        return res.json({error:"Unauthorized User"}).status(401);
    }
}