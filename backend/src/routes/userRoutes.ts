import { Router } from 'express';
import User from '../models/userModel';

const router = Router();

// Crear un nuevo usuario
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
});

// Otros endpoints (actualizar, eliminar, obtener por id, etc.)

export default router;
