import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database'; // Adjust the import based on your project structure
import Approval from './approval';

export interface DepartmentAttributes {
  id: number;
  name: string;
}

interface DepartmentCreationAttributes extends Optional<DepartmentAttributes, 'id'> {}

class Department extends Model<DepartmentAttributes, DepartmentCreationAttributes> implements DepartmentAttributes {
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const departmentDefinition = {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}

Department.init(departmentDefinition, {
  sequelize,
  tableName: 'departments',
});

Department.hasMany(Approval);

export default Department;
