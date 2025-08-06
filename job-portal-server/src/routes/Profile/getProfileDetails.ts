import express, { Request, Response } from 'express';
import authenticateToken from '../../config/validateToken';
import User from '../../models/users';

const getProfileRouter = express.Router();

getProfileRouter.get('/profile', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = req.user.id; // Set by authenticateToken middleware

    const user = await User.findById(userId).select('education experience skills');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      education: user.education || [],
      experience: user.experience || [],
      skills: user.skills || []
    });
  } catch (error) {
    console.error('Error fetching profile details:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default getProfileRouter;
