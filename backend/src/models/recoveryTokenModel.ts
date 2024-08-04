import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db';
import User from './userModel';

class RecoveryToken extends Model {
  public id!: number;
  public token!: string;
  public user_id!: number;
  public created_at!: Date;
}

RecoveryToken.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  user_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'RecoveryToken',
  timestamps: false
});

User.hasMany(RecoveryToken, { foreignKey: 'user_id' });
RecoveryToken.belongsTo(User, { foreignKey: 'user_id' });

export default RecoveryToken;

