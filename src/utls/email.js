import  nodemailer from "nodemailer";
import { emailTemplate } from "../middlewave/emailTemplete.js";
export async function sendEmail (to,subject,userName,token){
    
const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORDEMAIL,
    },
});
const info = await transporter.sendMail({
    from: `Rshope" <process.env.EMAIL>`, 
    to, 
    subject,
    html:emailTemplate(userName,token),
  });

  return info;
}
