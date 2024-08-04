import { DataTypes } from 'sequelize';
import {sequelize} from '../db';
import User from './userModel';
import Recipe from './recipeModel';

const Comment = sequelize.define('Comment', {
  id_comment: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: User,
      key: 'id_user',
    },
  },
  recipe_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: Recipe,
      key: 'id_recipe',
    },
  },
}, {
  timestamps: true,
  updatedAt: 'created_at',
  createdAt: 'created_at'
});

User.hasMany(Comment, { foreignKey: 'user_id' });
Comment.belongsTo(User, { foreignKey: 'user_id' });
Recipe.hasMany(Comment, { foreignKey: 'recipe_id' });
Comment.belongsTo(Recipe, { foreignKey: 'recipe_id' });

export default Comment;

