import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database'; // Adjust the import based on your project structure
import Approval from './approval';
import User from './user';


export interface ClearanceRequestAttributes {
  id: number;
  status: 'pending' | 'approved' | 'rejected';
  type: 'student' | 'staff';
  UserId: number;
  user?: User;
}

export interface ClearanceRequestCreationAttributes extends Optional<ClearanceRequestAttributes, 'id'> {}


class ClearanceRequest extends Model<ClearanceRequestAttributes, ClearanceRequestCreationAttributes> implements ClearanceRequestAttributes {
  public id!: number;
  public status!: 'pending' | 'approved' | 'rejected';
  public type!: 'student' | 'staff';
  public UserId!: number;
  public user?: User;


  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const clearanceRequestDefinition = {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('student', 'staff'),
        allowNull: false,
    },
    UserId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
}

ClearanceRequest.init(clearanceRequestDefinition, {
  sequelize,
  tableName: 'clearance_requests',
});

ClearanceRequest.hasMany(Approval);


export default ClearanceRequest;
