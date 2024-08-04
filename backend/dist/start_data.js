"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertInitialUserData = void 0;
const userModel_1 = __importDefault(require("/models/userModel"));
const bookModel_1 = __importDefault(require("./models/bookModel"));
const insertInitialUserData = () => __awaiter(void 0, void 0, void 0, function* () {
    const userData = [
        {
            email: 'ismael.academy@gmail.com',
            password: '$2b$10$tXrqo7VdSPCLAsIUhrVsYejYeMt9FLo9J4OchgCKwuDvpeDK6Xf1q', //pass: ismael123
            name: 'Ismael',
            roles: ['user']
        },
        {
            email: 'laura@hotmail.com',
            password: '$2b$10$tXrqo7VdSPCLAsIUhrVsYejYeMt9FLo9J4OchgCKwuDvpeDK6Xf1q', //pass: ismael123
            name: 'Laura',
            roles: ['user']
        },
        {
            email: 'maria@hotmail.com',
            password: '$2b$10$tXrqo7VdSPCLAsIUhrVsYejYeMt9FLo9J4OchgCKwuDvpeDK6Xf1q', //pass: ismael123
            name: 'Maria',
            surname: 'kale',
            roles: ['mod', 'admin']
        },
        {
            email: 'mod@hotmail.com',
            password: '$2b$10$tXrqo7VdSPCLAsIUhrVsYejYeMt9FLo9J4OchgCKwuDvpeDK6Xf1q', //pass: ismael123
            name: 'Moderador',
            surname: 'kale',
            roles: ['admin']
        },
        {
            email: 'admin@hotmail.com',
            password: '$2b$10$tXrqo7VdSPCLAsIUhrVsYejYeMt9FLo9J4OchgCKwuDvpeDK6Xf1q', //pass: ismael123
            name: 'Admin',
            surname: 'kale',
            roles: ['admin']
        }
    ];
    yield userModel_1.default.bulkCreate(userData, { ignoreDuplicates: true });
    const bookData = [
        { title: 'TituloA', year: 1955 },
        { title: 'TituloB', year: 1988 },
        { title: 'TituloC', year: 1475, user_id: 2 }
    ];
    yield bookModel_1.default.bulkCreate(bookData, { ignoreDuplicates: true });
});
exports.insertInitialUserData = insertInitialUserData;
