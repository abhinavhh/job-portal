import express, { Request, Response } from 'express';
import User from '../../models/users';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const ForgetPassRouter = express.Router();

ForgetPassRouter.post('/forget-password', async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body as { email: string };

    try {
        const user = await User.findOne({ email });

        if (!user) {
            res.status(404).json({
                success: false,
                message: 'Email not found. Please check and try again.',
            });
            return;
        }

        // Generate a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Save OTP and expiry to user document
        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save();

        // Setup nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is ${otp}. It is valid for 10 minutes.`,
        };

        // Send OTP email
        await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            message: 'OTP sent to your email.',
        });
    } catch (error) {
        console.error('Error in forget-password:', error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again later.',
        });
    }
});

export default ForgetPassRouter;
