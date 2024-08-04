// backend/models/ingredientModel.ts
import { DataTypes } from 'sequelize';
import { sequelize } from '../db';

const Ingredient = sequelize.define('Ingredient', {
  id_ingredient: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'ingredients'
});

export default Ingredient;
