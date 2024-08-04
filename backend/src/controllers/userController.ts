import { Request, Response } from 'express';
import User from '../models/userModel';

// Obtener todos los usuarios
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo usuario
export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

// Otros métodos (obtener por ID, actualizar, eliminar) se pueden agregar aquí...
