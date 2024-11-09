import { RouteError } from '@src/common/classes';
import HttpStatusCodes from '../common/HttpStatusCodes';
import ApprovalRepo from '@src/repos/ApprovalRepo';
import { ApprovalAttributes } from '@src/models/approval';

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
const addOne = async (approval: ApprovalAttributes) => {
  return ApprovalRepo.add(approval);
};

/**
 * Update one approval.
 */
const updateOne = async (approval: ApprovalAttributes) => {
  const persists = await ApprovalRepo.persists(approval.id);
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Approval not found');
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

export default {
  getAll,
  getOneById,
  addOne,
  updateOne,
  delete: delete_,
};
