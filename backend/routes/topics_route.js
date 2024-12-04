import { Router } from "express";
import { config } from "dotenv";
import awaitHandler from "../middleware/awaitHandler.js";
import Question from "../models/Question.js";

config();
const router = Router();

router.get(
  "/",
  awaitHandler(async (req, res, next) => {
    const topics = await Question.distinct("topic");
    console.log(topics)

    if (!topics.length) {
      res.status(404).json({ error: "Couldn't find topics." });
      throw new HttpException(404, "Couldn't find topics");
    }

    res.json({topics: topics});
  })
);

export default router;
