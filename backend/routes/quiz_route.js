import { Router } from "express";
import { config } from "dotenv";
import awaitHandler from "../middleware/awaitHandler.js";
import QuizController from "../controllers/QuizController.js";

config();
const router = Router();

router.get(
    "/getAll",
    awaitHandler(QuizController.getQuizzes)
  );

  router.get(
    "/",
    awaitHandler(QuizController.getQuiz)
  );

router.post(
  "/create",
  awaitHandler(QuizController.createQuiz)
);

router.get(
  "/getByTopic/:topicId",
  awaitHandler(QuizController.getQuizByTopic)
);

export default router;