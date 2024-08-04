"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Aquí defines tus rutas de autenticación
router.post('/login', (req, res) => {
    // Lógica de login
    res.send('Login');
});
router.post('/register', (req, res) => {
    // Lógica de registro
    res.send('Register');
});
exports.default = router;
