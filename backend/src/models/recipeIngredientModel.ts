// backend/models/recipeIngredientModel.ts
import { DataTypes } from 'sequelize';
import { sequelize } from '../db';
import Recipe from './recipeModel';
import Ingredient from './ingredientModel';

const RecipeIngredient = sequelize.define('RecipeIngredient', {
  recipe_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Recipe,
      key: 'id_recipe'
    }
  },
  ingredient_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Ingredient,
      key: 'id_ingredient'
    }
  },
  quantity: {
    type: DataTypes.STRING(50),
    allowNull: true
  }
}, {
  timestamps: false,
  tableName: 'recipeingredients'
});

Recipe.belongsToMany(Ingredient, { through: RecipeIngredient, foreignKey: 'recipe_id' });
Ingredient.belongsToMany(Recipe, { through: RecipeIngredient, foreignKey: 'ingredient_id' });

export default RecipeIngredient;
