import express, { Request, Response } from 'express';
import User from '../../models/users'; // Remove `.js` extension

const registerRouter = express.Router();

// Define request body type
interface RegisterRequestBody {
  username: string;
  email: string;
  phone: number;
  password: string;
}

registerRouter.post('/register', async (req: Request<{}, {}, RegisterRequestBody>, res: Response): Promise<void> => {
  const { username, email, phone, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const newUser = new User({
      username,
      email,
      phone,
      password,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default registerRouter;
