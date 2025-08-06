import express from 'express';
import { Request, Response } from 'express';
import User from '../../models/users'; // adjust the path based on your structure
import authenticateToken from '../../config/validateToken';

const profileUpdateRouter = express.Router();

// Update Profile Route (Protected)
profileUpdateRouter.put('/profile/update', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = req.user.id; // Set by the authentication middleware

    const {
      education,
      experience,
      skills,
    }: {
      education?: {
        collegeName: string;
        startYear: number;
        endYear: number;
        subjects: string[];
        achievements: string[];
      }[];
      experience?: {
        companyName: string;
        position: string;
        startYear: number;
        endYear: number;
        achievements: string[];
      }[];
      skills?: string[];
    } = req.body;

    const updatedFields: any = {};
    if (education) updatedFields.education = education;
    if (experience) updatedFields.experience = experience;
    if (skills) updatedFields.skills = skills;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updatedFields },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default profileUpdateRouter;
