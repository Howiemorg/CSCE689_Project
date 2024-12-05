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
    let { limit, page } = req.query;
    limit = parseInt(limit);
    page = parseInt(page);

    const startingAggregationWithPagination = [];

    if (page !== null && limit !== null) {
      startingAggregationWithPagination.push({ $skip: page * limit });
      startingAggregationWithPagination.push({ $limit: limit });
    }

    let docs = await Question.aggregate([
      {
        $facet: {
          quizzes: [
            ...startingAggregationWithPagination,
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
                quizzesSolved: 0,
              },
            },
          ],
          maxPages: [{ $count: "value" }],
        },
      },
    ]);

    docs = docs[0];

    if (!docs.quizzes.length) {
      res.status(404).json({ error: "Couldn't find questions." });
      throw new HttpException(404, "Couldn't find questions");
    }

    docs.maxPages = docs.maxPages[0].value;

    if (limit !== null) docs.maxPages = Math.ceil(docs.maxPages / limit) - 1;

    res.json(docs);
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
    let { limit, page } = req.query;
    limit = parseInt(limit);
    page = parseInt(page);

    const startingAggregationWithPagination = [
      {
        $match: {
          topic: req.params.topicId,
        },
      },
    ];

    if (page !== null && limit !== null) {
      startingAggregationWithPagination.push({ $skip: page * limit });
      startingAggregationWithPagination.push({ $limit: limit });
    }

    let docs = await Question.aggregate([
      {
        $facet: {
          quizzes: [
            ...startingAggregationWithPagination,
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
                quizzesSolved: 0,
              },
            },
          ],
          maxPages: [{ $count: "value" }],
        },
      },
    ]);

    docs = docs[0];

    if (!docs.quizzes.length) {
      res.status(404).json({ error: "Couldn't find questions." });
      throw new HttpException(404, "Couldn't find questions");
    }

    docs.maxPages = docs.maxPages[0].value;

    if (limit !== null) docs.maxPages = Math.ceil(docs.maxPages / limit) - 1;

    res.json(docs);
  };
}

export default new QuestionController();
