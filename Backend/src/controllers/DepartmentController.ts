import { Request, Response, NextFunction } from 'express';
import DepartmentService from '@src/services/DepartmentService';

// Create a new department
export const createDepartment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await DepartmentService.addOne(req.body);
    res.status(201).json(req.body);
  } catch (error) {
    next(error);
  }
};

// Get all departments
export const getDepartments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const departments = await DepartmentService.getAll();
    res.status(200).json(departments);
  } catch (error) {
    next(error);
  }
};

// Get a single department by ID
export const getDepartmentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const department = await DepartmentService.getOneById(Number(req.params.id));
    if (department) {
      res.status(200).json(department);
    } else {
      res.status(404).json({ error: 'Department not found' });
    }
  } catch (error) {
    next(error);
  }
};

// Update a department by ID
export const updateDepartment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await DepartmentService.updateOne(req.body);
    const updatedDepartment = await DepartmentService.getOneById(Number(req.params.id));
    if (updatedDepartment) {
      res.status(200).json(updatedDepartment);
    } else {
      res.status(404).json({ error: 'Department not found' });
    }
  } catch (error) {
    next(error);
  }
};

// Delete a department by ID
export const deleteDepartment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await DepartmentService.delete(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
