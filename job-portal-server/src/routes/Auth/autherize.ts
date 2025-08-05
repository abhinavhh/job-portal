import express, {Request, Response} from 'express';
const authRouter = express.Router();
import authenticateToken from '../../config/validateToken';

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

authRouter.get('/authorization', authenticateToken, (req: Request, res: Response) => {
    console.log('User authorized:', req.user);
    res.status(200).json({ message: 'Access granted', user: req.user });
});

export default authRouter;