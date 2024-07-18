import  nodemailer from "nodemailer";
export async function sendEmail (to,subject,html){
    
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
    html,
  });

  return info;
}
