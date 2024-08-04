"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getAllUsers = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel_1.default.findAll();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getAllUsers = getAllUsers;
// Crear un nuevo usuario
const createUser = async (req, res) => {
    try {
        const user = await userModel_1.default.create(req.body);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.createUser = createUser;
// Otros métodos (obtener por ID, actualizar, eliminar) se pueden agregar aquí...
