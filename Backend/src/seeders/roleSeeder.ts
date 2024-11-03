import { QueryInterface } from 'sequelize';
import Role from '../models/role';

interface RoleSeedData {
  type: string;
}

const seed = async (): Promise<RoleSeedData[]> => {
  return [
          {
            type: "admin"
          },
          {
            type: "department_staff"
          },
          {
            type: "staff"
          },
          {
            type: "student"
          }
        ];
};

export const roleSeeder = {
  up: async (queryInterface: QueryInterface | null, Sequelize: any): Promise<void> => {
    await Role.bulkCreate(await seed());
  },
};