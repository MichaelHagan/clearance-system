import { RouteError } from '@src/common/classes';
import HttpStatusCodes from '../common/HttpStatusCodes';
import DepartmentRepo from '@src/repos/DepartmentRepo';
import { DepartmentAttributes } from '@src/models/department';

/**
 * Get all departments.
 */
const getAll = async () => {
  return DepartmentRepo.getAll();
};

/**
 * Get one department by ID.
 */
const getOneById = async (id: number) => {
  return DepartmentRepo.getOneById(id);
};

/**
 * Add one department.
 */
const addOne = async (department: DepartmentAttributes) => {
  return DepartmentRepo.add(department);
};

/**
 * Update one department.
 */
const updateOne = async (department: DepartmentAttributes) => {
  const persists = await DepartmentRepo.persists(department.id);
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Department not found');
  }

  // Update the department
  return DepartmentRepo.update(department);
};

/**
 * Delete a department by its id.
 */
const delete_ = async (id: number) => {
  const persists = await DepartmentRepo.persists(id);
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Department not found');
  }
  // Delete department
  return DepartmentRepo.delete(id);
};

export default {
  getAll,
  getOneById,
  addOne,
  updateOne,
  delete: delete_,
};
