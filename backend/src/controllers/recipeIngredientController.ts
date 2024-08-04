import { Request, Response } from 'express';
import RecipeIngredient from '../models/recipeIngredientModel';

export const getAllRecipeIngredients = async (req: Request, res: Response) => {
  try {
    const recipeIngredients = await RecipeIngredient.findAll();
    res.json(recipeIngredients);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createRecipeIngredient = async (req: Request, res: Response) => {
  try {
    const recipeIngredient = await RecipeIngredient.create(req.body);
    res.status(201).json(recipeIngredient);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getRecipeIngredientById = async (req: Request, res: Response) => {
  try {
    const recipeIngredient = await RecipeIngredient.findByPk(req.params.id);
    if (recipeIngredient) {
      res.json(recipeIngredient);
    } else {
      res.status(404).json({ error: 'RecipeIngredient not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateRecipeIngredient = async (req: Request, res: Response) => {
  try {
    const [updated] = await RecipeIngredient.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedRecipeIngredient = await RecipeIngredient.findByPk(req.params.id);
      res.json(updatedRecipeIngredient);
    } else {
      res.status(404).json({ error: 'RecipeIngredient not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteRecipeIngredient = async (req: Request, res: Response) => {
  try {
    const deleted = await RecipeIngredient.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'RecipeIngredient not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
