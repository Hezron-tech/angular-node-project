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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Home = exports.checkUser = exports.getUsers = exports.loginUser = exports.registerUser = void 0;
const mssql_1 = __importDefault(require("mssql"));
const config_1 = require("../Config/config");
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const validator_1 = require("../Helpers/validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = (0, uuid_1.v4)();
        const { username, email, password } = req.body;
        const { error, value } = validator_1.UserSchema.validate(req.body);
        if (error) {
            return res.json({ error: error.details[0].message });
        }
        const pool = yield mssql_1.default.connect(config_1.sqlConfig);
        const hashedpassword = yield bcrypt_1.default.hash(password, 10);
        yield pool
            .request()
            .input("user_id", mssql_1.default.VarChar, user_id)
            .input("username", mssql_1.default.VarChar, username)
            .input("email", mssql_1.default.VarChar, email)
            .input("password", mssql_1.default.VarChar, hashedpassword)
            .execute("insertUsers");
        // console.log(req.body);
        res.json({ message: "succesfully inserted" });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const pool = yield mssql_1.default.connect(config_1.sqlConfig);
        const { error, value } = validator_1.loginSchemas.validate(req.body);
        if (error) {
            return res.json({ error: error.details[0].message, success: false });
        }
        const userResult = yield (yield pool
            .request()
            .input("email", mssql_1.default.VarChar, email)
            .execute("getUser")).recordset;
        const user = userResult[0];
        if (!user) {
            return res.json({ message: "user not found", success: false });
        }
        const validPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!validPassword) {
            return res.json({ message: "invalid password", success: false });
        }
        const { password: _ } = user, rest = __rest(user, ["password"]);
        const token = jsonwebtoken_1.default.sign(rest, process.env.KEY, {
            expiresIn: "3600s",
        });
        console.log("Login user");
        res.json({ message: "successfully login", token, success: true, user: rest });
    }
    catch (error) {
        res.json({ error, success: false });
    }
});
exports.loginUser = loginUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(config_1.sqlConfig);
        const users = yield pool.request().execute("getUsers");
        const { recordset } = users;
        res.json(recordset);
    }
    catch (error) {
        res.json({ error });
    }
});
exports.getUsers = getUsers;
const checkUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.info) {
        res.json({ name: req.info.username, role: req.info.Role });
    }
});
exports.checkUser = checkUser;
const Home = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.info) {
        return res.json({ message: `welcome to homepage ${req.info.username}` });
    }
});
exports.Home = Home;
