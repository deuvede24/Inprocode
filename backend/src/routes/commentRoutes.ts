import { Router } from 'express';
import Comment from '../models/commentModel';

const router = Router();

// Crear un nuevo comentario
router.post('/', async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    res.status(201).json(comment);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los comentarios
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.status(200).json(comments);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener un comentario por ID
router.get('/:id', async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (comment) {
      res.status(200).json(comment);
    } else {
      res.status(404).json({ error: 'Comentario no encontrado' });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar un comentario por ID
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Comment.update(req.body, {
      where: { id_comment: req.params.id }
    });
    if (updated) {
      const updatedComment = await Comment.findByPk(req.params.id);
      res.status(200).json(updatedComment);
    } else {
      res.status(404).json({ error: 'Comentario no encontrado' });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un comentario por ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Comment.destroy({
      where: { id_comment: req.params.id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Comentario no encontrado' });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;

