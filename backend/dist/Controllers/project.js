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
exports.deleteProject = exports.updateComplete = exports.updateProject = exports.getProject = exports.getProjects = exports.createProject = void 0;
const uuid_1 = require("uuid");
const config_1 = require("../Config/config");
const mssql_1 = __importDefault(require("mssql"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = (0, uuid_1.v4)();
        const { name, description, date, user_id } = req.body;
        //check if kuna project with user_id=user_id
        //if yes return error
        const pool = yield mssql_1.default.connect(config_1.sqlConfig);
        const project = yield pool
            .request()
            .input("user_id", mssql_1.default.VarChar, user_id)
            .execute("getProject");
        const { recordset } = project;
        if (recordset[0]) {
            return res.json({
                message: "User already has a project assigned",
                success: false,
            });
        }
        console.log(name, description, date);
        yield pool
            .request()
            .input("id", mssql_1.default.VarChar, id)
            .input("name", mssql_1.default.VarChar, name)
            .input("description", mssql_1.default.VarChar, description)
            .input("date", mssql_1.default.VarChar, date)
            .input("user_id", mssql_1.default.VarChar, user_id)
            .execute("insertProject");
        res.json({ message: "project created  successfully" });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.createProject = createProject;
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(config_1.sqlConfig);
        const project = yield pool.request().execute("allProjects");
        const { recordset } = project;
        res.json(recordset);
    }
    catch (error) {
        res.json({ error });
    }
});
exports.getProjects = getProjects;
const getProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.params.id;
        const pool = yield mssql_1.default.connect(config_1.sqlConfig);
        const project = yield pool
            .request()
            .input("user_id", mssql_1.default.VarChar, user_id)
            .execute("usersProject");
        const { recordset } = project;
        if (!project.recordset[0]) {
            res.json({ message: "Project Not Found" });
        }
        else {
            res.json(recordset);
        }
    }
    catch (error) {
        res.json({ error });
    }
});
exports.getProject = getProject;
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const pool = yield mssql_1.default.connect(config_1.sqlConfig);
        const { name, description, date } = req.body;
        const project = yield pool
            .request()
            .input("id", mssql_1.default.VarChar, id)
            .execute("singleProject");
        if (!project.recordset[0]) {
            res.json({ message: "product not found" });
        }
        else {
            yield pool
                .request()
                .input("id", mssql_1.default.VarChar, id)
                .input("name", mssql_1.default.VarChar, name)
                .input("description", mssql_1.default.VarChar, description)
                .input("date", mssql_1.default.VarChar, date)
                .execute("updateProject");
            res.json({ message: "project updated" });
        }
    }
    catch (error) {
        res.json({ error });
    }
});
exports.updateProject = updateProject;
const updateComplete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const pool = yield mssql_1.default.connect(config_1.sqlConfig);
        const projects = yield pool
            .request()
            .input('id', mssql_1.default.VarChar, id)
            .execute('getProject');
        if (!projects.recordset[0]) {
            res.json({ message: 'Project Not Found' });
        }
        else {
            yield pool.request()
                .input('id', mssql_1.default.VarChar, id)
                .execute('completeProject');
            res.json({ message: 'Project Updated ...' });
        }
    }
    catch (error) {
        res.json({ error });
    }
});
exports.updateComplete = updateComplete;
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const pool = yield mssql_1.default.connect(config_1.sqlConfig);
        const project = yield pool
            .request()
            .input("id", mssql_1.default.VarChar, id)
            .execute("singleProject");
        if (!project.recordset[0]) {
            res.json({ message: "Project Not Found" });
        }
        else {
            yield pool
                .request()
                .input("id", mssql_1.default.VarChar, id)
                .execute("deleteProject");
            res.json({ message: "Project Deleted" });
        }
    }
    catch (error) {
        res.json({ error });
    }
});
exports.deleteProject = deleteProject;
