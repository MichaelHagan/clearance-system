import {
  ApprovalAttributes,
  ApprovalCreationAttributes,
} from "../models/approval";
import Approval from "../models/approval";

// **** Functions **** //

/**
 * Get one approval by ID.
 */
const getOneById = async (id: number) => {
  return Approval.findByPk(id);
};

/**
 * See if an approval with the given id exists.
 */
const persists = async (id: number) => {
  const approval = await Approval.findByPk(id);
  return !!approval;
};

/**
 * Get all approvals.
 */
const getAll = async () => {
  return Approval.findAll();
};

/**
 * Get all approvals by user ID.
 */
const getAllByClearanceRequestId = async (ClearanceRequestId: number) => {
  return Approval.findAll({ where: { ClearanceRequestId } });
};

/**
 * Get all approvals by department ID.
 */
const getAllByDepartmentId = async (DepartmentId: number) => {
  return Approval.findAll({ where: { DepartmentId } });
};

/**
 * Add one approval.
 */
const add = async (approval: ApprovalCreationAttributes) => {
  await Approval.create(approval);
};

/**
 * Update an approval.
 */
const update = async (approval: ApprovalCreationAttributes) => {
  await Approval.update(approval, { where: { id: approval.id } });
};

/**
 * Delete one approval.
 */
const deleteApproval = async (id: number) => {
  await Approval.destroy({ where: { id } });
};

export default {
  getOneById,
  persists,
  getAll,
  getAllByClearanceRequestId,
  getAllByDepartmentId,
  add,
  update,
  delete: deleteApproval,
};
