import { Request, Response, NextFunction } from 'express';
import ApprovalService from '@src/services/ApprovalService';

// Create a new approval
export const createApproval = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await ApprovalService.addOne(req.body);
    res.status(201).json(req.body);
  } catch (error) {
    next(error);
  }
};

// Get all approvals
export const getApprovals = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const approvals = await ApprovalService.getAll();
    res.status(200).json(approvals);
  } catch (error) {
    next(error);
  }
};

// Get a single approval by ID
export const getApprovalById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const approval = await ApprovalService.getOneById(Number(req.params.id));
    if (approval) {
      res.status(200).json(approval);
    } else {
      res.status(404).json({ error: 'Approval not found' });
    }
  } catch (error) {
    next(error);
  }
};

// Update an approval by ID
export const updateApproval = async (req: Request, res: Response, next: NextFunction) => {
  try {

    let {id} = req.params;

    await ApprovalService.updateOne(req.body, parseInt(id));
    const updatedApproval = await ApprovalService.getOneById(Number(req.params.id));
    if (updatedApproval) {
      res.status(200).json(updatedApproval);
    } else {
      res.status(404).json({ error: 'Approval not found' });
    }
  } catch (error) {
    next(error);
  }
};

// Delete an approval by ID
export const deleteApproval = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await ApprovalService.delete(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// Get all approvals by user ID
export const getApprovalsByClearanceRequestId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const approvals = await ApprovalService.getAllByClearanceRequestId(Number(req.params.ClearanceRequestId));
    res.status(200).json(approvals);
  } catch (error) {
    next(error);
  }
};

// Get all approvals by department ID
export const getApprovalsByDepartmentId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const approvals = await ApprovalService.getAllByDepartmentId(Number(req.params.departmentId));
    res.status(200).json(approvals);
  } catch (error) {
    next(error);
  }
};

// Get all approvals by user ID
export const getApprovalsByUserId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const approvals = await ApprovalService.getAllByUserId(userId);
    res.status(200).json(approvals);
  } catch (err) {
    next(err);
  }
};
