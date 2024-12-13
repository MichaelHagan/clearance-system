import { Request, Response, NextFunction } from 'express';
import ClearanceRequestService from '@src/services/ClearanceRequestService';

// Create a new clearance request
export const createClearanceRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const clearance = await ClearanceRequestService.addOne(req.body);
    res.status(201).json(clearance);
  } catch (error) {
    next(error);
  }
};

// Get all clearance requests
export const getClearanceRequests = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const clearanceRequests = await ClearanceRequestService.getAll();
    res.status(200).json(clearanceRequests);
  } catch (error) {
    next(error);
  }
};

// Get a single clearance request by ID
export const getClearanceRequestById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const clearanceRequest = await ClearanceRequestService.getOneById(Number(req.params.id));
    if (clearanceRequest) {
      res.status(200).json(clearanceRequest);
    } else {
      res.status(404).json({ error: 'Clearance request not found' });
    }
  } catch (error) {
    next(error);
  }
};

// Get a single clearance request by User ID
export const getClearanceRequestByUserId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const clearanceRequest = await ClearanceRequestService.getOneByUserId(Number(req.params.userId));
    if (clearanceRequest) {
      res.status(200).json(clearanceRequest);
    } else {
      res.status(404).json({ error: 'Clearance request not found' });
    }
  } catch (error) {
    next(error);
  }
};

// Update a clearance request by ID
export const updateClearanceRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let {id} = req.params;
    await ClearanceRequestService.updateOne(req.body, parseInt(id));
    const updatedClearanceRequest = await ClearanceRequestService.getOneById(Number(req.params.id));
    if (updatedClearanceRequest) {
      res.status(200).json(updatedClearanceRequest);
    } else {
      res.status(404).json({ error: 'Clearance request not found' });
    }
  } catch (error) {
    next(error);
  }
};

// Delete a clearance request by ID
export const deleteClearanceRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await ClearanceRequestService.delete(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
