import { Request, Response } from 'express';
import Recipe from '../models/recipeModel';

// Obtener todas las recetas
export const getAllRecipes = async (req: Request, res: Response) => {
  try {
    const recipes = await Recipe.findAll();
    res.json(recipes);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

// Crear una nueva receta
export const createRecipe = async (req: Request, res: Response) => {
  try {
    const recipe = await Recipe.create(req.body);
    res.status(201).json(recipe);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

// Otros métodos (obtener por ID, actualizar, eliminar) se pueden agregar aquí...
