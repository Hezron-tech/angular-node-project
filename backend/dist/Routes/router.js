"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const verify_1 = require("./../Middlewares/verify");
const express_1 = require("express");
const users_1 = require("../Controllers/users");
const router = (0, express_1.Router)();
router.post("/register", users_1.registerUser);
router.post("/login", users_1.loginUser);
router.get("/homepage", verify_1.VerifyToken, users_1.Home);
router.get("/getUsers", users_1.getUsers);
router.post("/log out");
router.get("/checkuser", verify_1.VerifyToken, users_1.checkUser);
//project
exports.default = router;
