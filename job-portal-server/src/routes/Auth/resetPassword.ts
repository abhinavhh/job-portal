import express, { Request, Response } from 'express';
import User from '../../models/users';
import bcrypt from 'bcrypt'; // or bcrypt

const resetPasswordRouter = express.Router();

resetPasswordRouter.put('/reset-password', async (req: Request, res: Response): Promise<void> => {
  const { password, email } = req.body as { password: string; email: string };
  try {
    if (!password || password.length < 8) {
      res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long',
      });
      return;
    }

    const user = await User.findOne({ email }).select('+password');;
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }
    const isSame = await bcrypt.compare(password, user.password);
    if (isSame) {
      res.status(400).json({
        success: false,
        message: 'New password must be different from the old password',
      });
      return;
    }
    user.password = password;
    await user.save(); // this will hash the password via your schema

    res.status(200).json({
      success: true,
      message: 'Password reset successfully',
    });
  } catch (err: any) {
    console.error('Password reset error:', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

export default resetPasswordRouter;
