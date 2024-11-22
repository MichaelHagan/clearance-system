import Role from '../models/role';

export const getRoleTypeById = async (id: number): Promise<string | null> => {
  const role = await Role.findByPk(id);
  
  return role ? role?.dataValues.type : null;
};