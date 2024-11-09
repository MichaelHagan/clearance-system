import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database'; // Adjust the import based on your project structure

export interface ApprovalAttributes {
  id: number;
  status: 'pending' | 'approved' | 'rejected';
  approval_date: Date;
  comments: string;
  DepartmentId: number;
  ClearanceRequestId: number;
}

interface ApprovalCreationAttributes extends Optional<ApprovalAttributes, 'id'> {}

class Approval extends Model<ApprovalAttributes, ApprovalCreationAttributes> implements ApprovalAttributes {
  public id!: number;
  public status!: 'pending' | 'approved' | 'rejected';
  public approval_date!: Date;
  public comments!: string;
  public DepartmentId!: number;
  public ClearanceRequestId!: number;

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
    allowNull: false,
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
