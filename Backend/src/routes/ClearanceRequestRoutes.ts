import { Router } from 'express';
import { createClearanceRequest, getClearanceRequests, getClearanceRequestById, updateClearanceRequest, deleteClearanceRequest } from '@src/controllers/ClearanceRequestController';
import { authenticate } from '../utils/authentication';

const router = Router();

// Create a new clearance request
router.post('/', authenticate, createClearanceRequest);

// Get all clearance requests
router.get('/', authenticate, getClearanceRequests);

// Get a single clearance request by ID
router.get('/:id', authenticate, getClearanceRequestById);

// Update a clearance request by ID
router.put('/:id', authenticate, updateClearanceRequest);

// Delete a clearance request by ID
router.delete('/:id', authenticate, deleteClearanceRequest);

export default router;
