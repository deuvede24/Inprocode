"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
const User = db_1.sequelize.define('User', {
    id_user: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING(40),
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(40),
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING(40),
        allowNull: false,
    },
    role: {
        type: sequelize_1.DataTypes.ENUM('admin', 'user', 'guest'),
        allowNull: false,
    },
    preference: {
        type: sequelize_1.DataTypes.ENUM('original', 'vegana', 'vegetariana'),
        allowNull: false,
    },
    location: {
        type: sequelize_1.DataTypes.STRING(60),
        allowNull: false,
    },
}, {
    indexes: [{ unique: true, fields: ['email'] }],
    timestamps: true,
    updatedAt: 'updated_at',
    createdAt: 'created_at'
});
exports.default = User;
