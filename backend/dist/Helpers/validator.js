"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchemas = exports.UserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.UserSchema = joi_1.default.object({
    username: joi_1.default.string().required().min(5),
    email: joi_1.default.string().required().email(),
    password: joi_1.default.string().required().min(6),
});
exports.loginSchemas = joi_1.default.object({
    email: joi_1.default.string().required().email(),
    password: joi_1.default.string().required().min(6),
});
