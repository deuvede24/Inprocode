import { Router } from 'express';

const router = Router();

// Aquí defines tus rutas de prueba
router.get('/test', (req, res) => {
  // Lógica para la ruta de prueba
  res.send('Ruta de prueba');
});

export default router;
