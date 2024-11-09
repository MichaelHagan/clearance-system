import { RouteError } from '@src/common/classes';
import HttpStatusCodes from '../common/HttpStatusCodes';
import ClearanceRequestRepo from '@src/repos/ClearanceRequestRepo';
import { ClearanceRequestAttributes } from '@src/models/clearance-request';

/**
 * Get all clearance requests.
 */
const getAll = async () => {
  return ClearanceRequestRepo.getAll();
};

/**
 * Get one clearance request by ID.
 */
const getOneById = async (id: number) => {
  return ClearanceRequestRepo.getOneById(id);
};

/**
 * Add one clearance request.
 */
const addOne = async (clearanceRequest: ClearanceRequestAttributes) => {
  return ClearanceRequestRepo.add(clearanceRequest);
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
  addOne,
  updateOne,
  delete: delete_,
};
