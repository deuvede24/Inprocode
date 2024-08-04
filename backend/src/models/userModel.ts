import { DataTypes } from 'sequelize';
import {sequelize} from '../db';

const User = sequelize.define('User', {
  id_user: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
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
  indexes: [{ unique: true, fields: ['email'] }],
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at'
});

export default User;

