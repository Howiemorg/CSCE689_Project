import Question from "../models/Question.js";
import HttpException from "../utils/HttpException.js";

class QuestionController {
  getQuestion = async (req, res, next) => {
    const question = await Question.findOne(req.query);

    if (!question) {
      res.status(404).json({ error: "Couldn't find question." });
      throw new HttpException(404, "Couldn't find question");
    }

    res.json(question);
  };

  getQuestions = async (req, res, next) => {
    const questions = await Question.aggregate([
      {
        $lookup: {
          from: "Users",
          localField: "_id",
          foreignField: "solvedQuestions.questionId",
          as: "questionsSolved",
        },
      },
      {
        $addFields: {
          solved: { $gt: [{ $size: "$questionsSolved" }, 0] },
        },
      },
      {
        $project: {
          questionsSolved: 0,
        },
      },
    ]);

    console.log(questions);

    if (!questions.length) {
      res.status(404).json({ error: "Couldn't find questions." });
      throw new HttpException(404, "Couldn't find questions");
    }

    res.json({ questions: questions });
  };

  createQuestion = async (req, res, next) => {
    const newQuestion = new Question(req.body);

    const question = await newQuestion.save();

    if (!question) {
      res.status(500).json({ error: "Error creating question." });
      throw new HttpException(500, "Error creating question");
    }

    res.status(201).json(question);
  };

  getQuestionByTopic = async (req, res, next) => {
    const questions = await Question.aggregate([
      {
        $match: {
          topic: req.params.topicId,
        },
      },
      {
        $lookup: {
          from: "Users",
          localField: "_id",
          foreignField: "solvedQuestions.questionId",
          as: "questionsSolved",
        },
      },
      {
        $addFields: {
          solved: { $gt: [{ $size: "$questionsSolved" }, 0] },
        },
      },
      {
        $project: {
          questionsSolved: 0,
        },
      },
    ]);

    console.log(questions);

    if (!questions.length) {
      res.status(404).json({ error: "Couldn't find questions." });
      throw new HttpException(404, "Couldn't find questions");
    }

    res.json({ questions: questions });
  };
}

export default new QuestionController();
