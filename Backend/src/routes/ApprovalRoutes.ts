import { Router } from 'express';
import { createApproval, getApprovals, getApprovalById, updateApproval, deleteApproval } from '@src/controllers/ApprovalController';
import { authenticate } from '../utils/authentication';

const router = Router();

// Create a new approval
router.post('/', authenticate, createApproval);

// Get all approvals
router.get('/', authenticate, getApprovals);

// Get a single approval by ID
router.get('/:id', authenticate, getApprovalById);

// Update an approval by ID
router.put('/:id', authenticate, updateApproval);

// Delete an approval by ID
router.delete('/:id', authenticate, deleteApproval);

export default router;
