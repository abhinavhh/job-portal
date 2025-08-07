import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../../models/users';

dotenv.config();

const Loginrouter = express.Router();

Loginrouter.post('/login', async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body as { email: string; password: string };

    // Check for missing credentials
    if (!email || !password) {
        res.status(400).json({ message: 'Email and password are required.' });
        return;
    }

    try {
        const user = await User.findOne({ email }).select('+password');

        // User not found
        if (!user) {
            res.status(404).json({ message: 'No account found with this email address.' });
            return;
        }

        const isMatch = await user.comparePassword(password);

        // Password mismatch
        if (!isMatch) {
            res.status(401).json({ message: 'Incorrect password. Please try again.' });
            return;
        }

        // JWT secret must exist
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            res.status(500).json({ message: 'JWT secret is not configured on the server.' });
            return;
        }

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
                role: user.role
            },
            jwtSecret,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Login successful.',
            token,
            id: user._id,
            username: user.username,
            role: user.role,
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'An unexpected error occurred while processing your login. Please try again later.' });
    }
});

export default Loginrouter;
