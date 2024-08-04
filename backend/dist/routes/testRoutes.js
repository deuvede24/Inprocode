"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Aquí defines tus rutas de prueba
router.get('/test', (req, res) => {
    // Lógica para la ruta de prueba
    res.send('Ruta de prueba');
});
exports.default = router;
