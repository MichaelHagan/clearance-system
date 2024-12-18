import { RouteError } from '@src/common/classes';
import HttpStatusCodes from '../common/HttpStatusCodes';
import UserRepo from '@src/repos/UserRepo';
import { UserCreationAttributes } from '@src/models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { addUserDepartmentPair, getDepartmentIdByUserId } from '../repos/UserDepartmentRepo';
import ClearanceRequestService from './ClearanceRequestService';
import { getRoleTypeById } from '@src/utils/getRoleTypeById';
import DepartmentService from './DepartmentService';
import { sendMail } from '@src/utils/emailHelper';

/**
 * Get all users.
 */
const getAll = async () => {
  const users = await UserRepo.getAll();
  return Promise.all(users.map(async (user) => {
    const roleName = await getRoleTypeById(user.RoleId);
    user.dataValues.roleName = roleName;
    return user; 
  }));
};

const loginUser = async (identifier: string | null, password: string) => {
  const row = await UserRepo.getOneByPhoneOrEmail(identifier as string);
  if (!row) {
    throw new RouteError(HttpStatusCodes.BAD_REQUEST, 'User not found');
  }

  if (await bcrypt.compare(password, row.password)) {
    const DepartmentId = await getDepartmentIdByUserId(row.id);
    const roleName = await getRoleTypeById(row.RoleId);
    const user = {
      id: row.id,
      userName: row.userName,
      role: row.RoleId, 
      roleName: roleName,
      firstName: row.firstName, 
      lastName: row.lastName,
      DepartmentId: DepartmentId || null,
      department: DepartmentId ? await DepartmentService.getOneById(DepartmentId) : null
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

  if(user.RoleId == 3 || user.RoleId == 4) {
    ClearanceRequestService.addOne({ status:'pending', type: (user.RoleId == 3? 'staff':'student'), UserId: newUser.id });
  }

  // Send welcome email
  const subject = 'Welcome to KAIPTC Clearance System';
  const message = `Dear ${user.firstName},\n\nWelcome to the KAIPTC Clearance System. We are glad to have you on board.\n\nBest Regards,\nKAIPTC Team`;
  sendMail(newUser.email!, subject, message);

  const DepartmentId = await getDepartmentIdByUserId(newUser.id);
  return {
    ...newUser,
    DepartmentId: DepartmentId || null,
    department: DepartmentId ? await DepartmentService.getOneById(DepartmentId) : null
  };
};

/**
 * Update one user.
 */
const updateOne = async (user: UserCreationAttributes, id: number) => {
  const persists = await UserRepo.persists(id);
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'User not found');
  }
  // Check if the password field is present and hash it.
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  if(user.RoleId == 2 && user.DepartmentId) {
    await addUserDepartmentPair(id, user.DepartmentId);
  }

  // Update the user
  return UserRepo.update({id, ...user});
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
  const user = await UserRepo.getOneById(id);
  const DepartmentId = await getDepartmentIdByUserId(id);
  return {
    ...user,
    DepartmentId: DepartmentId || null,
    department: DepartmentId ? await DepartmentService.getOneById(DepartmentId) : null
  };
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
