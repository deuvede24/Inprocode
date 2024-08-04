"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userModel_1 = __importDefault(require("../models/userModel"));
const router = (0, express_1.Router)();
// Crear un nuevo usuario
router.post('/', async (req, res) => {
    try {
        const user = await userModel_1.default.create(req.body);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const users = await userModel_1.default.findAll();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Otros endpoints (actualizar, eliminar, obtener por id, etc.)
exports.default = router;
