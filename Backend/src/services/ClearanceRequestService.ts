import { RouteError } from '@src/common/classes';
import HttpStatusCodes from '../common/HttpStatusCodes';
import ClearanceRequestRepo from '@src/repos/ClearanceRequestRepo';
import { ClearanceRequestAttributes,ClearanceRequestCreationAttributes } from '@src/models/clearance-request';
import addApprovalsForClearanceRequest from '../utils/addApprovals';
import UserService from './UserService'; // Add this import
import User from '../models/user';


/**
 * Get all clearance requests.
 */
const getAll = async () => {
  const clearanceRequests = await ClearanceRequestRepo.getAll();
  return Promise.all(clearanceRequests.map(async (request) => {
    const user = await UserService.getOneById(request.UserId);
    request.dataValues.user = user.dataValues as unknown as User;
    return request;
  }));
};

/**
 * Get one clearance request by ID.
 */
const getOneById = async (id: number) => {
  return ClearanceRequestRepo.getOneById(id);
};

/**
 * Get one clearance request by User ID.
 */
const getOneByUserId = async (userId: number) => {
  return ClearanceRequestRepo.getOneByUserId(userId);
};

/**
 * Add one clearance request.
 */
const addOne = async (clearanceRequest: ClearanceRequestCreationAttributes) => {
  const existingRequest = await ClearanceRequestRepo.getOneByUserId(clearanceRequest.UserId);
  if (existingRequest) {
    throw new RouteError(HttpStatusCodes.CONFLICT, 'Clearance request already exists');
  }
  const newClearanceRequest = await ClearanceRequestRepo.add(clearanceRequest);
  await addApprovalsForClearanceRequest(newClearanceRequest.id);
  return newClearanceRequest;
};

/**
 * Update one clearance request.
 */
const updateOne = async (clearanceRequest: ClearanceRequestAttributes) => {
  const persists = await ClearanceRequestRepo.persists(clearanceRequest.id);
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Clearance request not found');
  }

  // Update the clearance request
  return ClearanceRequestRepo.update(clearanceRequest);
};

/**
 * Delete a clearance request by its id.
 */
const delete_ = async (id: number) => {
  const persists = await ClearanceRequestRepo.persists(id);
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Clearance request not found');
  }
  // Delete clearance request
  return ClearanceRequestRepo.delete(id);
};

export default {
  getAll,
  getOneById,
  getOneByUserId,
  addOne,
  updateOne,
  delete: delete_,
};
