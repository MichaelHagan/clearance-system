import { DepartmentAttributes } from '../models/department';
import Department from '../models/department';

// **** Functions **** //

/**
 * Get one department by ID.
 */
const getOneById = async (id: number) => {
  return Department.findByPk(id);
}

/**
 * See if a department with the given id exists.
 */
const persists = async (id: number) => {
  const department = await Department.findByPk(id);
  return !!department;
}

/**
 * Get all departments.
 */
const getAll = async () => {
  return Department.findAll();
}

/**
 * Add one department.
 */
const add = async (department: DepartmentAttributes) => {
  return await Department.create(department);
}

/**
 * Update a department.
 */
const update = async (department: DepartmentAttributes) => {
  await Department.update(department, { where: { id: department.id } });
}

/**
 * Delete one department.
 */
const deleteDepartment = async (id: number) => {
  await Department.destroy({ where: { id } });
}

export default {
  getOneById,
  persists,
  getAll,
  add,
  update,
  delete: deleteDepartment,
}
