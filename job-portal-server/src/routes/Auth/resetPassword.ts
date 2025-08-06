import express, { Request, Response }from 'express';
import User from '../../models/users';

const resetPasswordRouter = express.Router();

resetPasswordRouter.put('/reset-password', async (req: Request, res: Response): Promise<void> => {
    const { password, email } = req.body as { password: string; email: string };

    try{
        const user = await User.findOne({email});
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        user.password = password;
        await user.save();
        res.status(200).json({ message: 'Password reset successfully' });
    }
    catch( err: any) {
        res.status(500).json({ message: 'Error resetting password', error: err.message });
    }
 
})
export default resetPasswordRouter;