import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import ClearanceRequest from './clearance-request';

export interface UserAttributes {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  gender: string;
  nationality: string;
  email: string | null;
  phoneNumber: string;
  password: string;
  RoleId: number;
  roleName?: string | null; // Update roleName type to string | null
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {
  DepartmentId?: number; // Optional field for DepartmentId
}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public userName!: string;
  public firstName!: string;
  public lastName!: string;
  public gender!: string;
  public nationality!: string;
  public email!: string | null;
  public phoneNumber!: string;
  public password!: string;
  public RoleId!: number;
  public roleName?: string | null; // Update roleName type to string | null

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const userDefinition = {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nationality: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  RoleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};

User.init(userDefinition, {
  sequelize,
  tableName: 'users',
});

User.hasMany(ClearanceRequest);

export default User;