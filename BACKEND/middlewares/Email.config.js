import nodemailer from 'nodemailer';


let transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"purnatadikonda5@gmail.com",
        pass:"fusy rast rnjf ujlj"
    }
});
let sendEmail = async ()=>{
    try {
        let info =await transporter.sendMail({
            from:'"nenu vedavani "<purnatadikonda5@gmail.com>',
            to:"lcs2023049@iiitl.ac.in",
            subject:"Hello",
            text:"Hello ra kittu",
            html:"<b>Hello ra kittu</b>"
        })
        console.log(info);
    } catch (error) {
        console.log(error);
    }
}
sendEmail();