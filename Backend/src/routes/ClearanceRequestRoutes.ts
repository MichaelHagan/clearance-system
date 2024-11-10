import { Router } from 'express';
import { createClearanceRequest, getClearanceRequests, getClearanceRequestById, updateClearanceRequest, deleteClearanceRequest, getClearanceRequestByUserId } from '@src/controllers/ClearanceRequestController';
import { authenticate } from '../utils/authentication';

const router = Router();

// Create a new clearance request
router.post('/', authenticate, createClearanceRequest);

// Get all clearance requests
router.get('/', authenticate, getClearanceRequests);

// Get a single clearance request by ID
router.get('/:id', authenticate, getClearanceRequestById);

// Get a single clearance request by User ID
router.get('/user/:userId', authenticate, getClearanceRequestByUserId);

// Update a clearance request by ID
router.put('/:id', authenticate, updateClearanceRequest);

// Delete a clearance request by ID
router.delete('/:id', authenticate, deleteClearanceRequest);

export default router;
