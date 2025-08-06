import express, { Request, Response } from 'express';
import User from '../../models/users';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const ForgetPassRouter = express.Router();


ForgetPassRouter.post('/forget-password', async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body as { email: string };
    console.log(email);
    try {

        const user = await User.findOne({ email});
        if (!user) {
            res.status(404).json({error: 'Email Not Found'});
            return;
        }
        else {
            // Generate OTP
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            console.log(otp);
            // write logic to send OTP to user's email
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });
            console.log(process.env.EMAIL_USER);

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Password Reset OTP',
                // email content
                text: `Your OTP for password reset is ${otp}. It is valid for 10 minutes.`
            }

            // send mail
            await transporter.sendMail(mailOptions);

            res.status(200).json({message: 'OTP sent to your email'});
        }
    }
    catch (error: any) {
        res.status(500).json({error: 'Internal Server Error'});
    }
})
export default ForgetPassRouter;
