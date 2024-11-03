import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import  User  from './user';

interface RoleAttributes {
  id: number;
  type: string;
}

interface RoleCreationAttributes extends Optional<RoleAttributes, 'id'> {}

class Role extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes {
  public id!: number;
  public type!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  
}

const roleDefinition = {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  }
};

Role.init(roleDefinition, {
  sequelize,
  tableName: 'roles',
});

Role.hasMany(User);

export default Role;
