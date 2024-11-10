import { RouteError } from '@src/common/classes';
import HttpStatusCodes from '../common/HttpStatusCodes';
import UserRepo from '@src/repos/UserRepo';
import { UserAttributes, UserCreationAttributes } from '@src/models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { addUserDepartmentPair } from '../repos/UserDepartmentRepo';

/**
 * Get all users.
 */
const getAll = async () => {
  return UserRepo.getAll();
};

const loginUser = async (identifier: string | null, password: string) => {
  const row = await UserRepo.getOneByPhoneOrEmail(identifier as string);
  if (!row) {
    throw new RouteError(HttpStatusCodes.BAD_REQUEST, 'User not found');
  }

  if (await bcrypt.compare(password, row.password)) {
    const user = {
      id: row.id,
      userName: row.userName,
      role: row.RoleId, 
      firstName: row.firstName, 
      lastName:row.lastName
    };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '5h' });
    
    return accessToken;
  } else {
    throw new RouteError(HttpStatusCodes.UNAUTHORIZED, 'Invalid Credentials');
  }
};

/**
 * Add one user.
 */
const addOne = async (user: UserCreationAttributes) => {
  user.password = await bcrypt.hash(user.password, 10);
  const newUser = await UserRepo.add(user);

  if (user.RoleId == 2 && user.DepartmentId) {
    await addUserDepartmentPair(newUser.id, user.DepartmentId);
  }

  return newUser;
};

/**
 * Add one user.
 */
const addOne2 = async(user: UserCreationAttributes) => {
  return 
};

/**
 * Update one user.
 */
const updateOne = async (user: UserAttributes) => {
  const persists = await UserRepo.persists(user.id);
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'User not found');
  }
  // Check if the password field is present and hash it.
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  // Update the user
  return UserRepo.update(user);
};

/**
 * Delete a user by their id.
 */
const delete_ = async (id: number) => {
  const persists = await UserRepo.persists(id);
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'User not found');
  }
  // Delete user
  return UserRepo.delete(id);
};

/**
 * Get a user by ID.
 */
const getOneById = async (id: number) => {
  return UserRepo.getOneById(id);
};

/**
 * Get a user by email.
 */
const getOneByEmail = (email: string) => {
  return UserRepo.getOneByEmail(email);
};

export default {
  getAll,
  loginUser,
  addOne,
  updateOne,
  delete: delete_,
  getOneById,
  getOneByEmail
};