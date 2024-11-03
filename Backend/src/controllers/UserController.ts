import { Request, Response } from 'express';
import UserService from '@src/services/UserService';

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    await UserService.addOne(req.body);
    res.status(201).json(req.body);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// Get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserService.getAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

//User login
export const loginUser = async (req: Request, res: Response) => {
  try {
      let {
          identifier,
          password
      } = req.body;

      const token = await UserService.loginUser(identifier, password)

      res.json(token);

  } catch (e) {
      console.log(e)
  }

}

// Get a single user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await UserService.getOneById(Number(req.params.id));
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

// Update a user by ID
export const updateUser = async (req: Request, res: Response) => {
  try {
    await UserService.updateOne(req.body);
    const updatedUser = await UserService.getOneById(Number(req.params.id));
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// Delete a user by ID
export const deleteUser = async (req: Request, res: Response) => {
  try {
    await UserService.delete(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};