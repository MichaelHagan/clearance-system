import { Router } from 'express';
import { createDepartment, getDepartments, getDepartmentById, updateDepartment, deleteDepartment } from '@src/controllers/DepartmentController';
import { authenticate } from '../utils/authentication';

const router = Router();

// Create a new department
router.post('/', authenticate, createDepartment);

// Get all departments
router.get('/', authenticate, getDepartments);

// Get a single department by ID
router.get('/:id', authenticate, getDepartmentById);

// Update a department by ID
router.put('/:id', authenticate, updateDepartment);

// Delete a department by ID
router.delete('/:id', authenticate, deleteDepartment);

export default router;
