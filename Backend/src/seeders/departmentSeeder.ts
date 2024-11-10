
import { QueryInterface } from 'sequelize';
import Department from '../models/department';

const seed = async (): Promise<{ name: string }[]> => {
  return [
    { name: 'Computer Science' },
    { name: 'Mathematics' },
    { name: 'Physics' },
  ];
};

export const departmentSeeder = {
  up: async (queryInterface: QueryInterface | null, Sequelize: any): Promise<void> => {
    await Department.bulkCreate(await seed());
  },
};