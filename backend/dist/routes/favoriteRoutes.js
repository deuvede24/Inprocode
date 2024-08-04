"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const favoriteModel_1 = __importDefault(require("../models/favoriteModel"));
const router = (0, express_1.Router)();
// Crear un nuevo favorito
router.post('/', async (req, res) => {
    try {
        const favorite = await favoriteModel_1.default.create(req.body);
        res.status(201).json(favorite);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Obtener todos los favoritos
router.get('/', async (req, res) => {
    try {
        const favorites = await favoriteModel_1.default.findAll();
        res.status(200).json(favorites);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Obtener un favorito por ID
router.get('/:id', async (req, res) => {
    try {
        const favorite = await favoriteModel_1.default.findByPk(req.params.id);
        if (favorite) {
            res.status(200).json(favorite);
        }
        else {
            res.status(404).json({ error: 'Favorito no encontrado' });
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Actualizar un favorito por ID
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await favoriteModel_1.default.update(req.body, {
            where: { id_favorite: req.params.id }
        });
        if (updated) {
            const updatedFavorite = await favoriteModel_1.default.findByPk(req.params.id);
            res.status(200).json(updatedFavorite);
        }
        else {
            res.status(404).json({ error: 'Favorito no encontrado' });
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Eliminar un favorito por ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await favoriteModel_1.default.destroy({
            where: { id_favorite: req.params.id }
        });
        if (deleted) {
            res.status(204).json();
        }
        else {
            res.status(404).json({ error: 'Favorito no encontrado' });
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.default = router;
