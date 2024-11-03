import express from 'express';
import { authenticate } from '../utils/authentication';
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser
} from '../controllers/UserController';

const router = express.Router();

// Get all users
router.get('/', authenticate, getUsers);

// Get single user by ID
router.get('/:id', authenticate, getUserById);

//User login
router.post('/login', loginUser)

// Add user
router.post('/', createUser);

// Update user by ID
router.put('/:id', authenticate, updateUser);

// Delete user by ID
router.delete('/:id', authenticate, deleteUser);

export default router;
