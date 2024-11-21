
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import User from './user';
import Department from './department';

class UserDepartment extends Model {
  public UserId!: number;
  public DepartmentId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserDepartment.init({
  UserId: {
    type: DataTypes.BIGINT,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
  DepartmentId: {
    type: DataTypes.BIGINT,
    references: {
      model: Department,
      key: 'id',
    },
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'user_departments',
});

User.belongsToMany(Department, { through: UserDepartment });
Department.belongsToMany(User, { through: UserDepartment });

export default UserDepartment;