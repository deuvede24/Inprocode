import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db';
import User from './userModel';
import Recipe from './recipeModel';

class Favorite extends Model {
  public id_favorite!: number;
  public user_id!: number;
  public recipe_id!: number;
  public created_at!: Date;
}

Favorite.init({
  id_favorite: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id_user',
    },
  },
  recipe_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Recipe,
      key: 'id_recipe',
    },
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'Favorite',
  tableName: 'favorites',
  timestamps: false,
});

export default Favorite;
