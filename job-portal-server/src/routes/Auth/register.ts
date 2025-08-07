import express, { Request, Response } from 'express';
import User from '../../models/users';

const registerRouter = express.Router();

interface RegisterRequestBody {
  username: string;
  email: string;
  phone: string;
  password: string;
  userRole: string;
}

// Password strength regex
const isStrongPassword = (password: string): boolean => {
  // At least 8 chars, one uppercase, one lowercase, one number, one special char
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return strongPasswordRegex.test(password);
};

registerRouter.post('/register', async (req: Request<{}, {}, RegisterRequestBody>, res: Response): Promise<void> => {
  const { username, email, phone, password, userRole } = req.body;

  try {
    // Validate required fields
    if (!username || !email || !phone || !password || !userRole) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }

    // Password strength validation
    if (!isStrongPassword(password)) {
      res.status(400).json({
        message:
          'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character',
      });
      return;
    }

    // Check for duplicate email
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      res.status(400).json({ message: 'Email is already registered' });
      return;
    }

    // Check for duplicate username
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      res.status(400).json({ message: 'Username is already taken' });
      return;
    }

    // Create and save new user
    const newUser = new User({ username, email, phone, password, userRole });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default registerRouter;
