import { Request, Response } from 'express';
import Ingredient from '../models/ingredientModel';

export const getAllIngredients = async (req: Request, res: Response) => {
  try {
    const ingredients = await Ingredient.findAll();
    res.json(ingredients);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createIngredient = async (req: Request, res: Response) => {
  try {
    const ingredient = await Ingredient.create(req.body);
    res.status(201).json(ingredient);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getIngredientById = async (req: Request, res: Response) => {
  try {
    const ingredient = await Ingredient.findByPk(req.params.id);
    if (ingredient) {
      res.json(ingredient);
    } else {
      res.status(404).json({ error: 'Ingredient not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateIngredient = async (req: Request, res: Response) => {
  try {
    const [updated] = await Ingredient.update(req.body, {
      where: { id_ingredient: req.params.id }
    });
    if (updated) {
      const updatedIngredient = await Ingredient.findByPk(req.params.id);
      res.json(updatedIngredient);
    } else {
      res.status(404).json({ error: 'Ingredient not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteIngredient = async (req: Request, res: Response) => {
  try {
    const deleted = await Ingredient.destroy({
      where: { id_ingredient: req.params.id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Ingredient not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

