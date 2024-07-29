import { Router } from 'express';
import Favorite from '../models/favoriteModel';

const router = Router();

// Crear un nuevo favorito
router.post('/', async (req, res) => {
  try {
    const favorite = await Favorite.create(req.body);
    res.status(201).json(favorite);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los favoritos
router.get('/', async (req, res) => {
  try {
    const favorites = await Favorite.findAll();
    res.status(200).json(favorites);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener un favorito por ID
router.get('/:id', async (req, res) => {
  try {
    const favorite = await Favorite.findByPk(req.params.id);
    if (favorite) {
      res.status(200).json(favorite);
    } else {
      res.status(404).json({ error: 'Favorito no encontrado' });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar un favorito por ID
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Favorite.update(req.body, {
      where: { id_favorite: req.params.id }
    });
    if (updated) {
      const updatedFavorite = await Favorite.findByPk(req.params.id);
      res.status(200).json(updatedFavorite);
    } else {
      res.status(404).json({ error: 'Favorito no encontrado' });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un favorito por ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Favorite.destroy({
      where: { id_favorite: req.params.id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Favorito no encontrado' });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;

