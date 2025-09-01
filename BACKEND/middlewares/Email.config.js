import nodemailer from 'nodemailer';


let transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.userEmail,
        pass:process.env.userPass
    }
});
export const sendEmail = async ({Email,text})=>{
    try {
        let info =await transporter.sendMail({
            from:`${process.env.EmailName} <${process.env.userEmail}>`,
            to:Email,
            subject:"Verification Code",
            text:text,
            html:`<b>${text}</b>`
        })
        console.log(info);
    } catch (error) {
        console.log(error);
    }
}