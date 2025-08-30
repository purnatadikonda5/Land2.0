import express from 'express';
import connect from './db/connect.js';
import userrouter from './Routes/user.routes.js';

let app=express();
app.listen(3000,()=>{console.log("server is listening at port 3000")});
await connect();
app.get("/home",(req,res)=>{
    console.log("Got a request to home page");
    res.send("hi");
});
app.use(express.json());
app.use('/user',userrouter);
export default app;
