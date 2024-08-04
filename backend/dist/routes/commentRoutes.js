"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const commentModel_1 = __importDefault(require("../models/commentModel"));
const router = (0, express_1.Router)();
// Crear un nuevo comentario
router.post('/', async (req, res) => {
    try {
        const comment = await commentModel_1.default.create(req.body);
        res.status(201).json(comment);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Obtener todos los comentarios
router.get('/', async (req, res) => {
    try {
        const comments = await commentModel_1.default.findAll();
        res.status(200).json(comments);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Obtener un comentario por ID
router.get('/:id', async (req, res) => {
    try {
        const comment = await commentModel_1.default.findByPk(req.params.id);
        if (comment) {
            res.status(200).json(comment);
        }
        else {
            res.status(404).json({ error: 'Comentario no encontrado' });
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Actualizar un comentario por ID
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await commentModel_1.default.update(req.body, {
            where: { id_comment: req.params.id }
        });
        if (updated) {
            const updatedComment = await commentModel_1.default.findByPk(req.params.id);
            res.status(200).json(updatedComment);
        }
        else {
            res.status(404).json({ error: 'Comentario no encontrado' });
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Eliminar un comentario por ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await commentModel_1.default.destroy({
            where: { id_comment: req.params.id }
        });
        if (deleted) {
            res.status(204).json();
        }
        else {
            res.status(404).json({ error: 'Comentario no encontrado' });
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.default = router;
