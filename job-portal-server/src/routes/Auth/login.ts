import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../../models/users';

dotenv.config();

const Loginrouter = express.Router();

Loginrouter.post('/login', async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body as { email: string; password: string };
    try {
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            console.error('Invalid credentials for user:', email);
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        console.log('User logged in successfully:', email);

        // Type assertion for JWT_SECRET
        const jwtSecret = process.env.JWT_SECRET as string;

        const token = jwt.sign(
            { username: user.username, role: user.role },
            jwtSecret,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful', token, id: user._id });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default Loginrouter;
