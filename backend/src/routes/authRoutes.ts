import { Router } from 'express';

const router = Router();

// Aquí defines tus rutas de autenticación
router.post('/login', (req, res) => {
  // Lógica de login
  res.send('Login');
});

router.post('/register', (req, res) => {
  // Lógica de registro
  res.send('Register');
});

export default router;
