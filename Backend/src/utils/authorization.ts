import { Request, Response, NextFunction } from 'express';

export const authorize = (requiredRole: string) => {

    return (req: Request, res: Response, next: NextFunction): void => {
    const authorized = req.role === requiredRole;

      if (authorized) {
  
        next();
  
      } else {
  
        res.status(403).json({ message: 'Forbidden' });
  
      }
  
    };
  
  };