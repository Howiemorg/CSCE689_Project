import { Router } from "express";
import { config } from "dotenv";
import awaitHandler from "../middleware/awaitHandler.js";
import Question from "../models/Question.js";
import Quiz from "../models/Quiz.js";

config();
const router = Router();

router.get(
  "/",
  awaitHandler(async (req, res, next) => {
    const questionTopics = await Question.distinct("topic");
    const quizTopics = await Quiz.distinct("topic");

    const topics = Array.from(new Set([...questionTopics, ...quizTopics]));
    console.log(topics);

    if (!topics.length) {
      res.status(404).json({ error: "Couldn't find topics." });
      throw new HttpException(404, "Couldn't find topics");
    }

    res.json({ topics: topics });
  })
);

export default router;
