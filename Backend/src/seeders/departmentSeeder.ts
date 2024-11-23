import { QueryInterface } from 'sequelize';
import Department from '../models/department';

const seed = async (): Promise<{ name: string }[]> => {
  return [
    { name: 'College Bursar' },
    { name: 'College Registrar' },
    { name: 'Hall of Residence' },
    { name: 'University Library' },
    { name: 'Student Guide' },
    { name: 'Police Post' },
    { name: 'Games Union' },
    { name: 'University Hospital' },
    { name: 'University Bursar' },
    { name: 'IT Manager' },
    { name: 'Director Training' },
    { name: 'Course Director' },
    { name: 'Stores' },
    { name: 'Head of Transport' }
  ];
};

export const departmentSeeder = {
  up: async (queryInterface: QueryInterface | null, Sequelize: any): Promise<void> => {
    await Department.bulkCreate(await seed());
  },
};
