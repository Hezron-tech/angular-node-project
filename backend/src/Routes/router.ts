import { VerifyToken } from "./../Middlewares/verify";
import { Router } from "express";
import {
  registerUser,
  loginUser,
  Home,
  getUsers,
  checkUser,
} from "../Controllers/users";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/homepage", VerifyToken, Home);
router.get("/getUsers", getUsers);
router.post("/log out");
router.get("/checkuser", VerifyToken, checkUser);

//project



export default router;
