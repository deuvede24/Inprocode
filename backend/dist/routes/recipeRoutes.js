"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recipeModel_1 = __importDefault(require("../models/recipeModel"));
const router = (0, express_1.Router)();
// Crear una receta
router.post('/', async (req, res) => {
    try {
        const recipe = await recipeModel_1.default.create(req.body);
        res.status(201).json(recipe);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Obtener todas las recetas
router.get('/', async (req, res) => {
    try {
        const recipes = await recipeModel_1.default.findAll();
        res.status(200).json(recipes);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Obtener una receta por ID
router.get('/:id', async (req, res) => {
    try {
        const recipe = await recipeModel_1.default.findByPk(req.params.id);
        if (recipe) {
            res.status(200).json(recipe);
        }
        else {
            res.status(404).json({ error: 'Recipe not found' });
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Actualizar una receta
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await recipeModel_1.default.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedRecipe = await recipeModel_1.default.findByPk(req.params.id);
            res.status(200).json(updatedRecipe);
        }
        else {
            res.status(404).json({ error: 'Recipe not found' });
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Eliminar una receta
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await recipeModel_1.default.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json();
        }
        else {
            res.status(404).json({ error: 'Recipe not found' });
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.default = router;
