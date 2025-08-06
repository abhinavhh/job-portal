import express, {Request, Response} from 'express';
import User from '../../models/users';
const VerifyOtpRouter = express.Router();

VerifyOtpRouter.post('/verify-otp', async (req: Request, res: Response): Promise<void> => {
  const { email, otp } = req.body as { email: string; otp: string };

  try {
    const user = await User.findOne({ email });
    if (!user || !user.otp || !user.otpExpires) {
      res.status(400).json({ error: 'Invalid request or OTP not generated' });
      return;
    }

    if (user.otp !== otp) {
      res.status(400).json({ error: 'Incorrect OTP' });
      return;
    }

    if (user.otpExpires < new Date()) {
      res.status(400).json({ error: 'OTP expired' });
      return;
    }

    // OTP is valid
    user.otp = "";
    user.otpExpires = new Date();
    await user.save();

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
export default VerifyOtpRouter;