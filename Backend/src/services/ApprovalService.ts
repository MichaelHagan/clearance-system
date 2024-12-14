import { RouteError } from '@src/common/classes';
import HttpStatusCodes from '../common/HttpStatusCodes';
import ApprovalRepo from '@src/repos/ApprovalRepo';
import { ApprovalCreationAttributes } from '@src/models/approval';
import ClearanceRequestService from './ClearanceRequestService';
import UserService from './UserService';
import User from '@src/models/user';
import DepartmentService from './DepartmentService';
import { sendMail } from '@src/utils/emailHelper';
import checkAndNotifyFinalClearance from '../utils/finalClearanceHelper';

/**
 * Get all approvals.
 */
const getAll = async () => {
  let approvals = await ApprovalRepo.getAll();
  for (let approval of approvals) {
    const clearanceRequest = await ClearanceRequestService.getOneById(approval.ClearanceRequestId);
    if (clearanceRequest) {
      const user = await UserService.getOneById(clearanceRequest.UserId);
      const department = await DepartmentService.getOneById(approval.DepartmentId);
      approval.dataValues.user = user.dataValues as unknown as User;
      if (department) {
        approval.dataValues.departmentName = department.name;
      }
    }
  }
  return approvals;
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
const updateOne = async (approval: ApprovalCreationAttributes, id: number) => {
  const currentApproval = await ApprovalRepo.getOneById(id);
  if (!currentApproval) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Approval not found');
  }

  // Update the approval date if status is approved
  if (approval.status === 'approved') {
    approval.approval_date = new Date();
  }
  approval.id = id;

  // Update the approval
  const updatedApproval = await ApprovalRepo.update(approval);

  // Fetch the clearance request and user details
  const clearanceRequest = await ClearanceRequestService.getOneById(currentApproval.ClearanceRequestId);
  const user = await UserService.getOneById(clearanceRequest?.UserId!);
  const department = await DepartmentService.getOneById(currentApproval.DepartmentId);
  
  // Send email notification
  const email = user.dataValues?.email;
  const firstName = user.dataValues?.firstName;
  const subject = `Your clearance request has been ${approval.status}`;
  const message = `Dear ${firstName},\n\nYour clearance request from the ${department?.name} department has been ${approval.status}.\n\nBest Regards,\nKAIPTC Team`;
  sendMail(email!, subject, message);

  // Check and notify final clearance
  checkAndNotifyFinalClearance(email!, firstName!, currentApproval.ClearanceRequestId);

  return updatedApproval;
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
  let approvals = await ApprovalRepo.getAllByDepartmentId(departmentId);
  for (let approval of approvals) {
    const clearanceRequest = await ClearanceRequestService.getOneById(approval.ClearanceRequestId);
    if (clearanceRequest) {
      const user = await UserService.getOneById(clearanceRequest.UserId);
      approval.dataValues.user = user.dataValues as unknown as User;
      approval.dataValues.departmentName = (await DepartmentService.getOneById(departmentId))?.name;
    }
  }
  return approvals;
};

/**
 * Get all approvals by user ID.
 */
const getAllByUserId = async (userId: number) => {
  const clearanceRequest = await ClearanceRequestService.getOneByUserId(userId);
  if (!clearanceRequest) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Clearance request not found for user');
  }
  const approvals = await getAllByClearanceRequestId(clearanceRequest.id);
  for (let approval of approvals) {
    const department = await DepartmentService.getOneById(approval.DepartmentId);
    if (department) {
      approval.dataValues.departmentName = department.name;
    }
  }
  return approvals;
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
