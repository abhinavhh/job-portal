import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

// Extend Express Request to include "user"
interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}

const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Response | void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided' });
  }

  const jwtSecret = process.env.JWT_SECRET as string;

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    if (decoded !== undefined) {
      req.user = decoded;
      next();
    } else {
      return res.status(403).json({ message: 'Invalid token' });
    }
  });
};

export default authenticateToken;
