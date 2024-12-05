import { Router } from "express";
import { config } from "dotenv";
import awaitHandler from "../middleware/awaitHandler.js";
import UserController from "../controllers/UserController.js";

config();
const router = Router();

router.post("/signup", awaitHandler(UserController.createUser));
router.post("/login", awaitHandler(UserController.userLogin));
// router.patch(
//   "/update/:id",
//   auth(Roles.SuperAdmin, Roles.SuperUser),
//   updateUserSchema,
//   awaitHandler(UserController.updateUser)
// );
// router.delete(
//   "/delete/:id",
//   auth(Roles.SuperAdmin, Roles.SuperUser),
//   awaitHandler(UserController.deleteUser)
// );

export default router;
