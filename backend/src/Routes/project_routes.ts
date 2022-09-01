import { Router } from "express";
import { VerifyToken } from "./../Middlewares/verify";
import { getProjects,getProject,createProject, updateProject,deleteProject, } from "../Controllers/project";
const routers = Router();

routers.post("/create", createProject);
routers.get("/all", getProjects);
routers.get("/:id", getProject);
routers.patch("/:id", updateProject);
routers.delete("/:id", deleteProject);

export default routers;