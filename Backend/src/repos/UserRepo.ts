import { UserAttributes } from '../models/user';
import User from '../models/user';
import { Op } from 'sequelize';


// **** Functions **** //

/**
 * Get one user by ID.
 */
  const getOneById= async(id: number)=> {
  return User.findByPk(id);
}

/**
 * Get one user by email.
 */
  const getOneByEmail=async(email: string)=>{
  return User.findOne({ where: { email } });
}

/**
 * Get one user by phone number.
 */
  const getOneByPhoneNumber= async(phoneNumber: string)=> {
  return User.findOne({ where: { phoneNumber } });
}

/**
 * Get one user by phone number or email.
 */
const getOneByPhoneOrEmail = async (identifier: string) => {
  return User.findOne({
    where: {
      [Op.or]: [
        { email: identifier.toLowerCase() },
        { phoneNumber: identifier },
      ]
        }
  });
};

/**
 * See if a user with the given id exists.
 */
  const persists = async(id: number)=> {
  const user = await User.findByPk(id);
  return !!user;
}

/**
 * Get all users.
 */
  const getAll =async()=> {
  return User.findAll();
}

/**
 * Add one user.
 */
  const add =async (user: UserAttributes)=> {
  await User.create(user);
}

/**
 * Update a user.
 */
  const update = async(user: UserAttributes)=> {
  await User.update(user, { where: { id: user.id } });
}

/**
 * Delete one user.
 */
  const deleteUser = async(id: number)=> {
  await User.destroy({ where: { id } });
}

export default {
  getOneById,
  getOneByEmail,
  getOneByPhoneNumber,
  getOneByPhoneOrEmail,
  persists,
  getAll,
  add,
  update,
  delete: deleteUser,
}

