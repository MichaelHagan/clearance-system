import UserDepartment from '../models/userDepartment';

export const addUserDepartmentPair = async (userId: number, departmentId: number): Promise<void> => {
  await UserDepartment.create({ UserId: userId, DepartmentId: departmentId });
};

export const userBelongsToDepartment = async (userId: number, departmentId: number): Promise<boolean> => {
  const userDepartment = await UserDepartment.findOne({
    where: {
      UserId: userId,
      DepartmentId: departmentId,
    },
  });
  return !!userDepartment;
};
