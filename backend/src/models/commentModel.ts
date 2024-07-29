import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db';
import User from './userModel';
import Recipe from './recipeModel';

class Comment extends Model {
  public id_comment!: number;
  public content!: string;
  public user_id!: number;
  public recipe_id!: number;
  public created_at!: Date;
}

Comment.init({
  id_comment: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
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
  modelName: 'Comment',
  tableName: 'comments',
  timestamps: false,
});

export default Comment;
