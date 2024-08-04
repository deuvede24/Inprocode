"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
const userModel_1 = __importDefault(require("./userModel"));
const Recipe = db_1.sequelize.define('Recipe', {
    id_recipe: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    ingredients: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    steps: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    category: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: userModel_1.default,
            key: 'id_user',
        },
    },
}, {
    timestamps: true,
    updatedAt: 'updated_at',
    createdAt: 'created_at'
});
userModel_1.default.hasMany(Recipe, { foreignKey: 'user_id' });
Recipe.belongsTo(userModel_1.default, { foreignKey: 'user_id' });
exports.default = Recipe;
