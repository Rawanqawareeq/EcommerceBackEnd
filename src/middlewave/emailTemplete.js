export const emailTemplate = (userName,token)=>{
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirm Your Email</title>
    <style>
        body { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9; }
        .container { max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
        h1 { color: #333; text-align: center; }
        p { font-size: 16px; color: #555; line-height: 1.5; }
        .btn { display: inline-block; background-color: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px; }
        .footer { margin-top: 20px; text-align: center; font-size: 12px; color: #999; }
        @media only screen and (max-width: 600px) {
            .container { padding: 15px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Confirm Your Email</h1>
        <p>Hello,${userName}</p>
        <p>Thank you for signing up. Please click the button below to confirm your email address.</p>
        <p style="text-align: center;">
            <a class="btn" href='http://localhost:7000/auth/comfirmEmail/${token}'>Confirm Your Email</a>
        </p>
        <p>If you didn’t request this email, you can safely ignore it.</p>
        <p>Thanks,<br>The [Your Company] Team</p>
        <div class="footer">
            &copy; 2024 Your Company. All rights reserved.
        </div>
    </div>
</body>
</html>
`;
}