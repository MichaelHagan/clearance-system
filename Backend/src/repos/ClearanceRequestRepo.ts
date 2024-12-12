import { ClearanceRequestCreationAttributes, ClearanceRequestUpdateAttributes } from '../models/clearance-request';
import ClearanceRequest from '../models/clearance-request';

// **** Functions **** //

/**
 * Get one clearance request by ID.
 */
const getOneById = async (id: number) => {
  return ClearanceRequest.findByPk(id);
}

/**
 * Get one clearance request by User ID.
 */
const getOneByUserId = async (userId: number) => {
  // Implement the logic to get a clearance request by user ID
  // Example:
  return ClearanceRequest.findOne({ where: { UserId: userId } });
};

/**
 * See if a clearance request with the given id exists.
 */
const persists = async (id: number) => {
  const clearanceRequest = await ClearanceRequest.findByPk(id);
  return !!clearanceRequest;
}

/**
 * Get all clearance requests.
 */
const getAll = async () => {
  return ClearanceRequest.findAll();
}

/**
 * Add one clearance request.
 */
const add = async (clearanceRequest: ClearanceRequestCreationAttributes) => {
  return await ClearanceRequest.create(clearanceRequest);
}

/**
 * Update a clearance request.
 */
const update = async (clearanceRequest: ClearanceRequestUpdateAttributes) => {
  await ClearanceRequest.update(clearanceRequest, { where: { id: clearanceRequest.id } });
}

/**
 * Delete one clearance request.
 */
const deleteClearanceRequest = async (id: number) => {
  await ClearanceRequest.destroy({ where: { id } });
}

export default {
  getOneById,
  getOneByUserId,
  persists,
  getAll,
  add,
  update,
  delete: deleteClearanceRequest,
}
