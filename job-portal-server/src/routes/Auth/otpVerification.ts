import express, { Request, Response } from 'express';
import User from '../../models/users';

const VerifyOtpRouter = express.Router();

VerifyOtpRouter.post('/verify-otp', async (req: Request, res: Response): Promise<void> => {
  const { email, otp } = req.body as { email: string; otp: string };

  try {
    const user = await User.findOne({ email });

    if (!user || !user.otp || !user.otpExpires) {
      res.status(400).json({
        success: false,
        message: 'Invalid request or OTP not generated',
      });
      return;
    }

    if (user.otp !== otp) {
      res.status(400).json({
        success: false,
        message: 'Incorrect OTP',
      });
      return;
    }

    if (user.otpExpires < new Date()) {
      res.status(400).json({
        success: false,
        message: 'OTP expired',
      });
      return;
    }

    // OTP is valid — clear OTP and expiry
    user.otp = '';
    user.otpExpires = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: 'OTP verified successfully',
    });
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

export default VerifyOtpRouter;
