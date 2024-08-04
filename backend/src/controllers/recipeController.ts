// backend/controllers/recipeController.ts
import { Request, Response } from 'express';
import Recipe from '../models/recipeModel';

export const getAllRecipes = async (req: Request, res: Response) => {
  try {
    const recipes = await Recipe.findAll();
    res.json(recipes);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createRecipe = async (req: Request, res: Response) => {
  try {
    const recipe = await Recipe.create(req.body);
    res.status(201).json(recipe);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getRecipeById = async (req: Request, res: Response) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateRecipe = async (req: Request, res: Response) => {
  try {
    const [updated] = await Recipe.update(req.body, {
      where: { id_recipe: req.params.id }
    });
    if (updated) {
      const updatedRecipe = await Recipe.findByPk(req.params.id);
      res.json(updatedRecipe);
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteRecipe = async (req: Request, res: Response) => {
  try {
    const deleted = await Recipe.destroy({
      where: { id_recipe: req.params.id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


