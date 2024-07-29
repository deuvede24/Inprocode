import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db';

class User extends Model {
  public id_user!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public role!: 'admin' | 'user' | 'guest';
  public preference!: 'original' | 'vegana' | 'vegetariana';
  public location!: string;
}

User.init({
  id_user: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(40),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'user', 'guest'),
    allowNull: false,
  },
  preference: {
    type: DataTypes.ENUM('original', 'vegana', 'vegetariana'),
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: false,
});

export default User;
