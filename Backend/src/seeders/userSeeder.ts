import User from '@src/models/user';
import bcrypt from 'bcrypt';
import { QueryInterface } from 'sequelize';

const seed = async () => {
  const hashedPassword = await bcrypt.hash('admin', 10);

  return [{
    userName: 'admin',
    firstName: 'Admin',
    lastName: 'Admin',
    gender: 'Other',
    nationality: 'Unknown',
    email: 'admin',
    phoneNumber: '1234',
    password: hashedPassword,
    RoleId: 1
  }];
};

export const userSeeder = {
    up: async (queryInterface: QueryInterface | null, Sequelize: any): Promise<void> => {
      await User.bulkCreate(await seed());
    },
  };