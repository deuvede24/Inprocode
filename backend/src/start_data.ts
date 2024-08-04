// backend/src/start_data.ts
import bcrypt from 'bcrypt';
import User from './models/userModel';
import Recipe from './models/recipeModel';
import Ingredient from './models/ingredientModel';
import RecipeIngredient from './models/recipeIngredientModel';
import Comment from './models/commentModel';
import Favorite from './models/favoriteModel';

const insertInitialData = async () => {
  const saltRounds = Number(process.env.BCRYPT_SALT);

  const userData = [
    {
      email: 'laura@hotmail.com',
      password: await bcrypt.hash('password1', saltRounds),
      username: 'Laura',
      role: 'user' as 'user',
    },
    {
      email: 'maria@hotmail.com',
      password: await bcrypt.hash('password2', saltRounds),
      username: 'Maria',
      role: 'user' as 'user',
    },
    {
      email: 'kale@hotmail.com',
      password: await bcrypt.hash('password3', saltRounds),
      username: 'Kale',
      role: 'admin' as 'admin',
    },
    {
      email: 'guest@hotmail.com',
      password: await bcrypt.hash('password4', saltRounds),
      username: 'Guest',
      role: 'guest' as 'guest',
    },
  ];

  await User.bulkCreate(userData, { ignoreDuplicates: true });

  const recipeData = [
    {
      name: 'Spaghetti Bolognese',
      description: 'A classic Italian pasta dish',
      steps: 'Cook pasta, prepare sauce, mix together',
      category: 'Italian',
      user_id: 1,
      is_public: true,
    },
    {
      name: 'Chicken Curry',
      description: 'A spicy and savory chicken dish',
      steps: 'Cook chicken, prepare curry sauce, mix together',
      category: 'Indian',
      user_id: 2,
      is_public: true,
    },
  ];

  await Recipe.bulkCreate(recipeData, { ignoreDuplicates: true });

  const ingredientData = [
    { name: 'Tomato' },
    { name: 'Chicken' },
    { name: 'Pasta' },
    { name: 'Curry Powder' },
  ];

  await Ingredient.bulkCreate(ingredientData, { ignoreDuplicates: true });

  const recipeIngredientData = [
    { recipe_id: 1, ingredient_id: 1, quantity: '2 cups' },
    { recipe_id: 1, ingredient_id: 3, quantity: '200g' },
    { recipe_id: 2, ingredient_id: 2, quantity: '500g' },
    { recipe_id: 2, ingredient_id: 4, quantity: '3 tbsp' },
  ];

  await RecipeIngredient.bulkCreate(recipeIngredientData, { ignoreDuplicates: true });

  const commentData = [
    { content: 'Delicious recipe!', user_id: 1, recipe_id: 1 },
    { content: 'I loved it!', user_id: 2, recipe_id: 2 },
  ];

  await Comment.bulkCreate(commentData, { ignoreDuplicates: true });

  const favoriteData = [
    { user_id: 1, recipe_id: 2 },
    { user_id: 2, recipe_id: 1 },
  ];

  await Favorite.bulkCreate(favoriteData, { ignoreDuplicates: true });
};

export { insertInitialData };
