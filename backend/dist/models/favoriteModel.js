"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
const userModel_1 = __importDefault(require("./userModel"));
const recipeModel_1 = __importDefault(require("./recipeModel"));
const Favorite = db_1.sequelize.define('Favorite', {
    id_favorite: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: userModel_1.default,
            key: 'id_user',
        },
    },
    recipe_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: recipeModel_1.default,
            key: 'id_recipe',
        },
    },
}, {
    timestamps: true,
    updatedAt: 'created_at',
    createdAt: 'created_at'
});
userModel_1.default.hasMany(Favorite, { foreignKey: 'user_id' });
Favorite.belongsTo(userModel_1.default, { foreignKey: 'user_id' });
recipeModel_1.default.hasMany(Favorite, { foreignKey: 'recipe_id' });
Favorite.belongsTo(recipeModel_1.default, { foreignKey: 'recipe_id' });
exports.default = Favorite;
