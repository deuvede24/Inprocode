import { Router } from 'express';
import Recipe from '../models/recipeModel';
import { Request, Response } from 'express';

const router = Router();

// Crear una receta
router.post('/', async (req: Request, res: Response) => {
  try {
    const recipe = await Recipe.create(req.body);
    res.status(201).json(recipe);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todas las recetas
router.get('/', async (req: Request, res: Response) => {
  try {
    const recipes = await Recipe.findAll();
    res.status(200).json(recipes);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener una receta por ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    if (recipe) {
      res.status(200).json(recipe);
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar una receta
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const [updated] = await Recipe.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedRecipe = await Recipe.findByPk(req.params.id);
      res.status(200).json(updatedRecipe);
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar una receta
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deleted = await Recipe.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;

