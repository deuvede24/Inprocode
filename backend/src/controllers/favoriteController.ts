// backend/controllers/favoriteController.ts
import { Request, Response } from 'express';
import Favorite from '../models/favoriteModel';

export const getAllFavorites = async (req: Request, res: Response) => {
  try {
    const favorites = await Favorite.findAll();
    res.json(favorites);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createFavorite = async (req: Request, res: Response) => {
  try {
    const favorite = await Favorite.create(req.body);
    res.status(201).json(favorite);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getFavoriteById = async (req: Request, res: Response) => {
  try {
    const favorite = await Favorite.findByPk(req.params.id);
    if (favorite) {
      res.json(favorite);
    } else {
      res.status(404).json({ error: 'Favorite not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateFavorite = async (req: Request, res: Response) => {
  try {
    const [updated] = await Favorite.update(req.body, {
      where: { id_favorite: req.params.id }
    });
    if (updated) {
      const updatedFavorite = await Favorite.findByPk(req.params.id);
      res.json(updatedFavorite);
    } else {
      res.status(404).json({ error: 'Favorite not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteFavorite = async (req: Request, res: Response) => {
  try {
    const deleted = await Favorite.destroy({
      where: { id_favorite: req.params.id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Favorite not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
