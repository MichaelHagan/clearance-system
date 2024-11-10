import { RouteError } from '@src/common/classes';
import HttpStatusCodes from '../common/HttpStatusCodes';
import ApprovalRepo from '@src/repos/ApprovalRepo';
import { ApprovalAttributes, ApprovalCreationAttributes } from '@src/models/approval';
import ClearanceRequestService from './ClearanceRequestService';
import UserDepartment from '@src/models/userDepartment';

/**
 * Get all approvals.
 */
const getAll = async () => {
  return ApprovalRepo.getAll();
};

/**
 * Get one approval by ID.
 */
const getOneById = async (id: number) => {
  return ApprovalRepo.getOneById(id);
};

/**
 * Add one approval.
 */
const addOne = async (approval: ApprovalCreationAttributes) => {
  return ApprovalRepo.add(approval);
};

/**
 * Update one approval.
 */
const updateOne = async (approval: ApprovalCreationAttributes, id: number, userId: number) => {
  const persists = await ApprovalRepo.persists(id);
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Approval not found');
  }

  // Check if the user belongs to the department of the approval
  const userDepartment = await UserDepartment.findOne({
    where: {
      UserId: userId,
      DepartmentId: approval.DepartmentId,
    },
  });

  if (!userDepartment) {
    throw new RouteError(HttpStatusCodes.FORBIDDEN, 'User does not belong to the department of the approval');
  }

  // Update the approval
  return ApprovalRepo.update(approval);
};

/**
 * Delete an approval by its id.
 */
const delete_ = async (id: number) => {
  const persists = await ApprovalRepo.persists(id);
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Approval not found');
  }
  // Delete approval
  return ApprovalRepo.delete(id);
};

/**
 * Get all approvals by user ID.
 */
const getAllByClearanceRequestId = async (ClearanceRequestId: number) => {
  return ApprovalRepo.getAllByClearanceRequestId(ClearanceRequestId);
};

/**
 * Get all approvals by department ID.
 */
const getAllByDepartmentId = async (departmentId: number) => {
  return ApprovalRepo.getAllByDepartmentId(departmentId);
};

/**
 * Get all approvals by user ID.
 */
const getAllByUserId = async (userId: number) => {
  const clearanceRequest = await ClearanceRequestService.getOneByUserId(userId);
  if (!clearanceRequest) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Clearance request not found for user');
  }
  return getAllByClearanceRequestId(clearanceRequest.id);
};

export default {
  getAll,
  getOneById,
  addOne,
  updateOne,
  delete: delete_,
  getAllByClearanceRequestId,
  getAllByDepartmentId,
  getAllByUserId,
};
