import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database'; // Adjust the import based on your project structure
import User from './user';

export interface ApprovalAttributes {
  id: number;
  status: 'pending' | 'approved' | 'rejected';
  approval_date: Date | null; // Changed to allow null
  comments: string;
  DepartmentId: number;
  ClearanceRequestId: number;
  user?: User; // Add user attribute
  departmentName?: string; // Add departmentName attribute
}

export interface ApprovalCreationAttributes extends Optional<ApprovalAttributes, 'id'> {}

class Approval extends Model<ApprovalAttributes, ApprovalCreationAttributes> implements ApprovalAttributes {
  public id!: number;
  public status!: 'pending' | 'approved' | 'rejected';
  public approval_date!: Date | null; // Changed to allow null
  public comments!: string;
  public DepartmentId!: number;
  public ClearanceRequestId!: number;
  public user?: User; // Add user attribute
  public departmentName?: string; // Add departmentName attribute

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const approvalDefinition = {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  ClearanceRequestId: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  DepartmentId: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    allowNull: false,
  },
  approval_date: {
    type: DataTypes.DATE,
    allowNull: true, // Ensure this is set to true
  },
  comments: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}

Approval.init(approvalDefinition, {
  sequelize,
  tableName: 'approvals',
});

export default Approval;
