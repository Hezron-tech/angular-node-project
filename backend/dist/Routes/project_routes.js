"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verify_1 = require("./../Middlewares/verify");
const project_1 = require("../Controllers/project");
const routers = (0, express_1.Router)();
routers.post("/create", verify_1.VerifyToken, project_1.createProject);
routers.get("/all", project_1.getProjects);
routers.get("/:id", project_1.getProject);
routers.patch("/:id", project_1.updateProject);
routers.delete("/:id", project_1.deleteProject);
exports.default = routers;