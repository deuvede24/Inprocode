import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db';
import User from './userModel';

class Recipe extends Model {
  public id_recipe!: number;
  public name!: string;
  public description!: string;
  public ingredients!: string;
  public steps!: string;
  public category!: string;
  public user_id!: number;
}

Recipe.init({
  id_recipe: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  ingredients: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  steps: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id_user',
    },
  },
}, {
  sequelize,
  modelName: 'Recipe',
  tableName: 'recipes',
  timestamps: false,
});

export default Recipe;

