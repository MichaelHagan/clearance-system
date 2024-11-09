import { ApprovalAttributes } from '../models/approval';
import Approval from '../models/approval';

// **** Functions **** //

/**
 * Get one approval by ID.
 */
const getOneById = async (id: number) => {
  return Approval.findByPk(id);
}

/**
 * See if an approval with the given id exists.
 */
const persists = async (id: number) => {
  const approval = await Approval.findByPk(id);
  return !!approval;
}

/**
 * Get all approvals.
 */
const getAll = async () => {
  return Approval.findAll();
}

/**
 * Add one approval.
 */
const add = async (approval: ApprovalAttributes) => {
  await Approval.create(approval);
}

/**
 * Update an approval.
 */
const update = async (approval: ApprovalAttributes) => {
  await Approval.update(approval, { where: { id: approval.id } });
}

/**
 * Delete one approval.
 */
const deleteApproval = async (id: number) => {
  await Approval.destroy({ where: { id } });
}

export default {
  getOneById,
  persists,
  getAll,
  add,
  update,
  delete: deleteApproval,
}
