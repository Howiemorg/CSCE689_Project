import { Router } from "express";
import { config } from "dotenv";
import awaitHandler from "../middleware/awaitHandler.js";
import UserController from "../controllers/UserController.js";

config();
const router = Router();

router.post("/signup", awaitHandler(UserController.createUser));
router.post("/login", awaitHandler(UserController.userLogin));
router.post("/questionSolved", awaitHandler(UserController.questionSolved))

export default router;
