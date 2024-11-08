import { Request, Response, NextFunction } from 'express';
import UserService from '@src/services/UserService';

// Create a new user
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await UserService.addOne(req.body);
    res.status(201).json(req.body);
  } catch (error) {
    next(error);
  }
};

// Get all users
export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await UserService.getAll();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

//User login
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
      let {
          identifier,
          password
      } = req.body;

      const token = await UserService.loginUser(identifier, password)

      res.json(token);

  } catch (error) {
      next(error);
  }

}

// Get a single user by ID
export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserService.getOneById(Number(req.params.id));
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    next(error);
  }
};

// Update a user by ID
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await UserService.updateOne(req.body);
    const updatedUser = await UserService.getOneById(Number(req.params.id));
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    next(error);
  }
};

// Delete a user by ID
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await UserService.delete(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};