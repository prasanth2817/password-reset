import nodemailer from 'nodemailer';
import dotenv from "dotenv"
dotenv.config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASSWORD,
    },
});

const sendMail = async ({ to, subject, text, html }) => {
    try {
        const mailOptions = { from:process.env.EMAIL_USER , to, subject, text, html };
        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent:', result);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};



export default {sendMail}


// const forgetPassword = async({name,email,url})=>{
//     try {
//         let to = email
//         let subject = 'Reset Password Request'
//         let html = `
//         <p>Dear ${name},</p>
//         <p>We have received your request to reset the password. If you really want to reset it kindly click the button below.</p>
//         <button style="background-color: black; border: none; padding: 5px;"> 
//             <a href="${url}" style="text-decoration: none; color: white;">Reset Passoword</a>
//         </button>
//         <p>* If the above button does not work kindly click the url. <a href="${url}">${url}</a></p>`

//         await sendMail({to,subject,text:html,html})

//     } catch (error) {
//         return error
//     }
// }
