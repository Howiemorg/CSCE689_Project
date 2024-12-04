import { Router } from "express";
import { config } from "dotenv";
import awaitHandler from "../middleware/awaitHandler.js";
import QuestionController from "../controllers/QuestionController.js";

config();
const router = Router();

router.get(
    "/",
    awaitHandler(QuestionController.getQuestion)
  );

  router.get(
    "/getAll",
    awaitHandler(QuestionController.getQuestions)
  );

router.post(
  "/create",
  awaitHandler(QuestionController.createQuestion)
);

router.get(
  "/getByTopic/:topicId",
  awaitHandler(QuestionController.getQuestionByTopic)
);

export default router;