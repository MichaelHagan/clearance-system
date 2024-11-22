import { Router } from 'express';
import { createApproval, getApprovals, getApprovalById, updateApproval, deleteApproval, getApprovalsByClearanceRequestId, getApprovalsByDepartmentId, getApprovalsByUserId } from '@src/controllers/ApprovalController';
import { authenticate } from '../utils/authentication';
import { authorize } from '../utils/authorization';

const router = Router();

// Create a new approval
router.post('/', authenticate, createApproval);

// Get all approvals
router.get('/', authenticate, getApprovals);

// Get a single approval by ID
router.get('/:id', authenticate, getApprovalById);

// Get all approvals by Clearance Request Id
router.get('/clearance/:ClearanceRequestId', authenticate, getApprovalsByClearanceRequestId);

// Get all approvals by user ID
router.get('/user/:userId', authenticate, getApprovalsByUserId);

// Get all approvals by department ID
router.get('/department/:departmentId', authenticate, getApprovalsByDepartmentId);

// Update an approval by ID
router.put('/:id', authenticate, updateApproval);

// Delete an approval by ID
router.delete('/:id', authenticate, deleteApproval);

export default router;
