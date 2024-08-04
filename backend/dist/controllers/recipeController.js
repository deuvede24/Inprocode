"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRecipe = exports.getAllRecipes = void 0;
const recipeModel_1 = __importDefault(require("../models/recipeModel"));
// Obtener todas las recetas
const getAllRecipes = async (req, res) => {
    try {
        const recipes = await recipeModel_1.default.findAll();
        res.json(recipes);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getAllRecipes = getAllRecipes;
// Crear una nueva receta
const createRecipe = async (req, res) => {
    try {
        const recipe = await recipeModel_1.default.create(req.body);
        res.status(201).json(recipe);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.createRecipe = createRecipe;
// Otros métodos (obtener por ID, actualizar, eliminar) se pueden agregar aquí...
