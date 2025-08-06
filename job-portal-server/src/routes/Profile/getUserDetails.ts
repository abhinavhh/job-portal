import express, { Request, Response } from 'express';
import User from '../../models/users'; // Adjust the path based on your project structure
import authenticateToken from '../../config/validateToken'; // Middleware that verifies JWT

const getUserDetailsRouter = express.Router();

// @route   GET /api/profile/details
// @desc    Get user profile details
// @access  Private
getUserDetailsRouter.get('/profile/details', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = req.user.id; // Extracted by validateToken middleware

    const user = await User.findById(userId).select(
      'username email phone portfolioLink socialLink'
    ); // Only return necessary fields

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'User profile details fetched successfully',
      data: user,
    });
  } catch (error) {
    console.error('Error fetching profile details:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
});

export default getUserDetailsRouter;
